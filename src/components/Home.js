import SendIcon from '@material-ui/icons/Send'
import PersonIcon from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import LiquidView from './Home/LiquidView'
import StakedView from './Home/StakedView'
import Transfer from './Transfer'
import posed from 'react-pose'
import * as values from '../constants/Values'

const AtomView = styled.div`
  text-align: center;
`

const ResourceContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
`

const NonGrowAppBar = styled(AppBar)`
  flexgrow: 0;
`

const MenuButton = styled(IconButton)`
  marginleft: -12;
  marginright: 20;
`

const Title = styled(Typography)`
  flex: 1;
`

const GreenAvatar = styled(Avatar)`
  margin: 10;
  color: '#fff';
  backgroundcolor: green[500];
`

const HomeRoot = styled(
  posed.div({
    active: { opacity: 1 },
    inActive: {
      opacity: 0.4
    }
  })
)`
  display: flex;
  flex-direction: column;
  height: 100%;
`

class Home extends Component {
  componentDidMount = () => {
    const { getAccountInfo } = this.props
    getAccountInfo()
  }

  render() {
    const {
      liquid,
      totalBalance,
      cpu_staked,
      cpu_usage,
      net_staked,
      net_usage,
      ram_usage,
      pageIndex,
      tokens,
      showTransferView,
      closeTransferView,
      getTokens,
      transferTokens
    } = this.props

    return (
      <Fragment>
        <HomeRoot pose={pageIndex === 0 ? 'active' : 'inActive'}>
          <NonGrowAppBar position="static" color="default">
            <Toolbar>
              <MenuButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </MenuButton>
              <Title variant="title" color="inherit">
                Eoseal
              </Title>

              <GreenAvatar>
                <PersonIcon cursor="pointer" />
              </GreenAvatar>
            </Toolbar>
          </NonGrowAppBar>

          <ResourceContainer>
            <AtomView>
              <LiquidView liquid={liquid} totalBalance={totalBalance} />
            </AtomView>

            <StakedView
              cpu_staked={cpu_staked}
              cpu_usage={cpu_usage}
              net_staked={net_staked}
              net_usage={net_usage}
              ram_usage={ram_usage}
            />
          </ResourceContainer>

          <Button
            variant="fab"
            color="primary"
            style={{ position: 'fixed', left: 'auto', right: 20, bottom: 20 }}
            onClick={showTransferView}
          >
            <SendIcon />
          </Button>
        </HomeRoot>

        <Transfer
          show={pageIndex === values.TRANSFER_PAGE_INDEX ? 'visible' : 'collapse'}
          tokens={tokens}
          getTokens={getTokens}
          transferTokens={transferTokens}
          closeTransferView={closeTransferView}
        />
      </Fragment>
    )
  }
}

Home.propTypes = {
  liquid: PropTypes.number,
  totalBalance: PropTypes.number,
  cpu_staked: PropTypes.number,
  cpu_usage: PropTypes.number,
  net_staked: PropTypes.number,
  net_usage: PropTypes.number,
  ram_usage: PropTypes.number,
  pageIndex: PropTypes.number,
  tokens: PropTypes.array,
  getAccountInfo: PropTypes.func,
  showTransferView: PropTypes.func,
  closeTransferView: PropTypes.func,
  getTokens: PropTypes.func
}

Home.defaultProps = {
  liquid: 0,
  totalBalance: 0,
  cpu_staked: 0,
  cpu_usage: 0,
  net_staked: 0,
  net_usage: 0,
  ram_usage: 0,
  pageIndex: 0,
  tokens: [],
  getAccountInfo: () => console.warn('getAccountInfo not defined'),
  showTransferView: () => console.warn('showTransferView not defined'),
  closeTransferView: () => console.warn('closeTransferView not defined'),
  getTokens: () => console.warn('getTokens not defined')
}

export default Home
