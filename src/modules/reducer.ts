import { combineReducers } from 'redux'
import { walletReducer as wallet } from './wallet/reducer'

export const reducer = combineReducers({
  wallet,
})
