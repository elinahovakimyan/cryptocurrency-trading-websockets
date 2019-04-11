import React from 'react';
import { connect } from 'react-redux';

import { CollapsibleContainer, Table } from '../../components';

import './Trades.scss';

class Trades extends React.PureComponent {

  render() {
    const { trades } = this.props;

    return (
      <CollapsibleContainer
        className="trades"
        title="Trades (BTC/USD)"
      >
        <Table
          headerTitles={['Time', 'Price', 'Amount']}
          data={trades}
          bodyKeys={['date', 'amount', 'price']}
        />
      </CollapsibleContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { trades } = state.trades;

  return { trades };
};

export default connect(mapStateToProps)(Trades);
