const singleton = Symbol()
const singletonEosService = Symbol()

class EosService {
  constructor(eosService) {
    if (eosService !== singletonEosService) {
      throw new Error('Cannot construct singleton')
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new EosService(singletonEosService)
    }

    return this[singleton]
  }

  getKeyAccounts = (eos, pubKey) => {
    if (!eos) {
      return
    }

    return eos.getKeyAccounts({ public_key: pubKey })
  }

  getAccountInfo = (eos, accountName) => {
    if (!eos) {
      return
    }

    return eos.getAccount({ account_name: accountName })
  }

  getCurrencyBalance = (eos, query) => {
    if (!eos) {
      return
    }

    let balance = eos.getCurrencyBalance(query)

    return balance
  }

  getActions = (eos, accountName, pos, offset) => {
    if (!eos) {
      return
    }

    let actions = eos.getActions({
      account_name: accountName,
      pos,
      offset
    })

    return actions
  }

  createTransactionWithContract = (eos, contract, cb) => {
    if (!eos) {
      return
    }

    return eos.transaction(contract, cb)
  }
}

export default EosService.instance
