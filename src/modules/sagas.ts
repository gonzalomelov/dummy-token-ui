import { all } from '@redux-saga/core/effects'
import { walletSaga } from './wallet/sagas'

export function* sagas() {
  yield all([walletSaga()])
}
