import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { WS_STATE } from '../core/constants';
import { updateWsState } from '../store/actions/ws';
import { addOrders } from '../store/actions/orderBook';
import { addTrades } from '../store/actions/trades';

const withWS = (WrappedComponent) => {
  let ws = null;
  const defaultSubscribeMsg = {
    event: 'subscribe',
    symbol: 'tBTCUSD',
  };

  class HOC extends React.PureComponent {
    state = {
      orderBookChannelId: null,
      tradesChannelId: null,
    }

    componentDidMount() {
      ws = this.connectWs();
    }

    componentDidUpdate(prevProps) {
      const { wsState } = this.props;

      if (prevProps.wsState !== wsState) {
        if (wsState === WS_STATE.CONNECTING) {
          ws = this.connectWs();
        } else if (wsState === WS_STATE.DISCONNECTING) {
          this.closeWs();
        }
      }

      if (prevProps.precision !== this.props.precision) {
        this.resubscribeToOrderBook();
      }
    }

    componentWillUnmount() {
      this.closeWs();
    }

    connectWs = () => {
      ws = new WebSocket('wss://api.bitfinex.com/ws/2');

      ws.onopen = this.onWsOpen;
      ws.onmessage = this.onWsMessage;
      ws.onclose = this.onWsClose;
      ws.onerror = error => console.error(error);

      return ws;
    };

    onWsOpen = () => {
      this.props.updateWsState(WS_STATE.CONNECTED);

      this.subscribeToOrderBook();
      this.subscribeToTrades();
    }

    onWsMessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.event === 'subscribed') {
        this.handleSubscription(data);
      } else if (data.event === 'unsubscribed') {
        this.subscribeToOrderBook();
      } else if (Array.isArray(data)) {
        const [channelId, ...rest] = data;
        const { orderBookChannelId, tradesChannelId } = this.state;

        if (channelId === orderBookChannelId) {
          this.handleOrderBookChange(rest);
        } else if (channelId === tradesChannelId) {
          this.handleTradesChange(rest);
        }
      }
    }

    onWsClose = () => this.props.updateWsState(WS_STATE.DISCONNECTED);

    closeWs = () => ws.close();

    handleSubscription = (data) => {
      const { channel, chanId } = data;

      if (channel === 'book') {
        this.setState({ orderBookChannelId: chanId });
      } else if (channel === 'trades') {
        this.setState({ tradesChannelId: chanId });
      }
    }

    subscribeToTrades = () => {
      const msg = JSON.stringify({
        ...defaultSubscribeMsg,
        channel: 'trades',
      });

      ws.send(msg);
    };

    subscribeToOrderBook = () => {
      const { precision } = this.props;
      const msg = JSON.stringify({
        ...defaultSubscribeMsg,
        channel: 'book',
        prec: `P${precision}`,
      });

      ws.send(msg);
    };

    resubscribeToOrderBook = () => {
      const { orderBookChannelId } = this.state;

      if (orderBookChannelId) {
        // The only case when we unsubscribe here is when we want to resubscribe
        // Thus, we listen to that event above and re-subscribe there
        ws.send(JSON.stringify({
          event: 'unsubscribe',
          chanId: orderBookChannelId,
        }));
      }
    }

    handleOrderBookChange = (ordersData) => {
      if (Array.isArray(ordersData) && Array.isArray(ordersData[0])) {
        const orders = ordersData.map(order => {
          const [price, count, amount] = order;
          return {
            price,
            count,
            amount: Number(amount).toFixed(2),
          };
        });

        this.props.addOrders(orders);
      }

      // TODO: handle other cases rather than adding orders
    }

    handleTradesChange = (tradesData) => {
      if (Array.isArray(tradesData[1]) && tradesData[0] === 'te') {
        const [
          ID, timestamp, price, amount,
        ] = tradesData[1];

        const newTrade = {
          ID,
          date: moment.unix(timestamp).format('MM/DD/YYYY'), // does not work correctly
          price: Number(price).toFixed(2),
          amount: Number(amount).toFixed(4),
        };

        this.props.addTrades([newTrade]);
      }
    }

    render() {
      return <WrappedComponent />;
    }
  }

  const mapStateToProps = (state) => ({
    wsState: state.ws.wsState,
    precision: state.orderBook.precision,
  });

  const mapDispatchToProps = {
    updateWsState,
    addOrders,
    addTrades,
  };

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default withWS;
