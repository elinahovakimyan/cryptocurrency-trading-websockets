import React, { Component } from 'react';

import withWS from './HOC/withWS';
import { OrderBook, ConnectionButton, Trades } from './containers';

class App extends Component {

  render() {
    return (
      <div className="app">
        <ConnectionButton />
        <OrderBook />
        <Trades />
      </div>
    );
  }
}

export default withWS(App);
