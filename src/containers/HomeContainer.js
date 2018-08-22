import Home from '../components/Home'
import * as actions from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    liquid: state.liquid,
    cpuStaked: state.cpuStaked,
    netStaked: state.netStaked,
    ramStaked: state.ramStaked
  }
}

const mapDispatchToProps = dispatch => ({
  updateLiquid: () => dispatch(actions.updateLiquid(0)),
  updateCpuStaked: () => dispatch(actions.updateCpuStaked(0)),
  updateNetStaked: () => dispatch(actions.updateNetStaked(0)),
  updateRamStaked: () => dispatch(actions.updateRamStaked(0))
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
