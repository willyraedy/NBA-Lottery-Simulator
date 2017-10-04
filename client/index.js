import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './index.scss'
import store from './store'
import { Main } from './components';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      padding: {
        padding: '0 1em 0 1em',
        '&:last-child': {
          paddingRight: '0px',
        },
      },
      numeric: {
        textAlign: 'left',
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
