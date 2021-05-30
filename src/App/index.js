import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
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
          <Footer />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
