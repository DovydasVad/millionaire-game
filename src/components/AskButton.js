import React from 'react';

export default class KlauskButton extends React.Component {
    render() {
      if (this.props.KlauskActive == false)
        return <></>;
      return <button className="lifeline-button" onClick={this.props.onKlauskClick}>
        Ask!
      </button>
    }
  }