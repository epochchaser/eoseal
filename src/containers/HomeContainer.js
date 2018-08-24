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
    ram_usage: state.accountInfo.ram_usage
  }
}

const mapDispatchToProps = dispatch => ({
  getAccountInfo: () => dispatch(actions.getAccountInfo())
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
