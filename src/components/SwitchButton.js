import React from 'react';

export default class SwitchButton extends React.Component {
    render() {
      if (this.props.switchActive == false)
        return <></>;
      return <button className="lifeline-buttonSW" onClick={this.props.onSwitchClick}>
        ↺
      </button>
    }
  }