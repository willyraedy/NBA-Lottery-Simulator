import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.scss'
import store from './store'
import { Main } from './components';

// establishes socket connection
import './socket'

console.log('Can you see me?')

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
