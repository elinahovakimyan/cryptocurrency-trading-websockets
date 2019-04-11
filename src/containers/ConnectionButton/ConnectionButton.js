import React from 'react';
import { connect } from 'react-redux';

import { CustomButton } from '../../components';
import { updateWsState } from '../../store/actions/ws';
import { WS_STATE } from '../../core/constants';

import './ConnectionButton.scss';

class ConnectionButton extends React.PureComponent {

  getConnectingButtonText = (state) => {
    switch (state) {
      case WS_STATE.DISCONNECTED:
        return 'Connect';
      case WS_STATE.CONNECTED:
        return 'Disconnect';
      default:
        return 'In progress...';
    }
  }

  changeConnectionStatus = () => {
    const { wsState } = this.props;
    if (wsState === WS_STATE.CONNECTED) {
      this.props.updateWsState(WS_STATE.DISCONNECTING);
    } else if (wsState === WS_STATE.DISCONNECTED) {
      this.props.updateWsState(WS_STATE.CONNECTING);
    }
  }

  render() {
    const { wsState } = this.props;

    const connectingButtonText = this.getConnectingButtonText(wsState);

    return (
      <CustomButton onClick={this.changeConnectionStatus}>
        {connectingButtonText}
      </CustomButton>
    );
  }
}

const mapStateToProps = (state) => ({
  wsState: state.ws.wsState,
});

const mapDispatchToProps = {
  updateWsState,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionButton);
