import styled from 'styled-components'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import SendIcon from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'
import EosService from '../services/EosService'

const Trans = styled(
  posed.div({
    visible: { y: '40%', scale: 1, opacity: 1 },
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
  justify-content: center;
  z-index: 1;
  top: 0;
  left: 0;
`

class Transfer extends Component {
  state = {
    token: '',
    recipient: '',
    amount: 0,
    memo: '',
    openSnackbar: false,
    vertical: 'top',
    horizontal: 'right',
    message: ''
  }

  componentDidMount = () => {
    const { getTokens } = this.props
    getTokens()
  }

  handleCancelTransfer = () => {
    const { handleCancelTransfer } = this.props
    handleCancelTransfer()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleTransfer = () => {
    const { recipient, token, amount, memo } = this.state
    const { tokens, transferTokens } = this.props

    if (!recipient) {
      this.setState({
        message: 'Recipient needed!',
        openSnackbar: true
      })
    } else if (!token) {
      this.setState({
        message: 'Choose token to transfer!',
        openSnackbar: true
      })
    } else if (amount <= 0) {
      this.setState({
        message: 'Set valid amount!',
        openSnackbar: true
      })
    } else {
      const targetToken = tokens.filter(t => t.symbol === token)[0]
      const accountName = EosService.accountName

      transferTokens({
        contract: targetToken.code,
        authority: 'active',
        fromAccountName: accountName,
        toAccountName: recipient,
        symbol: targetToken.symbol,
        quantity: amount,
        memo,
        handleTransferSuccess: this.handleTransferSuccess
      })
    }
  }

  handleTransferSuccess = () => {
    alert('성공')
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false })
  }

  render() {
    const { show, tokens, closeTransferView } = this.props
    const { vertical, horizontal, openSnackbar, message, recipient, token, amount } = this.state

    return (
      <Trans pose={show}>
        <Fragment>
          {tokens && tokens.length > 0 ? (
            <Card
              style={{
                height: '360px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column'
              }}
              elevation={10}
            >
              <CardContent style={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="headline" component="h2">
                  Transfer Token
                </Typography>
                <Typography component="p">
                  <FormControl fullWidth>
                    <TextField
                      id="Recipient"
                      label="Recipient"
                      placeholder="Recipient"
                      value={recipient}
                      onChange={this.handleChange('recipient')}
                      margin="normal"
                    />
                  </FormControl>

                  <Grid container spacing={24}>
                    <Grid item xs={4}>
                      <TextField
                        id="select-token"
                        select
                        label="Token"
                        value={token}
                        onChange={this.handleChange('token')}
                        margin="normal"
                        fullWidth
                      >
                        {tokens.map((t, i) => (
                          <MenuItem key={i} value={t.symbol}>
                            {t.symbol}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        id="Amount"
                        label="Amount"
                        placeholder="Amount"
                        value={amount}
                        onChange={this.handleChange('amount')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Button
                  style={{ marginLeft: '16px', marginBottom: '16px' }}
                  variant="fab"
                  color="secondary"
                  onClick={closeTransferView}
                >
                  <CancelIcon />
                </Button>

                <Button
                  style={{ marginRight: '16px', marginBottom: '16px' }}
                  variant="fab"
                  color="primary"
                  onClick={this.handleTransfer}
                >
                  <SendIcon />
                </Button>
              </CardActions>
            </Card>
          ) : (
            <Paper
              style={{ height: '360px', width: '90%', display: 'flex', flexDirection: 'column' }}
              elevation={10}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress />
                <Typography
                  style={{ paddingTop: '16px' }}
                  gutterBottom
                  variant="title"
                  component="h2"
                >
                  Getting available tokens...
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Button
                  style={{ marginLeft: '16px', marginBottom: '16px' }}
                  variant="fab"
                  color="secondary"
                  onClick={closeTransferView}
                >
                  <CancelIcon />
                </Button>
              </div>
            </Paper>
          )}

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnackbar}
            onClose={this.handleCloseSnackbar}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{message}</span>}
          />
        </Fragment>
      </Trans>
    )
  }
}

Transfer.propTypes = {
  tokens: PropTypes.array
}

Transfer.defaultProps = {
  tokens: []
}

export default Transfer
