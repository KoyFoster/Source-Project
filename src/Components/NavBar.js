import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import Stats from './StatCard';
import { Row } from './DivGrid';

function NavBar(props) {
  return (
    //style={{border: '1px solid red', width: '100%', height: '100%', align: 'center'}}
    <div
      align="left"
      style={{
        ...props.style,
        margin: 'none',
        padding: '5px',
        background: 'lightGrey',
      }}
    >
      <HashRouter basename="/">
        <Row justifyContent="left" style={{ height: props.height }}>
          {' '}
          {/* The actual nav bar */}
          <Link to="/">
            <button style={{ margin: '1px' }}>Home</button>
          </Link>
          <Link to="/StatCard">
            <button style={{ margin: '1px' }}>Stat Card</button>
          </Link>
        </Row>
        <hr style={{ display: 'none' }} />

        <div>
          <Route exact path="/" />
          <Route path="/StatCard" component={Stats} />
        </div>
      </HashRouter>
    </div>
  );
}

export default NavBar;
