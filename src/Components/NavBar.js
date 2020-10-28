import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import Stats from './StatCard';
import { Row } from './DivGrid';
import CanvasCard from './CanvasCard';
// import Test2 from './Test2';
// import Test2 from './Test2';
import { Paper, Button } from '@material-ui/core';

// Make drop list for
// - Calculator creator
// - Established Calculators
// - Established profile cards

function NavBar(props) {
  return (
    <Paper
      align="left"
      style={{
        ...props.style,
        margin: 'none',
        padding: '5px',
        background: 'lightGrey',
      }}
    >
      <HashRouter basename="/">
        <Paper
          style={{
            ...props.style,
            margin: 'none',
            padding: '5px',
          }}
        >
          <Row justifyContent="left" style={{ height: props.height }}>
            {' '}
            {/* The actual nav bar */}
            <Link to="/">
              <Button style={{ margin: '1px' }}>Home</Button>
            </Link>
            <Link to="/CalcCreator">
              <Button style={{ margin: '1px' }}>Calc.Creator</Button>
            </Link>
            <Link to="/Calculators">
              <Button style={{ margin: '1px' }}>Calculators</Button>
            </Link>
            <Link to="/Profiles">
              <Button style={{ margin: '1px' }}>Profiles</Button>
            </Link>
            <Link to="/CanvasCard">
              <Button style={{ margin: '1px' }}>Canvas Card</Button>
            </Link>
            {/* <Link to="/Test2">
              <Button style={{ margin: '1px' }}>Test2</Button>
            </Link> */}
            {/* <Link to="/Test2">
              <Button style={{ margin: '1px' }}>Test2</Button>
            </Link> */}
          </Row>
        </Paper>
        <hr style={{ display: 'none' }} />

        <div>
          <Route exact path="/" />
          <Route
            path="/CalcCreator"
            render={() => <Stats state={'creator'}></Stats>}
          />
        </div>

        <div>
          <Route exact path="/" />
          <Route
            path="/Calculators"
            render={() => <Stats state={'calcs'}></Stats>}
          />
        </div>

        <div>
          <Route exact path="/" />
          <Route
            path="/Profiles"
            render={() => <Stats state={'profiles'}></Stats>}
          />
        </div>

        <div>
          <Route exact path="/" />
          <Route path="/StatCard" render={() => <Stats></Stats>} />
        </div>

        <div>
          <Route exact path="/" />
          <Route path="/CanvasCard" component={CanvasCard} />
        </div>

        {/* <div>
          <Route exact path="/" />
          <Route path="/Test2" component={Test2} />
        </div> */}
        {/* <div>
          <Route exact path="/" />
          <Route path="/Test2" component={Test2} />
        </div> */}
      </HashRouter>
    </Paper>
  );
}

export default NavBar;
