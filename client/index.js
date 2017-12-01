import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './index.scss';
import store from './store';
import Main from './components/main';

// rgba(224, 29, 55, 0.91)

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Tsukushi A Round Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
    subheading: {
      fontFamily: '"Toppan Bunkyu Midashi Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    title: {
      fontFamily: '"Toppan Bunkyu Midashi Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '30px',
    },
  },
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
    MuiInput: {
      root: {
        fontFamily: '"Toppan Bunkyu Midashi Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
    MuiTableHead: {
      root: {
        color: 'black',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'rgba(224, 29, 55, 0.85)',
      },
    },
    MuiButton: {
      flatPrimary: {
        color: 'rgba(224, 29, 55, 0.85)',
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
  document.getElementById('app'),
);
