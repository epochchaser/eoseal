import Eos from 'eosjs'

export function getEOS(options) {
  return Eos({
    httpEndpoint: options.httpEndpoint,
    keyProvider: options.keyProvider,
    chainId: options.chainId,
    sign: options.sign,
    broadcast: options.broadcast
  })
}
