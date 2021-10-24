import React from 'react';
import {Questions} from './App.js';
import {QuestionsSw} from './App.js';

export default class AnswerButton extends React.Component {
    render() {
      var QN = this.props.QuestionNo;
      var AnswerStyle = QNtoAStyle(QN);
      var ID = this.props.id;
      var OptionText;
      if (this.props.optionsActive[ID] == false)
        OptionText = "";
      else if (this.props.questionSwitched == false)
        OptionText = Questions[QN].options[ID].text;
      else
        OptionText = QuestionsSw[QN].options[ID].text;
      if (this.props.questionActive <= 1) {
        return <button className={"answer-button " + AnswerStyle}
                    style={this.props.style}></button>
      } else {
      return <button className={"answer-button " + AnswerStyle}
              onClick={this.props.handleClick}
              style={this.props.style}>
        {Questions[QN].options[ID].id + '. ' + OptionText}
      </button>
      }
    }
}

function QNtoAStyle(QN) {
    if (QN < 5)
      return "A-level1";
    if (QN < 10)
      return "A-level2";
    if (QN < 14)
      return "A-level3";
    return "A-levelM";
}

