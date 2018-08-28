import styled from 'styled-components'
import posed from 'react-pose'
import React, { Component, Fragment } from 'react'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import ecc from 'eosjs-ecc'
import crypto from 'crypto'
import cryptojs from 'crypto-js'
import * as EosPortal from '../utils/EosPortal'

const N = 123948

const RegisterRoot = styled(
  posed.div({
    visible: { y: '0%', scale: 1, opacity: 1 },
    collapse: {
      y: '100%',
      scale: 0,
      opacity: 0.5
    }
  })
)`
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1;
  top: 0;
  left: 0;
`

class RegisterStep extends Component {
  state = {
    activeStep: 0,
    password: '',
    password_again: '',
    privatekey: '',
    vertical: 'top',
    horizontal: 'right',
    message: '',
    nextButtonText: 'Next',
    showError: false
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { activeStep } = prevState
    return {
      activeStep
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {
      const prevActiveStep = prevState.activeStep
      const { activeStep } = this.state

      if (prevActiveStep !== activeStep) {
        if (0 === activeStep) {
          document.querySelector('#password').focus()
        } else if (1 === activeStep) {
          document.querySelector('#privatekey').focus()
        }
      }
    }
  }

  handleNext = () => {
    const { activeStep, password, password_again, privatekey } = this.state
    const { getAccountList, httpEndpoint, keyProvider, chainId, sign, broadcast } = this.props

    if (0 === activeStep) {
      if (password.length < 8) {
        this.setState({
          showError: true,
          nextButtonText: 'Next',
          message: 'More than 8length.'
        })
      } else if (password !== password_again) {
        this.setState({
          showError: true,
          nextButtonText: 'Next',
          message: 'Need to match password.'
        })
      } else {
        this.setState({
          activeStep: activeStep + 1,
          nextButtonText: 'Next',
          message: '',
          showError: false
        })
      }
    } else if (1 === activeStep) {
      if (ecc.isValidPrivate(privatekey) === true) {
        const publicKey = ecc.privateToPublic(privatekey)
        const eos = EosPortal.getEOS({
          httpEndpoint,
          keyProvider: privatekey,
          chainId,
          sign,
          broadcast
        })

        getAccountList({ eos, public_key: publicKey })

        this.setState({
          activeStep: activeStep + 1,
          nextButtonText: 'Done',
          message: '',
          showError: false
        })
      } else {
        this.setState({
          showError: true,
          message: 'input correct private key'
        })
      }
    } else if (2 === activeStep) {
      this.handleCompleted()
    }
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
      message: '',
      showError: false,
      nextButtonText: 'Next'
    }))
  }

  handleStepChange = activeStep => {
    this.setState({ activeStep })
  }

  handleChange = name => event => {
    const { updateAccountName } = this.props

    if (name === 'accountName') {
      updateAccountName({ accountName: event.target.value })
    }

    this.setState({
      [name]: event.target.value
    })
  }

  handleCompleted = () => {
    const { password, privatekey } = this.state
    const { updateEosProvider, loadAccountInfo, accountList, accountName } = this.props

    crypto.randomBytes(64, (err, buf) => {
      const saltTarget = buf.toString('base64')
      crypto.pbkdf2(password, saltTarget, N, 64, 'sha512', (err, key) => {
        const base64Key = key.toString('base64')
        const ciphertext = cryptojs.AES.encrypt(privatekey, password)

        var bytes = cryptojs.AES.decrypt(ciphertext.toString(), password)
        var plaintext = bytes.toString(cryptojs.enc.Utf8)

        localStorage.setItem('pwdTarget', base64Key)
        localStorage.setItem('saltTarget', saltTarget)
        localStorage.setItem('cipher', ciphertext.toString())
        localStorage.setItem('accList', JSON.stringify(accountList))
        localStorage.setItem('currAcc', accountName)

        updateEosProvider({ keyProvider: privatekey })
        loadAccountInfo()
        this.handleClose()
      })
    })
  }

  handleClose = () => {
    const { closeRegisterStep } = this.props
    closeRegisterStep()

    this.setState({
      activeStep: 0,
      password: '',
      password_again: '',
      privatekey: '',
      message: '',
      nextButtonText: ' Next',
      showError: false
    })
  }

  render() {
    const maxSteps = 3
    const {
      activeStep,
      message,
      showError,
      password,
      password_again,
      privatekey,
      nextButtonText
    } = this.state
    const { show, accountName, accountList } = this.props

    return (
      <RegisterRoot pose={show}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              disabled={show === 'collapse' ? true : false}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="title" color="inherit">
              Register Account
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableViews
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-around'
          }}
          axis={'x'}
          index={activeStep}
        >
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
            square
            elevation={0}
          >
            <Typography variant="title">1. Set password</Typography>
            <Typography style={{ paddingTop: '24px' }} component="p">
              Enter password for future login.
            </Typography>

            {showError && (
              <Typography style={{ paddingTop: '24px' }} color="error" variant="body1">
                {message}
              </Typography>
            )}

            <FormControl fullWidth>
              <TextField
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                value={password}
                disabled={show === 'collapse' ? true : false}
                onChange={this.handleChange('password')}
              />
              <TextField
                id="password_again"
                type="password"
                label="Password again"
                placeholder="Password"
                margin="normal"
                value={password_again}
                disabled={show === 'collapse' ? true : false}
                onChange={this.handleChange('password_again')}
              />
            </FormControl>
          </Paper>

          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
            square
            elevation={0}
          >
            <Typography variant="title">2. Input Private-key</Typography>
            <Typography style={{ paddingTop: '24px' }} component="p">
              Enter Private-key to sign transaction.
            </Typography>

            {showError && (
              <Typography style={{ paddingTop: '24px' }} color="error" variant="body1">
                {message}
              </Typography>
            )}

            <FormControl fullWidth>
              <TextField
                id="privatekey"
                type="password"
                label="Private key"
                placeholder="Private key"
                margin="normal"
                value={privatekey}
                disabled={show === 'collapse' ? true : false}
                onChange={this.handleChange('privatekey')}
              />
            </FormControl>
          </Paper>

          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '24px',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingRight: '24px'
            }}
            square
            elevation={0}
          >
            <Typography variant="title">3. Choose your account</Typography>

            <TextField
              id="select-account"
              select
              label="Account"
              value={accountName}
              disabled={show === 'collapse' ? true : false}
              onChange={this.handleChange('accountName')}
              margin="normal"
              fullWidth
            >
              {accountList.map((a, i) => (
                <MenuItem key={i} value={a}>
                  {a}
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </SwipeableViews>

        <MobileStepper
          style={{ flexBasis: 50 }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              variant={activeStep === 2 ? (accountName ? 'contained' : 'flat') : 'flat'}
              color={activeStep === 2 ? (accountName ? 'primary' : 'default') : 'default'}
              disabled={activeStep === 2 ? !accountName : false}
            >
              {nextButtonText}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft /> Back
            </Button>
          }
        />
      </RegisterRoot>
    )
  }
}

export default RegisterStep
