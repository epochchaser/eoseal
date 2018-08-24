import { call, spawn, put, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import * as types from '../actions/ActionTypes'
import EosService from '../services/EosService'

function* fetchAccountInfo() {
  try {
    const accountName = EosService.accountName
    const accountInfo = yield call(EosService.getAccountInfo, accountName)

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
          ram_usage
        })
      )
    }
  } catch (error) {
    yield put(actions.getAccountInfoFailed(error))
  }
}

function* apiSaga() {
  yield takeEvery(types.GET_ACCOUNT_INFO, fetchAccountInfo)
}

export default apiSaga
