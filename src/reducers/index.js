import * as types from '../actions/ActionTypes'
import { combineReducers } from 'redux'
import AccountInfo from './AccountInfo'

const reducers = combineReducers({
  accountInfo: AccountInfo
})

export default reducers
