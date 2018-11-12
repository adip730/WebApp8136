import React, { Component } from 'react';
import {auth,db} from './../../firebase/firebase';
import Preview from './../Workout/Preview';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Modal } from 'reactstrap';

class Program extends Component {
  constructor() {
     super();

     this.state = {
       showPrev: false,
       wID: '',
       /*authUser: null,
       prog: '',
       sport: '',
       level: '',
       week: '',
       meso: '',
       weekIndex: '',
       thisWeek: {},
       days: [],
       today: '',
       seasD: '',
       seasM: '',
       seasY: '',
       weeksUntil: '',*/
     };
     this.toggle = this.toggle.bind(this);
  }

 toggle() {
    this.setState({
      showPrev: !this.state.showPrev
    });
  }

  setModalVisible(wID) {
      this.setState({wID: wID}),
      this.toggle();
  }



  render () {

    const {
      prog,
      sport,
      level,
      week,
      meso,
      days,
      today,
      weeksUntil,
    } = this.props;
    console.log(this.props.days);
    const dL = days.map((d,i) => {
      if (d.wID != null) {
      return (
        <div>
          <Card style={{width: '300px', alignItems: 'center'}} key={i}>
              <CardTitle>
                Day {i + 1}
                {': '}
                {d.wID}
              </CardTitle>
              <CardBody>
                <Button onClick={() => this.setModalVisible(d.wID)}>
                  View Workout
                </Button>
              </CardBody>


          </Card>
          <Modal
            isOpen = {this.state.showPrev}
            toggle={this.toggle}
          >
            <Preview wID = {this.state.wID} />
            <Button onClick={() => {
                this.setModalVisible(null);
              }}>
              Close Preview
            </Button>
          </Modal>
        </div>
      )}
    })

    return(
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <h1>Your Program</h1>
        <br/>

        <div>
          ProgramID: {prog} <br/>
            Sport: {sport} <br/>
            Level: {level}
        </div>
        <br/>
        <p> Today's Date: {today}</p>
        <p>
          <strong>This Week:</strong><br/>
          {this.props.weeksUntil > 0 &&
            <p>Weeks Until Season: {this.props.weeksUntil}</p>

          }
          {this.props.weeksUntil < 1 &&
            <p>Weeks Until Season: In Season</p>
          }

          Mesocycle: {meso} <br/>
          Week: {week}
        </p>

        {dL}

      </div>
    )
  }
}

export default Program;
