import { applyMiddleware, createStore } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { reducer } from './reducer'
import { sagas } from './sagas'

const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
})

const middleware = applyMiddleware(sagasMiddleware, loggerMiddleware)
const store = createStore(reducer, middleware)

sagasMiddleware.run(sagas)

export { store }
