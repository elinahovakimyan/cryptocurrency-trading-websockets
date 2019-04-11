import React from 'react';

import './CollapsibleContainer.scss';

class CollapsibleContainer extends React.PureComponent {
  state = {
    isCollapsed: true,
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  }

  render() {
    const {
      title, actions, className, children,
    } = this.props;
    const { isCollapsed } = this.state;
    const arrowDirection = isCollapsed ? 'right' : 'down';

    return (
      <div className={`collapsible-container dark-bg ${className}`}>
        <div className="header">
          <div className="title-section" onClick={this.toggleCollapse}>
            <i className={`fas fa-chevron-${arrowDirection}`} />
            <h2>{title}</h2>
          </div>
          {actions || null}
        </div>

        {!isCollapsed
          ? (
            <div className="body">
              {children}
            </div>
          ) : null}
      </div>
    );
  }
}

export default CollapsibleContainer;
