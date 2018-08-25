import * as Values from '../constants/Values'
import Eos from 'eosjs'

const singleton = Symbol()
const singletonEosService = Symbol()

class EosService {
  constructor(eosService) {
    if (eosService !== singletonEosService) {
      throw new Error('Cannot construct singleton')
    }

    let endPoint = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

    this.eos = Eos({
      httpEndpoint: endPoint,
      chainId: Values.NETWORK.chainId,
      sign: true,
      broadcast: true
    })

    this.accountName = 'gu3dqmzvhege'
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new EosService(singletonEosService)
    }

    return this[singleton]
  }

  getInfo = () => {
    if (!this.eos) {
      return
    }

    return this.eos.getInfo({})
  }

  getAccountInfo = accountName => {
    if (!this.eos) {
      return
    }

    return this.eos.getAccount({ account_name: accountName })
  }

  getCurrencyBalance = query => {
    if (!this.eos) {
      return
    }

    let balance = this.eos.getCurrencyBalance(query)

    return balance
  }

  getActions = (accountName, pos, offset) => {
    if (!this.eos) {
      return
    }

    let actions = this.eos.getActions({
      account_name: accountName,
      pos,
      offset
    })

    return actions
  }

  createTransactionWithContract = (contract, cb) => {
    if (!this.eos) {
      return
    }

    return this.eos.transaction(contract, cb)
  }
}

export default EosService.instance
