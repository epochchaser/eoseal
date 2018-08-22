import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Home from './pages/Home'
import Router, { Link, goBack } from 'route-lite'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Home />
        </div>
      </Router>
    )
  }
}

export default App
