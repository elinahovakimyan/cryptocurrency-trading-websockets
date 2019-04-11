import React from 'react';
import { connect } from 'react-redux';

import { incrementPrecision, decrementPrecision } from '../../store/actions/orderBook';
import { CollapsibleContainer, CustomButton, Table } from '../../components';

import './OrderBook.scss';

class OrderBook extends React.PureComponent {

  renderOrderBookActions = () => {
    const { precision } = this.props;

    return (
      <div>
        <CustomButton onClick={this.props.incrementPrecision} disabled={precision > 3}>
          <h4>-</h4>
        </CustomButton>
        <CustomButton onClick={this.props.decrementPrecision} disabled={precision < 1}>
          <h4>+</h4>
        </CustomButton>
      </div>
    );
  }

  render() {
    const { orderAsks, orderBids } = this.props;

    return (
      <CollapsibleContainer
        className="order-book"
        title="Order book (BTC/USD)"
        actions={this.renderOrderBookActions()}
      >

        <div className="orderbook-tables-wrapper">
          <Table
            headerTitles={['Count', 'Amount', 'Price']}
            data={orderBids}
            bodyKeys={['count', 'amount', 'price']}
          />
          <Table
            headerTitles={['Price', 'Amount', 'Count']}
            data={orderAsks}
            bodyKeys={['price', 'amount', 'count']}
          />
        </div>
      </CollapsibleContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { precision, orderAsks, orderBids } = state.orderBook;

  return { precision, orderAsks, orderBids };
};

const mapDispatchToProps = {
  incrementPrecision,
  decrementPrecision,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
