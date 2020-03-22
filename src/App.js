import React from 'react';
import './App.css';
import Grid from './Components/Forms/Grid';
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

  return (
    <Grid iRows = {7} Header = {true}>
      <div name='butts'>One</div><div name='butts'>Two</div><div name='butts'>Three</div>
      </Grid>
  );
}

export default App;