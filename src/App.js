import React from 'react';
import './App.css';
import StatCard from './Components/StatCard.js';

import {ThemeProvider, createMuiTheme, useMediaQuery} from '@material-ui/core'
import {blue, red} from '@material-ui/core/colors'


/* ---------------------- CORE ---------------------- */
function App() {

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

//theme palette
const palette = {
  type: prefersDarkMode ? 'dark' : 'light',
  primary: blue,
  secondary: red,
};//End of palette

//Styles
const theme = createMuiTheme({
  palette: palette,//End of palette
  
  status: {
    danger: 'orange',
  },

  props: {
    MuiTextField:
    {
      //TextField Props Here
      style: {//base component props
        backgroundColor: 'primary'
      },

      inputProps: {//Contents of the TextField
        style: { textAlign: 'center' }
      },
    },

    MuiButton:
    {
      style: {
        border:   'primary',
        padding:  '0 30px',
        fontSize: '1rem',
      }
    },

    MuiInputLabel: {//This also includes the lables of the TextFields
      style: {
        textAlign: 'right',
      },
    },
  }//End of props
});//End of theme

  return (
    <ThemeProvider theme={theme}>
      <StatCard></StatCard>
    </ThemeProvider>
  );
}

export default App;