import React from 'react';

export default class FiftyButton extends React.Component {
    render() {
      if (this.props.fiftyActive == false)
        return <></>;
      return <button className="lifeline-button" onClick={this.props.onFiftyClick}>
        50:50
      </button>
    }
  }