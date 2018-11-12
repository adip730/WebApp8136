import React, { Component } from 'react';
import {auth,db} from './../../firebase/firebase';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Modal } from 'reactstrap';
import Preview from './Preview';


class Workout extends Component {

   constructor() {
     super();

     this.state = {
       dayIndex: 0,
       //wID: '',
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

    console.log(this.props)
    console.log(this.props.days[0]);


    /*{this.props.days[0].wID}
    <Preview wID = {this.props.days[this.state.dayIndex].wID} />*/

    const dL = days.map((d,i) => {
      if (i == this.state.dayIndex) {
        return(
          <div style={{display:'flex', flexDirection: 'column',
            alignItems:'center', justifyContent:'center'}}>
            <h1>Today's Workout</h1>
            <br/>

            <Card style={{width: '500px', alignItems: 'center'}}>
                <CardTitle>
                  {today}
                </CardTitle>
                <CardBody>
                  <Preview wID = {d.wID} />
                </CardBody>
            </Card>
          </div>
        )
      }
    })

    return (
      <div>
        {dL}
      </div>
    )
  }
}

export default Workout;
