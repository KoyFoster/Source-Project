import './App.css';
import React from 'react';
import NavBar from './Components/NavBar';
import FootBar from './Components/FootBar';

/* ---------------------- CORE ---------------------- */
function App() {
  return (
    <div>
      <div
        name="body"
        display="flex-box"
        width="100%"
        height={'100%'}
        align="center"
        bgcolor="darkGrey"
      >
        <div>
          <NavBar height="32px" />
          <FootBar />
        </div>
      </div>
    </div>
  );
}

export default App;
