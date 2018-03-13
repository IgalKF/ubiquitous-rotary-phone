import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
      <div className="m-3 " actAsExpander={true}>
        {this.props.children}
      </div>
    </div>
    );
  }
}
