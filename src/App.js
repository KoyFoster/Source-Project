import React from 'react';
import NavBar from './Components/NavBar';
import FootBar from './Components/FootBar';

/* ---------------------- CORE ---------------------- */
function App() {
  return (
    <div>
      <div>
        <div style={{ backgroundColor: 'grey' }}>
          <NavBar height="32px" />
          <FootBar />
        </div>
      </div>
    </div>
  );
}

export default App;
