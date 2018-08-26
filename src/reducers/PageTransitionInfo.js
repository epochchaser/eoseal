import * as types from '../actions/ActionTypes'
import * as values from '../constants/Values'

const initialState = {
  pageIndex: values.HOME_PAGE_INDEX
}

const PageTransitionInfo = (state = initialState, { type, payload, err }) => {
  switch (type) {
    case types.SHOW_TRANSFER_VIEW_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.SHOW_TRANSFER_VIEW_FAILED:
      return {
        ...state,
        showError: true,
        err
      }

    case types.CLOSE_TRANSFER_VIEW_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.CLOSE_TRANSFER_VIEW_FAILED:
      return {
        ...state,
        showError: true,
        err
      }
    case types.SHOW_REGISTER_STEP_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.SHOW_REGISTER_STEP_FAILED:
      return {
        ...state,
        showError: true,
        err
      }

    case types.CLOSE_REGISTER_STEP_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.CLOSE_REGISTER_STEP_FAILED:
      return {
        ...state,
        showError: true,
        err
      }

    case types.SHOW_LOCK_SCREEN_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.SHOW_LOCK_SCREEN_FAILED:
      return {
        ...state,
        showError: true,
        err
      }

    case types.CLOSE_LOCK_SCREEN_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case types.CLOSE_LOCK_SCREEN_FAILED:
      return {
        ...state,
        showError: true,
        err
      }
    default:
      return state
  }
}

export default PageTransitionInfo
