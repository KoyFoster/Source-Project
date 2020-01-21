import React from "react";
import "./App.css";
import StatCard from './Components/StatCard.js';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'


//Styles
const theme = createMuiTheme({
  //overrides: {
    MuiTextField:
    {
      standard: {
        margin: '30 30px',
        
      },

      filled: {
        //style: {width: "56px"},
        //inputProps: {style: { textAlign: 'center'}},

        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,

        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        margin: '30 30px',
      },
      outlined: {
        textAlign: 'center',

        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,

        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        margin: '30 30px',
      }
    },
    

    MuiButton:
    {
      contained: {
        fontSize: '1rem',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,

        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
      }
    },

    MuiInputAdornment: {
      standard: {
        shrink: true,
        backgroundColor: 'orange',
        textAlign: 'center',
      },

      filled: {
        shrink: true,
        backgroundColor: 'orange',
        textAlign: 'center',
      },
      outline: {
        textAlign: 'center',
      }
    },

    MuiInputLabel: {
      filled: {
        shrink: true,
        backgroundColor: 'orange',
        textAlign: 'center',
      },
      outline: {
        textAlign: 'center',
      }
    },
  //}//End of Override
});

//Global Style
/*const Global = withStyle({


});*/


/* ---------------------- CORE ---------------------- */
class App extends React.Component {
  render() {
  return (
    <MuiThemeProvider theme={theme}>
      <StatCard></StatCard>
    </MuiThemeProvider>
  )};
}

export default App;