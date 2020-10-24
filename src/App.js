import React from 'react';
import NavBar from './Components/NavBar';
import FootBar from './Components/FootBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

/* ---------------------- CORE ---------------------- */
function App() {
  const palletType = true ? 'dark' : 'light';
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  return (
    <div>
      <div>
        <ThemeProvider theme={darkTheme}>
          <NavBar height="32px" />
          <FootBar />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
