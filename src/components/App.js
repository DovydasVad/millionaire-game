import React from 'react';
import {Howl, Howler} from 'howler';
import RightPanel from './RightPanel.js';
import QuestionPanel from './QuestionPanel.js';
import '../App.css';

import Questions from '../data/Questions2-3.js';
import QuestionsSw from '../data/QuestionsSw2-3.js';
export {Questions};
export {QuestionsSw};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lost: false,
      QuestionNo: 0,
      questionAnswered: false,
      AnswerbgColors: Array(4).fill(""),
      optionsActive: Array(4).fill(true),
      questionActive: -1,
      optionSelected: false,
      switchActive: true,
      fiftyActive: true,
      questionSwitched: 0,
      questionIsReadyToSwitch: false,
    }
    this.sound = (new Howl({
      src: [''],
    }));
  }

  rightAnswer(i) {
    if (this.state.questionIsReadyToSwitch == false) {
      var srrc = 'music/Right' + this.state.QuestionNo + '.mp3';
      if (this.state.QuestionNo == 4 || this.state.QuestionNo == 9)
        srrc = 'music/Right' + this.state.QuestionNo + '.ogg';
    }
    if (this.state.QuestionNo <= 3) {
      var sounder = new Howl({
        src: [srrc],
      });
      sounder.play();
    }
    else {
      if (this.sound != null) {
        this.sound.stop();
        this.sound.unload();
      }
      this.sound = new Howl({src: [srrc]});
      this.sound.play();
    }
    
    const newbgColors = this.state.AnswerbgColors.slice();
    newbgColors[i] = "#40D15C";
    this.setState({
      QuestionNo: this.state.QuestionNo,
      AnswerbgColors: newbgColors,
      questionAnswered: true,
    })
  }

  wrongAnswer(answer) {
    if (this.state.questionIsReadyToSwitch == false) {
      var srrc = 'music/Wrong' + this.state.QuestionNo + '.mp3';
      if (this.sound != null) {
        this.sound.stop();
        this.sound.unload();
      }
      this.sound = new Howl({src: [srrc]});
      this.sound.play();
    }

    var rightAnswerId = letterToNumber(Questions[this.state.QuestionNo].rightLetter);
    if (this.state.questionSwitched == true)
      rightAnswerId = letterToNumber(QuestionsSw[this.state.QuestionNo].rightLetter);
    const newbgColors = this.state.AnswerbgColors.slice();
    newbgColors[answer] = "red";
    newbgColors[rightAnswerId] = "#40D15C";
    this.setState({
      AnswerbgColors: newbgColors,
      questionAnswered: true,
      lost: true,
    })
    if (this.state.questionIsReadyToSwitch == true) {
      this.setState({
        AnswerbgColors: newbgColors,
        questionAnswered: true,
        lost: false,
      })
    }
  }

  onSwitchClick() {
    if (this.state.lost == true)
      return;
    var srrc = 'music/PingSw.ogg';
    var sounder = new Howl({
      src: [srrc],
    });
    this.sound.stop();
    this.sound.unload();
    this.sound.play();
    sounder.play();
    this.setState({
      switchActive: false,
      questionIsReadyToSwitch: true,
    })
  }

  onFiftyClick() {
    if (this.state.lost == true)
      return;
    var srrc = 'music/Fifty.mp3';
    var sounder = new Howl({
      src: [srrc],
    });
    sounder.play();

    const rightAnswerId = letterToNumber(Questions[this.state.QuestionNo].rightLetter);
    var wrongOption1 = rightAnswerId;
    var wrongOption2 = rightAnswerId;

    while (wrongOption1 == rightAnswerId) {
      wrongOption1 = getRandomInt(0, 3);
    }
    while (wrongOption2 == rightAnswerId || wrongOption1 == wrongOption2) {
      wrongOption2 = getRandomInt(0, 3);
    }

    const newOptionsActive = this.state.optionsActive.slice();
    newOptionsActive[wrongOption1] = false;
    newOptionsActive[wrongOption2] = false;
    this.setState({
      optionsActive: newOptionsActive,
      fiftyActive: false,
    })
  }

  onStartClick() {
    if (this.state.questionActive < 2) {
      if (this.state.questionActive == -1) {
        if (this.sound != null) {
          this.sound.stop();
          this.sound.unload();
        }
        var srrc = 'music/Play0.ogg';
        this.sound = new Howl({src: [srrc]});
        this.sound.play();
      }
      else if ((this.state.questionActive == 0 && (this.state.QuestionNo == 0 || this.state.QuestionNo >= 5)) || this.state.questionIsReadyToSwitch) {
        if (this.sound != null) {
          this.sound.stop();
          this.sound.unload();
        }
        var srrc = 'music/Music' + this.state.QuestionNo + '.ogg';
        this.sound = new Howl({src: [srrc], loop: true});
        this.sound.play();
      }
    this.setState({
      questionIsReadyToSwitch: false,
      questionActive: (this.state.questionActive+1),
    })
    }
  }

  handleClick(i) {
    if (this.state.questionAnswered == true)
      return;
    if (this.state.optionSelected == false)
    {
      if (this.state.QuestionNo >= 5 && this.state.questionIsReadyToSwitch == false) {
        if (this.sound != null) {
          this.sound.stop();
          this.sound.unload();
        }
        var srrc = 'music/Final' + this.state.QuestionNo + '.ogg';
        this.sound = new Howl({src: [srrc]});
        this.sound.play();
      }
      const newbgColors = this.state.AnswerbgColors.slice();
      newbgColors[i] = "#F2A418";
      this.setState ({
        optionSelected: true,
        AnswerbgColors: newbgColors,
      })
      return;
    }
    const rightAnswerId = letterToNumber(Questions[this.state.QuestionNo].rightLetter);
    const rightAnswerIdSw = letterToNumber(QuestionsSw[this.state.QuestionNo].rightLetter);
    if ((this.state.questionSwitched == false && i == rightAnswerId) ||
    (this.state.questionSwitched == true && i == rightAnswerIdSw)) {
      this.rightAnswer(i);
    }
    else {
      this.wrongAnswer(i);
    }
  }

  nextQuestion() {
    if (this.state.lost == true || this.state.QuestionNo == 14)
      return;
    if (this.state.QuestionNo >= 4) {
      if (this.sound != null) {
        this.sound.stop();
        this.sound.unload();
      }
      var srrc = 'music/Play' + (this.state.QuestionNo+1) + '.ogg';
      if (this.state.questionIsReadyToSwitch == true) {
        srrc = 'music/Play' + (this.state.QuestionNo) + '.ogg';
      }
      this.sound = new Howl({src: [srrc]});
      this.sound.play();
    }
    if (this.state.questionIsReadyToSwitch == true) {
      this.setState ({
        questionSwitched: true,
      })
    }
    else {
      this.setState ({
        questionSwitched: false,
        QuestionNo: (this.state.QuestionNo+1),
      })
    }
    this.setState ({
      questionAnswered: false,
      AnswerbgColors: Array(4).fill(""),
      optionsActive: Array(4).fill(true),
      optionSelected: false,
      questionActive: 0,
    })
  }

  render() {
    var panelStyle = QNtoPStyle(this.state.QuestionNo);
    return (<>
        <RightPanel QuestionNo={this.state.QuestionNo}
        switchActive={this.state.switchActive}
        fiftyActive={this.state.fiftyActive}
        lost={this.state.lost}
        onSwitchClick={() => this.onSwitchClick()}
        onFiftyClick={() => this.onFiftyClick()}
        />
        <div className = {"question-panel " + panelStyle}><QuestionPanel
        panelStyle={this.state.panelStyle}
        AnswerbgColors={this.state.AnswerbgColors}
        QuestionNo={this.state.QuestionNo}
        handleClick={i => this.handleClick(i)}
        nextQuestion={() => this.nextQuestion()}
        onStartClick={() => this.onStartClick()}
        questionAnswered={this.state.questionAnswered}
        questionSwitched={this.state.questionSwitched}
        questionIsReadyToSwitch={this.state.questionIsReadyToSwitch}
        lost={this.state.lost}
        optionsActive={this.state.optionsActive}
        questionActive={this.state.questionActive}
        /></div>
      </>
    );
  }
}


function letterToNumber(letter) {
  if (letter === 'A')
    return 0;
  else if (letter === 'B')
    return 1;
  else if (letter === 'C')
    return 2;
  else
    return 3;
}

function QNtoPStyle(QN) {
  if (QN < 5)
    return "P-level1";
  if (QN < 10) {
    var str = "P-level2" + (QN-4);
    return str;
  }
  if (QN < 14) {
    var str = "P-level3" + (QN-9);
    return str;
  }
  return "P-levelM";
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}