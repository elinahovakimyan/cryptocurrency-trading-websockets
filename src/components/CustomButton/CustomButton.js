import React from 'react';

import './CustomButton.scss';

class CustomButton extends React.PureComponent {
  render() {
    const { onClick, disabled, children } = this.props;

    return (
      <button
        type="button"
        onClick={!disabled ? onClick : null}
        className={`custom-button ${disabled ? 'disabled-btn' : ''}`}
      >
        {children}

      </button>
    );
  }
}

export default CustomButton;
