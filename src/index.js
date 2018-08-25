import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import apiSaga from './sagas'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(apiSaga)
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#52c7b8',
      main: '#009688',
      dark: '#00675b',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffffff',
      main: '#e0e0e0',
      dark: '#aeaeae',
      contrastText: '#fff'
    },
    third: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#aeaeae',
      contrastText: '#fff'
    }
  },
  status: {
    danger: 'orange'
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
