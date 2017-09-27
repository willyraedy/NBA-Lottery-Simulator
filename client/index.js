import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './index.scss'
import store from './store'
import { Main } from './components';

// establishes socket connection
import './socket'

const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
