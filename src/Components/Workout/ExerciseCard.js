import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardFooter,
  CardTitle, CardSubtitle, Button} from 'reactstrap'

import {auth,db} from './../../firebase/firebase';

const unitEnum = {
  WEIGHT: "Weight",
  TIME: "Time",
  DISTANCE: "Distance",
  OTHER: "Other"
}

const weightTypeEnum = {
  FIXED_WT: "Fixed Weight",
  BODY_WT: "Body Weight",
  PC: "Percentage",
}

const cueTypeEnum = {
  START: 0,
  ACTION: 1,
  FINISH: 2
}

const FIXED_WT_TEMPLATE = (ex) =>
`${ex.sets}x${ex.reps} reps @ ${ex.fweight} lbs`;

const BODY_WT_TEMPLATE = (ex) =>
`${ex.sets}x${ex.reps} reps @ bodyweight`;

const PC_TEMPLATE_1 = (ex) =>
`${ex.sets}x${ex.reps} reps`;

const PC_TEMPLATE_2 = (ex) =>
`% per set: ${ex.perc}`;

const TIME_TEMPLATE = (ex) =>
`${ex.sets}x${ex.time} seconds`;

const DISTANCE_TEMPLATE = (ex) =>
`${ex.sets}x${ex.dist} meters`;

const OTHER_TEMPLATE = (ex) =>
`${ex.sets}x${ex.descrip}`;

const CHEVRON_DOWN = "chevron-down";
const CHEVRON_UP = "chevron-up";
const LT_BLUE = "#E5F8FF";

export default class ExerciseCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  openClose(){
    this.setState({open: !this.state.open})
  }
/*
  getIconName(){
    var ret = CHEVRON_DOWN;
    if(this.state.open) ret = CHEVRON_UP;
    return ret;
  }
*/
  getRepText(ex){
    switch(ex.unit){
      case unitEnum.WEIGHT:
        switch(ex.wtType){
          case weightTypeEnum.FIXED_WT:
            return FIXED_WT_TEMPLATE(ex);
            break;
          case weightTypeEnum.BODY_WT:
            return BODY_WT_TEMPLATE(ex);
            break;
          case weightTypeEnum.PC:
            return PC_TEMPLATE_1(ex);
            break;
        }
        break;
      case unitEnum.TIME:
        return TIME_TEMPLATE(ex);
        break;
      case unitEnum.DISTANCE:
        return DISTANCE_TEMPLATE(ex);
        break;
      case unitEnum.OTHER:
        return OTHER_TEMPLATE(ex);
        break;
    }
  }

  generateCue(type, content){
    var header = ""
    if(type == cueTypeEnum.START) header = "Start:"
    if(type == cueTypeEnum.ACTION) header = "Action:"
    if(type == cueTypeEnum.FINISH) header = "Finish:"
    return(
      <CardBody style={{backgroundColor: LT_BLUE}} key = {type}>
        <CardSubtitle style = {{fontWeight: 'bold'}}>{header}  </CardSubtitle>
        <CardText style={{paddingRight: 10}}>{content}</CardText>
      </CardBody>
    )
  }

  getCoachingCues(){
    var retArr = []
    var cues = this.props.getCues(this.props.exercise.exid);
    if(cues === undefined) {
      var loading = (
        <Card style={{backgroundColor: LT_BLUE}}>
          <CardText style={{fontWeight: 'bold'}}>Loading...</CardText>
        </Card>
      )
      retArr.push(loading)
      return retArr;
    }
    if("exStart" in cues) retArr.push(this.generateCue(cueTypeEnum.START,cues.exStart))
    if("exAct" in cues) retArr.push(this.generateCue(cueTypeEnum.ACTION,cues.exAct))
    if("exFin" in cues) retArr.push(this.generateCue(cueTypeEnum.FINISH,cues.exFin))

    return retArr;
  }

  render () {
    return(
      <Card style={{width: '450px'}}>
        <CardTitle>
          {this.props.exercise.exName}
        </CardTitle>

        <CardSubtitle>
          {this.getRepText(this.props.exercise)}
        </CardSubtitle>

        {(this.props.exercise.unit == unitEnum.WEIGHT && this.props.exercise.wtType == weightTypeEnum.PC) && (
          <CardBody>
            <CardText>
              {PC_TEMPLATE_2(this.props.exercise)}
            </CardText>
          </CardBody>
        )}
        <CardFooter /*footer bordered button onPress={this.openClose.bind(this)}*/ style={{borderBottomWidth: 0, borderTopWidth: 2, backgroundColor: LT_BLUE}}>
          <Button onClick={this.openClose.bind(this)} style={{borderBottomWidth: 0, borderTopWidth: 2, backgroundColor: 'BLACK'}}>
              Coaching Cues
          </Button>
        </CardFooter>
        {this.state.open && this.getCoachingCues()}
        <br/>
      </Card>
    )
  }
}
