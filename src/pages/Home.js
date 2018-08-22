import SendIcon from '@material-ui/icons/Send'
import PersonIcon from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
import Transfer from './Transfer'
import React, { Component } from 'react'
import { Link } from 'route-lite'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
`

const NonGrowAppBar = styled(AppBar)`
  flexgrow: 0;
`

const GrowDiv = styled.div`
  flex-grow: 1;
`

const BottomDiv = styled.div`
  flex-grow: 0;
  flex-basis: 50;
  display: flex;
  flex-direction: row;
`

const MenuButton = styled(IconButton)`
  marginleft: -12;
  marginright: 20;
`

const Title = styled(Typography)`
  flex: 1;
`

const TransferIcon = styled(IconButton)`
  margin: theme.spacing.unit;
`

const GreenAvatar = styled(Avatar)`
  margin: 10;
  color: '#fff';
  backgroundcolor: green[500];
`

class Home extends Component {
  render() {
    return (
      <RootDiv>
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

        <GrowDiv>Lorem</GrowDiv>

        <BottomDiv>
          <GrowDiv>
            <Link component={Transfer} componentProps={{ text: 'from HOME' }}>
              <TransferIcon>
                <SendIcon cursor="pointer" />
              </TransferIcon>
            </Link>
          </GrowDiv>
          <GrowDiv>
            <Link component={Transfer} componentProps={{ text: 'from HOME' }}>
              <TransferIcon>
                <SendIcon cursor="pointer" />
              </TransferIcon>
            </Link>
          </GrowDiv>
        </BottomDiv>
      </RootDiv>
    )
  }
}

export default Home
