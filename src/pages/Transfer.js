import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Router, { Link, goBack } from 'route-lite'

const RootDiv = styled.div`
  flexgrow: 1;
`

const Title = styled(Typography)`
  flex: 1;
`
const GoBackButton = styled(IconButton)`
  margin: theme.spacing.unit;
`
class Transfer extends Component {
  render() {
    return (
      <RootDiv>
        <AppBar position="static" color="default">
          <Toolbar>
            <GoBackButton aria-label="Back" onClick={() => goBack()}>
              <KeyboardBackspaceIcon cursor="pointer" />
            </GoBackButton>
            <Title variant="title" color="inherit">
              Back
            </Title>
          </Toolbar>
        </AppBar>
      </RootDiv>
    )
  }
}

export default Transfer
