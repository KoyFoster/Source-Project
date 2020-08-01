import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import Stats from './StatCard';
import { Row } from './DivGrid';
import CanvasCard from './CanvasCard';
import Test from './Test';

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
          <Link to="/CanvasCard">
            <button style={{ margin: '1px' }}>Canvas Card</button>
          </Link>
          <Link to="/Test">
            <button style={{ margin: '1px' }}>Test</button>
          </Link>
        </Row>
        <hr style={{ display: 'none' }} />

        <div>
          <Route exact path="/" />
          <Route path="/StatCard" component={Stats} />
        </div>
        <div>
          <Route exact path="/" />
          <Route path="/CanvasCard" component={CanvasCard} />
        </div>
        <div>
          <Route exact path="/" />
          <Route path="/Test" component={Test} />
        </div>
      </HashRouter>
    </div>
  );
}

export default NavBar;
