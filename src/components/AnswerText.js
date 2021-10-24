import React from 'react';

export default class AnswerText extends React.Component {
    render() {
      if (this.props.questionActive <= 0) {
      return <div className={"question-text " + this.props.className}
        onClick={this.props.onStartClick} >
      </div>
      } else {
      return <div className={"question-text " + this.props.className}
        onClick={this.props.onStartClick}>
        {this.props.text}
      </div>
      }
    }
  }