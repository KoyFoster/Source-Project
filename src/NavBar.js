import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import { Row } from './Components/DivGrid';
// import CanvasCard from './CanvasCard';
import { Paper, Button } from '@material-ui/core';
import Test from './Deprecated/Test/Test';
import Stats from './Stat Calculator Generator/StatCard';
// import Resume from './Resume';

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
            {/* <Link to="/">
              <Button style={{ margin: '1px' }}>Home</Button>
            </Link> */}
            <Link to="/CalcCreator">
              <div className="tooltip">
                <div>
                  <Button style={{ margin: '1px' }}>Calc.Creator</Button>
                </div>
                <span className="tooltiptext">
                  A calculator doesn't exist for the thing you like? Create one
                  here.
                </span>
              </div>
            </Link>
            <Link to="/Calculators">
              <div className="tooltip">
                <div>
                  <Button style={{ margin: '1px' }}>Calculators</Button>
                </div>
                <span className="tooltiptext">
                  Use calculators created by other users
                </span>
              </div>
            </Link>
            {/* <Link disabled to="/Profiles"> */}
            <div className="tooltip">
              <div>
                <Button disabled style={{ margin: '1px' }}>
                  Profiles
                </Button>
              </div>
              <span className="tooltiptext">
                View profiles from user created calculators
              </span>
            </div>
            {/* </Link> */}
            {/* <Link to="/CanvasCard">
              <Button style={{ margin: '1px' }}>Canvas Card</Button>
            </Link> */}
            <Link to="/Test">
              <Button style={{ margin: '1px' }}>Test</Button>
            </Link>
          </Row>
        </Paper>
        <hr style={{ display: 'none' }} />

        {/* <div>
          <Route exact path="/" render={() => <Resume></Resume>} />
        </div> */}
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

        {/* <div>
          <Route exact path="/" />
          <Route path="/CanvasCard" component={CanvasCard} />
        </div> */}
        <div>
          <Route exact path="/" />
          <Route path="/Test" component={Test} />
        </div>
        {/* <div>
          <Route exact path="/" />
          <Route path="/Test2" component={Test2} />
        </div> */}
      </HashRouter>
    </Paper>
  );
}

export default NavBar;
