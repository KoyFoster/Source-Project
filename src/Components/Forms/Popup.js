import '../../App.css';
import React, { Component } from 'react';

export default class Popup extends Component {
  handleClick = () => {
    console.log('handleClick', this.props);
    this.props.bToggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          {this.props.component ? this.props.component : null}
        </div>
      </div>
    );
  }
}
