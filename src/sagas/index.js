import { call, spawn, put, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/ActionTypes'
import EosService from '../services/EosService'
import * as values from '../constants/Values'

function removeDuplicates(arr, prop) {
  var obj = {}
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i]
  }
  var newArr = []
  for (var key in obj) newArr.push(obj[key])
  return newArr
}

function* fetchAccountList(payload) {
  try {
    const { eos, public_key } = payload.payload
    if (!eos || !public_key) return
    const accounts = yield call(EosService.getKeyAccounts, eos, public_key)

    if (!accounts.account_names || accounts.account_names.length <= 0) {
      return
    }

    const accountList = [...accounts.account_names]
    yield put(
      actions.getAccountListSuccess({ accountList, accountName: accounts.account_names[0] })
    )
  } catch (error) {
    yield put(actions.getAccountListFailed(error))
  }
}

function* fetchAccountInfo(payload) {
  try {
    const { eos, accountName } = payload.payload
    if (!eos || !accountName) return

    const accountInfo = yield call(EosService.getAccountInfo, eos, accountName)

    if (accountInfo) {
      let liquid = accountInfo.core_liquid_balance
        ? Number(accountInfo.core_liquid_balance.split(' ')[0])
        : 0

      liquid = Number(liquid.toFixed(2))
      const cpu_max = Number(accountInfo.cpu_limit.max / 10000)
      const net_max = Number(accountInfo.net_limit.max / 10000)
      let refunding_cpu_amount = 0.0
      let refunding_net_amount = 0.0

      if (accountInfo.refund_request) {
        refunding_cpu_amount = Number(accountInfo.refund_request.cpu_amount.split(' ')[0])
        refunding_net_amount = Number(accountInfo.refund_request.net_amount.split(' ')[0])
      }

      const totalRefund = refunding_cpu_amount + refunding_net_amount
      const cpu_staked = Number(
        Number(accountInfo.total_resources.cpu_weight.split(' ')[0]).toFixed(2)
      )
      const net_staked = Number(
        Number(accountInfo.total_resources.net_weight.split(' ')[0]).toFixed(2)
      )
      const cpu_user = 0
      const net_user = 0

      const staked = net_staked + cpu_staked
      const totalBalance = Number((staked + totalRefund + liquid).toFixed(2))
      const ram_usage = Number(
        accountInfo.ram_usage > 0 ? (accountInfo.ram_usage / 1024).toFixed(2) : 0
      )
      const net_usage = Number(
        accountInfo.net_limit.used > 0 ? (accountInfo.net_limit.used / 1024).toFixed(2) : 0
      )
      const cpu_usage = Number(
        accountInfo.cpu_limit.used > 0 ? (accountInfo.cpu_limit.used / 1024).toFixed(2) : 0
      )

      yield put(
        actions.getAccountInfoSuccess({
          liquid,
          totalBalance,
          cpu_staked,
          cpu_usage,
          net_staked,
          net_usage,
          ram_usage,
          accountName
        })
      )
    }
  } catch (error) {
    yield put(actions.getAccountInfoFailed(error))
  }
}

function* refreshAccountInfo(payload) {
  try {
    const { eos, accountName } = payload.payload
    if (!eos || !accountName) return
    const accountInfo = yield call(EosService.getAccountInfo, eos, accountName)

    if (accountInfo) {
      let liquid = accountInfo.core_liquid_balance
        ? Number(accountInfo.core_liquid_balance.split(' ')[0])
        : 0

      liquid = Number(liquid.toFixed(2))
      const cpu_max = Number(accountInfo.cpu_limit.max / 10000)
      const net_max = Number(accountInfo.net_limit.max / 10000)
      let refunding_cpu_amount = 0.0
      let refunding_net_amount = 0.0

      if (accountInfo.refund_request) {
        refunding_cpu_amount = Number(accountInfo.refund_request.cpu_amount.split(' ')[0])
        refunding_net_amount = Number(accountInfo.refund_request.net_amount.split(' ')[0])
      }

      const totalRefund = refunding_cpu_amount + refunding_net_amount
      const cpu_staked = Number(
        Number(accountInfo.total_resources.cpu_weight.split(' ')[0]).toFixed(2)
      )
      const net_staked = Number(
        Number(accountInfo.total_resources.net_weight.split(' ')[0]).toFixed(2)
      )
      const cpu_user = 0
      const net_user = 0

      const staked = net_staked + cpu_staked
      const totalBalance = Number((staked + totalRefund + liquid).toFixed(2))
      const ram_usage = Number(
        accountInfo.ram_usage > 0 ? (accountInfo.ram_usage / 1024).toFixed(2) : 0
      )
      const net_usage = Number(
        accountInfo.net_limit.used > 0 ? (accountInfo.net_limit.used / 1024).toFixed(2) : 0
      )
      const cpu_usage = Number(
        accountInfo.cpu_limit.used > 0 ? (accountInfo.cpu_limit.used / 1024).toFixed(2) : 0
      )

      yield put(
        actions.getAccountInfoSuccess({
          liquid,
          totalBalance,
          cpu_staked,
          cpu_usage,
          net_staked,
          net_usage,
          ram_usage,
          accountName
        })
      )
    }
  } catch (error) {
    yield put(actions.getAccountInfoFailed(error))
  }
}

function* fetchTokens(payload) {
  try {
    const { eos, accountName } = payload.payload
    if (!eos || !accountName) return
    const lastAction = yield call(EosService.getActions, eos, accountName, -1, -1)

    let totalActions
    let tokens = [
      {
        code: 'eosio.token',
        account: accountName,
        symbol: 'EOS'
      }
    ]
    let eosToken = yield call(EosService.getCurrencyBalance, eos, tokens[0])
    const tokenized = eosToken[0].split(' ')
    tokens[0].amount = Number(tokenized[0])

    let tempTokens = []
    if (lastAction && lastAction.actions.length > 0) {
      totalActions = lastAction.actions[0].account_action_seq

      let totalPage = parseInt(totalActions / values.ACTION_PER_PAGE, 10)
      if (totalActions % values.ACTION_PER_PAGE !== 0) {
        totalPage++
      }

      for (let i = 0; i < totalPage; i++) {
        let pos = i * values.ACTION_PER_PAGE
        let offset = values.ACTION_PER_PAGE - 1

        const actions = yield call(EosService.getActions, eos, accountName, pos, offset)

        let results = actions.actions
          .filter((action, idx, array) => {
            if (
              action.action_trace.act.name === 'transfer' &&
              action.action_trace.act.data.to === accountName &&
              action.action_trace.act.data.quantity.split(' ')[1] !== 'EOS'
            ) {
              return true
            }

            return false
          })
          .map(action => {
            return {
              code: action.action_trace.act.account,
              account: action.action_trace.act.data.to,
              symbol: action.action_trace.act.data.quantity.split(' ')[1]
            }
          })

        tempTokens = tempTokens.concat(results)
      }

      tempTokens = removeDuplicates(tempTokens, 'symbol')
      let len = tempTokens.length

      for (let i = 0; i < len; i++) {
        try {
          let token = yield call(EosService.getCurrencyBalance, eos, tempTokens[i])

          if (token.length === 0) {
            tempTokens[i].amount = 0
          } else {
            const tokenized = token[0].split(' ')
            tempTokens.filter(t => t.symbol === tokenized[1])[0].amount = Number(tokenized[0])
          }
        } catch (e) {}
      }

      tokens = tokens.concat(tempTokens)
    }

    yield put(
      actions.getTokensSuccess({
        tokens
      })
    )
  } catch (error) {
    yield put(actions.getTokensFailed(error))
  }
}

function* showTransferView() {
  try {
    yield put(
      actions.showTransferViewSuccess({
        pageIndex: values.TRANSFER_PAGE_INDEX
      })
    )
  } catch (error) {
    yield put(actions.showTransferViewFailed(error))
  }
}

function* showRegisterStep() {
  try {
    yield put(
      actions.showRegisterStepSuccess({
        pageIndex: values.REGISTER_STEP_INDEX
      })
    )
  } catch (error) {
    yield put(actions.showRegisterStepFailed(error))
  }
}

function* showLockScreen() {
  try {
    yield put(
      actions.showLockScreenSuccess({
        pageIndex: values.LOCK_SCREEN_INDEX
      })
    )
  } catch (error) {
    yield put(actions.showLockScreenFailed(error))
  }
}

function* closeTransferView() {
  try {
    yield put(
      actions.closeTransferViewSuccess({
        pageIndex: values.HOME_PAGE_INDEX
      })
    )
  } catch (error) {
    yield put(actions.closeTransferViewFailed(error))
  }
}

function* closeRegisterStep() {
  try {
    yield put(
      actions.closeRegisterStepSuccess({
        pageIndex: values.HOME_PAGE_INDEX
      })
    )
  } catch (error) {
    yield put(actions.closeRegisterStepFailed(error))
  }
}

function* closeLockScreen() {
  try {
    yield put(
      actions.closeLockScreenSuccess({
        pageIndex: values.HOME_PAGE_INDEX
      })
    )
  } catch (error) {
    yield put(actions.closeLockScreenFailed(error))
  }
}

function* transferTokens(transferInfo) {
  const {
    eos,
    contract,
    authority,
    fromAccountName,
    toAccountName,
    symbol,
    quantity,
    memo,
    handleTransferCompleted
  } = transferInfo.payload

  try {
    const cb = tr => {
      const options = { authorization: [`${fromAccountName}@${authority}`] }

      tr.transfer(
        {
          from: fromAccountName,
          to: toAccountName,
          quantity: `${Number(quantity)
            .toFixed(4)
            .toString()} ${symbol}`,
          memo: memo
        },
        options
      )
    }

    const result = yield call(EosService.createTransactionWithContract, eos, contract, cb)
    yield put(actions.transferTokensSuccess())
    handleTransferCompleted(true)
  } catch (error) {
    yield put(actions.transferTokensFailed(error))
    handleTransferCompleted(false)
  }
}

function* updateEosProvider(options) {
  const { keyProvider } = options.payload

  try {
    yield put(actions.updateEosProviderSuccess({ keyProvider }))
  } catch (error) {
    yield put(actions.updateEosProviderFailed(error))
  }
}

function* updateAccountName(payload) {
  const { accountName } = payload.payload

  try {
    yield put(actions.updateAccountNameSuccess({ accountName }))
  } catch (error) {
    yield put(actions.updateAccountNameFailed(error))
  }
}

function* apiSaga() {
  yield takeEvery(types.GET_ACCOUNT_LIST, fetchAccountList)
  yield takeEvery(types.GET_ACCOUNT_INFO, fetchAccountInfo)
  yield takeEvery(types.REFRESH_ACCOUNT_INFO, refreshAccountInfo)
  yield takeEvery(types.SHOW_TRANSFER_VIEW, showTransferView)
  yield takeEvery(types.SHOW_REGISTER_STEP, showRegisterStep)
  yield takeEvery(types.SHOW_LOCK_SCREEN, showLockScreen)
  yield takeEvery(types.CLOSE_TRANSFER_VIEW, closeTransferView)
  yield takeEvery(types.CLOSE_REGISTER_STEP, closeRegisterStep)
  yield takeEvery(types.CLOSE_LOCK_SCREEN, closeLockScreen)
  yield takeEvery(types.GET_TOKENS, fetchTokens)
  yield takeEvery(types.TRANSFER_TOKENS, transferTokens)
  yield takeEvery(types.UPDATE_EOS_PROVIDER, updateEosProvider)
  yield takeEvery(types.UPDATE_ACCOUNT_NAME, updateAccountName)
}

export default apiSaga
