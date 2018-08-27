import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import SettingsPowerIcon from '@material-ui/icons/SettingsPower'
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
import * as EosPortal from '../utils/EosPortal'
import ecc from 'eosjs-ecc'
import RegisterStep from './RegisterStep'
import LockScreen from './LockScreen'

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

const Title = styled(Typography)`
  flex: 1;
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
    const { showLockScreen } = this.props
    const pwdTarget = localStorage.getItem('pwdTarget')
    const saltTarget = localStorage.getItem('saltTarget')
    const cipherTarget = localStorage.getItem('cipher')
    const accList = JSON.parse(localStorage.getItem('accList'))
    const currAcc = localStorage.getItem('currAcc')

    if (pwdTarget && saltTarget && cipherTarget && accList && currAcc) {
      showLockScreen()
    }

    this.loadAccountInfo()
  }

  loadAccountInfo = () => {
    const {
      getAccountInfo,
      accountName,
      httpEndpoint,
      keyProvider,
      chainId,
      sign,
      broadcast
    } = this.props

    if (!keyProvider || !accountName) return

    const publicKey = ecc.privateToPublic(keyProvider)
    const eos = EosPortal.getEOS({
      httpEndpoint,
      keyProvider,
      chainId,
      sign,
      broadcast
    })

    getAccountInfo({ eos, accountName })
  }

  render() {
    const {
      accountList,
      accountName,
      liquid,
      totalBalance,
      cpu_staked,
      cpu_usage,
      net_staked,
      net_usage,
      ram_usage,
      pageIndex,
      httpEndpoint,
      keyProvider,
      chainId,
      sign,
      broadcast,
      tokens,
      getAccountInfo,
      getAccountList,
      showTransferView,
      showRegisterStep,
      updateEosProvider,
      updateAccountName,
      closeRegisterStep,
      closeTransferView,
      closeLockScreen,
      getTokens,
      transferTokens,
      refreshAccountInfo
    } = this.props

    const pwdTarget = localStorage.getItem('pwdTarget')
    const saltTarget = localStorage.getItem('saltTarget')
    const cipherTarget = localStorage.getItem('cipher')
    const accList = JSON.parse(localStorage.getItem('accList'))
    const currAcc = localStorage.getItem('currAcc')

    return (
      <Fragment>
        <Fragment>
          <HomeRoot pose={pageIndex === 0 ? 'active' : 'inActive'}>
            <NonGrowAppBar position="static" color="default">
              <Toolbar>
                <IconButton
                  color="primary"
                  aria-label="Menu"
                  onClick={showRegisterStep}
                  disabled={pageIndex !== 0 ? true : false}
                >
                  <SettingsPowerIcon />
                </IconButton>
                <Title variant="title" color="inherit">
                  Eoseal
                </Title>
              </Toolbar>
            </NonGrowAppBar>

            <ResourceContainer>
              <AtomView>
                <LiquidView liquid={liquid} totalBalance={totalBalance} />

                <Typography
                  style={{ paddingTop: '16px' }}
                  gutterBottom
                  variant="subheading"
                  component="h2"
                >
                  {accountName ? accountName : 'ANONYMOUS'}
                </Typography>
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
              disabled={accountName ? false : true}
              color="primary"
              style={{ position: 'fixed', left: 'auto', right: 20, bottom: 20 }}
              onClick={showTransferView}
            >
              <SendIcon />
            </Button>
          </HomeRoot>

          {accountName &&
            tokens && (
              <Transfer
                show={pageIndex === values.TRANSFER_PAGE_INDEX ? 'visible' : 'collapse'}
                tokens={tokens}
                getTokens={getTokens}
                transferTokens={transferTokens}
                closeTransferView={closeTransferView}
                refreshAccountInfo={refreshAccountInfo}
                accountName={accountName}
                httpEndpoint={httpEndpoint}
                keyProvider={keyProvider}
                chainId={chainId}
                sign={sign}
                broadcast={broadcast}
              />
            )}

          <RegisterStep
            show={pageIndex === values.REGISTER_STEP_INDEX ? 'visible' : 'collapse'}
            accountList={accountList}
            accountName={accountName}
            getAccountInfo={getAccountInfo}
            getAccountList={getAccountList}
            closeRegisterStep={closeRegisterStep}
            updateEosProvider={updateEosProvider}
            updateAccountName={updateAccountName}
            loadAccountInfo={this.loadAccountInfo}
            httpEndpoint={httpEndpoint}
            keyProvider={keyProvider}
            chainId={chainId}
            sign={sign}
            broadcast={broadcast}
          />

          <LockScreen
            show={pageIndex === values.LOCK_SCREEN_INDEX ? 'visible' : 'collapse'}
            pwdTarget={pwdTarget}
            accList={accList}
            currAcc={currAcc}
            saltTarget={saltTarget}
            cipherTarget={cipherTarget}
            closeLockScreen={closeLockScreen}
            updateAccountName={updateAccountName}
            updateEosProvider={updateEosProvider}
            loadAccountInfo={this.loadAccountInfo}
          />
        </Fragment>
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
  accountName: PropTypes.string,
  pageIndex: PropTypes.number,
  tokens: PropTypes.array,
  httpEndpoint: PropTypes.string,
  keyProvider: PropTypes.string,
  chainId: PropTypes.string,
  sign: PropTypes.bool,
  broadcast: PropTypes.bool,
  getAccountInfo: PropTypes.func,
  showRegisterStep: PropTypes.func,
  showTransferView: PropTypes.func,
  showLockScreen: PropTypes.func,
  closeTransferView: PropTypes.func,
  closeRegisterStep: PropTypes.func,
  closeLockScreen: PropTypes.func,
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
  accountName: '',
  pageIndex: 0,
  tokens: [],
  httpEndpoint: '',
  keyProvider: '',
  chainId: '',
  sign: false,
  broadcast: false,
  getAccountInfo: () => console.warn('getAccountInfo not defined'),
  showRegisterStep: () => console.warn('showRegisterStep not defined'),
  showTransferView: () => console.warn('showTransferView not defined'),
  showLockScreen: () => console.warn('showLockScreen not defined'),
  closeTransferView: () => console.warn('closeTransferView not defined'),
  closeRegisterStep: () => console.warn('closeRegisterStep not defined'),
  closeLockScreen: () => console.warn('closeLockScreen not defined'),
  getTokens: () => console.warn('getTokens not defined')
}

export default Home
