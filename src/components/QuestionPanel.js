import React from 'react';
import AnswerText from './AnswerText.js';
import MoneyText from './MoneyText.js';
import AnswerButton from './AnswerButton.js';
import {Questions} from './App.js';
import {QuestionsSw} from './App.js';

export default class QuestionPanel extends React.Component {
    render() {
      var QN = this.props.QuestionNo;
      var AnswerStyle = QNtoAStyle(QN);
      var RectangleStyle = QNtoRStyle(QN);
      var RectangleStyle2 = QNtoRStyle2(QN);
      var QNText;
      if (this.props.questionSwitched == false)
        QNText = Questions[QN].text;
      else
        QNText = QuestionsSw[QN].text;
      return <>
        <div className={"colored-rectangle " + RectangleStyle}></div>
        <div className={"colored-rectangle " + RectangleStyle2}></div>
        <div className={"colored-rectangle " + RectangleStyle}></div>
        <MoneyText
        className={AnswerStyle}
        panelStyle={this.props.panelStyle}
        nextQuestion={this.props.nextQuestion} 
        questionAnswered={this.props.questionAnswered}
        lost={this.props.lost}
        QuestionNo={this.props.QuestionNo}
        questionIsReadyToSwitch={this.props.questionIsReadyToSwitch}
        />
        <AnswerText 
        className = {AnswerStyle}
        text={QNText}
        questionActive={this.props.questionActive}
        onStartClick={this.props.onStartClick}/>
        <div>
        <AnswerButton QuestionNo={QN} id={0} style={{backgroundColor: this.props.AnswerbgColors[0]}} questionSwitched={this.props.questionSwitched} handleClick={i => this.props.handleClick(0)} optionsActive={this.props.optionsActive} questionActive={this.props.questionActive}/>
        <AnswerButton QuestionNo={QN} id={1} style={{backgroundColor: this.props.AnswerbgColors[1]}} questionSwitched={this.props.questionSwitched} handleClick={i => this.props.handleClick(1)} optionsActive={this.props.optionsActive} questionActive={this.props.questionActive}/>
        </div>
        <div>
        <AnswerButton QuestionNo={QN} id={2} style={{backgroundColor: this.props.AnswerbgColors[2]}} questionSwitched={this.props.questionSwitched} handleClick={i => this.props.handleClick(2)} optionsActive={this.props.optionsActive} questionActive={this.props.questionActive}/>
        <AnswerButton QuestionNo={QN} id={3} style={{backgroundColor: this.props.AnswerbgColors[3]}} questionSwitched={this.props.questionSwitched} handleClick={i => this.props.handleClick(3)} optionsActive={this.props.optionsActive} questionActive={this.props.questionActive}/>
        </div>
      </>
    }
}

function QNtoRStyle(QN) {
    if (QN < 5)
      return "R-level1";
    if (QN < 8)
      return "R-level2";
    if (QN < 10)
      return "R-level22"
    if (QN < 14)
      return "R-level3";
    return "R-levelM";
  }
  
function QNtoRStyle2(QN) {
    if (QN < 5)
      return "R-level1_2";
    if (QN < 8)
      return "R-level2_2";
    if (QN < 10)
      return "R-level22_2";
    if (QN < 12)
      return "R-level3_2";
    if (QN < 14)
      return "R-level32_2";
    return "R-levelM_2";
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