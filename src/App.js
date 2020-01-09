import React from "react";
import "./App.css";
import StatCard from './Components/StatCard.js';

import {Button, MuiThemeProvider, createMuiTheme} from '@material-ui/core'


//Styles
const theme = createMuiTheme({
  overrides: {
      MuiButton:
      {
        contained: {          
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,

          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          padding: '0 30px',
        }
      },w
      MuiTextField:
      {
        contained: {          
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,

          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          padding: '0 30px',
        }
      },


  },

      //Global style that effects all sub styles
      /*'@global': 
      {
          //If you nest themes, You should target [class*="MuiButton-root"].
          '.MuiButton-root': {
            fontSize: '1rem',
          },
          '.MuiInputLabel-root': {
            fontSize: '1rem',
  
            padding: '6px 6px',
            borderRadius: 3
          },
          '.MuiTextField-root': {
              fontSize: '1px',
              width: '152px'
          },
      },
      root: {
          fontSize: '16px',
      },
      checked: {},
      
      Label: {  
          textAlign: 'center',        
          backgroundColor: 'black',
          color: 'white',
      },
  
      Field: {
          textAlign: 'center',
      },
      NumberField: {  
          width: '56px',
          textAlign: 'center'
      },
  
      Button: {
      },*/
  });

//Global Style
const Global = withStyle({


});


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