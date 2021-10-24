import React from 'react';
import {Howl, Howler} from 'howler';
import SwitchButton from './SwitchButton.js';
import KlauskButton from './AskButton.js';
import FiftyButton from './FiftyButton.js';
import MoneyList from '../data/Money.js';

export default class RightPanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        KlauskActive: Array(2).fill(true),
      }
      this.sound = (new Howl({
        src: [''],
      }));
    }
  
    onKlauskClick(i) {
      if (this.props.lost == true)
        return;
      var srrc = (i == 0) ? 'music/Ping0.ogg' : 'music/Ping1.ogg';
      var sounder = new Howl({
        src: [srrc],
      });
      sounder.play();
      const newKlauskActive = this.state.KlauskActive.slice();
      newKlauskActive[i] = false;
      this.setState({
        KlauskActive: newKlauskActive,
      })
    }
  
    render() {
      const MoneyTree = [];
      for (var i = 14; i >= 0; i--) {
        var Class="";
        if ((i+1) % 5 != 0)
          Class = "safety-net";
        if ((i+1) == this.props.QuestionNo)
          Class += " answered-question";
        MoneyTree.push(<div className={Class}>{`\xa0`}{i+1}. {`\xa0` + MoneyList[i]}</div>);
      }
  
      return <>
      <div className="money-tree">
       <FiftyButton
       fiftyActive={this.props.fiftyActive}
       onFiftyClick={this.props.onFiftyClick}/>
       <KlauskButton 
       KlauskActive={this.state.KlauskActive[0]}
       onKlauskClick={i => this.onKlauskClick(0)}/>
       <KlauskButton 
       KlauskActive={this.state.KlauskActive[1]}
       onKlauskClick={i => this.onKlauskClick(1)}/>
       <SwitchButton 
       switchActive={this.props.switchActive}
       onSwitchClick={this.props.onSwitchClick}/>
       <div>{MoneyTree}</div>
      </div>
      </>
    }
  }