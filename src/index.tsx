import React from 'react'
import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import history from './customHistory';
import { Provider } from 'react-redux'

import { App } from './components/App'
import { TransferPage } from './components/TransferPage';

import { store } from './modules/store'

import 'decentraland-ui/lib/styles.css'

require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="transfer" element={<TransferPage />} />
      </Routes>
    </HistoryRouter>
  </Provider>,
  document.getElementById('root')
)

