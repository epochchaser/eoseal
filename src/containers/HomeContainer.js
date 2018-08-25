import Home from '../components/Home'
import * as actions from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    liquid: state.accountInfo.liquid,
    totalBalance: state.accountInfo.totalBalance,
    cpu_staked: state.accountInfo.cpu_staked,
    cpu_usage: state.accountInfo.cpu_usage,
    net_staked: state.accountInfo.net_staked,
    net_usage: state.accountInfo.net_usage,
    ram_usage: state.accountInfo.ram_usage,
    accountName: state.accountInfo.accountName,
    pageIndex: state.pageTransitionInfo.pageIndex,
    tokens: state.tokenInfo.tokens,
    httpEndpoint: state.configInfo.httpEndpoint,
    keyProvider: state.configInfo.keyProvider,
    chainId: state.configInfo.chainId,
    sign: state.configInfo.sign,
    broadcast: state.configInfo.broadcast,
    transferInProgress: state.transferToken.transferInProgress
  }
}

const mapDispatchToProps = dispatch => ({
  getAccountInfo: payload => dispatch(actions.getAccountInfo(payload)),
  refreshAccountInfo: payload => dispatch(actions.refreshAccountInfo(payload)),
  showTransferView: () => dispatch(actions.showTransferView()),
  closeTransferView: () => dispatch(actions.closeTransferView()),
  getTokens: payload => dispatch(actions.getTokens(payload)),
  transferTokens: transferInfo => {
    dispatch(actions.transferTokens(transferInfo))
  },
  updateEosOptions: options => {
    dispatch(actions.updateEosOptions(options))
  }
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
