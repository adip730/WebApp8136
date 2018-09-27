import React, { Component } from 'react';
import {auth,db} from './../../firebase/firebase';

class ProgramDisplay extends Component {
  constructor(props) {
    super(props);

  }

  render () {

      return(
        <div>
          <h1>Your Program</h1>
          <br/>
          <div>
            ProgramID: {this.props.prog} <br/>
              Sport: {this.props.sport} <br/>
              Level: {this.props.level}
          </div>
          <br/>
          <p> Today's Date: {this.props.today}</p>
          <p>
            This Week: <br/>
            Days Until: {this.props.dBet} <br/>
            Mesocycle: {this.props.meso} <br/>
            Week: {this.props.week}
          </p>

          {this.props.days.map((d,i) => {
            return (
              <div>
                Day {i+1} {': '} {d.wID}
              </div>
            )
          })}

        </div>
      )
  }
}

export default ProgramDisplay;
