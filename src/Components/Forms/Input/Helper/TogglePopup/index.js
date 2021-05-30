/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Popup from '../Popup';

export default class TogglePopup extends Component {
  state = { seen: false };

  togglePop = () => {
    this.setState({ seen: !this.state.seen });
  };

  UI = () => {
    return <div>[UI]</div>;
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
          {...this.props.disabled}
        >
          {this.props.children}
        </button>
        {this.state.seen ? (
          <Popup bToggle={this.togglePop} component={this.props.component} />
        ) : null}
      </div>
    );
  }
}
