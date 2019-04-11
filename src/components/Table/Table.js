import React from 'react';

import './Table.scss';

class Table extends React.PureComponent {
  render() {
    const { data, headerTitles, bodyKeys } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            {headerTitles.map((currentTitle, index) => (
              <th key={currentTitle + index}>{currentTitle}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, ind) => (
            <tr key={ind}>
              {bodyKeys.map((currentKey, i) => (
                <td key={currentKey + i}>{item[currentKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
