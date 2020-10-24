import React, { Component } from 'react';
import Popup from './Forms/Popup';

export default class TogglePopup extends Component {
  state = { seen: false };

  togglePop = () => {
    console.log('seen:', this.state.seen);
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ seen: !this.state.seen });
  };

  UI = () => {
    return <div>Big Butts</div>;
  };

  render() {
    return (
      <div>
        <button
          style={this.props.style}
          type="button"
          onClick={() => {
            this.togglePop();
          }}
        >
          {/* eslint-disable-next-line react/prop-types */}
          {this.props.children}
        </button>
        {this.state.seen ? (
          // eslint-disable-next-line react/prop-types
          <Popup bToggle={this.togglePop} component={this.props.component} />
        ) : null}
      </div>
    );
  }
}
