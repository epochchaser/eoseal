export const ACCOUNT_NAME_PATTERN = /([a-z1-5]){12,}/
export const HOME_PAGE_INDEX = 0
export const TRANSFER_PAGE_INDEX = 1
export const REGISTER_STEP_INDEX = 2
export const LOCK_SCREEN_INDEX = 3
export const ACTION_PER_PAGE = 1000

const protocol = 'https'
const host = 'eos.greymass.com'
// const host = 'rpc.eosys.io'
const port = 443
const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
export const httpEndpoint = `${protocol}://${host}:${port}`

export const requiredFields = {
  accounts: [
    {
      blockchain: 'eos',
      host: host,
      port: port,
      chainId: chainId
    }
  ]
}

export const NETWORK = {
  blockchain: 'eos',
  protocol: protocol,
  host: host,
  port: port,
  chainId: chainId
}

export const CONFIG = {
  broadcast: true,
  sign: true,
  chainId: chainId
}
