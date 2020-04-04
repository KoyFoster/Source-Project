import React from 'react';
import './App.css';
import StatCard from './Components/StatCard';
import NavBar from './Components/NavBar'
import FootBar from './Components/FootBar'
import {ThemeProvider, createMuiTheme, useMediaQuery, Box} from '@material-ui/core'
import {lightGreen, green} from '@material-ui/core/colors'
import {Col} from './Components/DivGrid'

/* ---------------------- CORE ---------------------- */
function App() {

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


//theme palette
const palette = {
  type: prefersDarkMode ? 'dark' : 'light',
  primary: lightGreen,
  secondary: green,
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
    <Col>
      <Box name='body' display='flex-box' width='100%' height={'100%'} align='center' bgcolor='darkGrey'>
        <Col>
          <NavBar/>
          <FootBar/>
        </Col>
      </Box>
    </Col>
    </ThemeProvider>
  );
}

export default App;