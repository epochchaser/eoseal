import React, { Component } from 'react'
import Router from 'route-lite'
import HomeContainer from './HomeContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <HomeContainer />
      </Router>
    )
  }
}

export default App
