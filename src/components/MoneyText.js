import React from 'react';
import MoneyList from '../data/Money.js';

export default class MoneyText extends React.Component {
    render() {
      if (this.props.questionIsReadyToSwitch == true && this.props.questionAnswered == false) {
        return <h1 className="money-textT" onClick={this.props.nextQuestion}> ↺ </h1>
      }
      if (this.props.questionIsReadyToSwitch == true && this.props.questionAnswered == true) {
        return <h1 className="money-text" onClick={this.props.nextQuestion}> ↺ </h1>
      }
      if ((this.props.questionAnswered == false || this.props.lost) || this.props.questionIsReadyToSwitch)
        return <h1 className={"money-textT"}>
          - {MoneyList[Math.max(this.props.QuestionNo-1, 0)]} -</h1>
      return <>
      <h1 className="money-text" onClick={this.props.nextQuestion}>- {MoneyList[this.props.QuestionNo]} -</h1>
      </>
    }
  }