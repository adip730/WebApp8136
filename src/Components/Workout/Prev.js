import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import {auth,db} from './../../firebase/firebase';


export default class Prev extends Component {

 constructor(props) {
   super(props);

   this.state = {
     /*
     exercises: [],
     day: '',
     level: '',
     week: '',
     meso: '',
     wID: this.props.wID,*/

   };

 }

componentDidMount() {
  /*
  console.log(this.state.wID);
  const workRef = db.collection('workouts').doc(this.state.wID);
  workRef.get().then((doc) => {
    this.setState({exercises: doc.data().exercises});
    this.setState({day: doc.data().day});
    this.setState({week: doc.data().week});
    this.setState({level: doc.data().level});
    this.setState({meso: doc.data().meso});

  });*/

}

  render () {

    const exList = this.props.exercises;


    return(
      <div>
        <strong>Exercises: </strong><br/>

        <u>Warm Up:</u>
        {exList.map(function(ex, i) {
          if(ex.type === 'Warm Up') {
            if(ex.unit === 'Weight') {
              if(ex.wtType === 'Fixed Weight') {
                return (
                  <Collapsible key={i} trigger={ex.exName}>
                    <p>{ex.sets}x{ex.reps} Reps @ {ex.fweight} pounds
                    {ex.rest!=='' &&
                      <p>
                        {ex.rest} seconds rest
                      </p>}</p>
                  </Collapsible>
                )
              }else if(ex.wtType === 'Body Weight') {
                return (
                  <Collapsible key={i} trigger={ex.exName}>
                    <p>{ex.sets}x{ex.reps} Reps @ Bodyweight
                    {ex.rest!=='' &&
                      <p>
                        {ex.rest} seconds rest
                      </p>}</p>
                  </Collapsible>
                )

              }else if(ex.wtType === 'Percentage') {
                return (
                  <Collapsible key={i} trigger={ex.exName}>
                    <p>{ex.sets}x{ex.reps} Reps<br/>
                    % per set: {ex.perc}
                    {ex.rest!=='' &&
                        <p>{ex.rest} seconds rest</p>
                      }</p>
                  </Collapsible>
                )
              }
            }else if(ex.unit === 'Time') {
              return (
                <Collapsible key={i} trigger={ex.exName}>
                  <p>{ex.sets}x{ex.time} Seconds
                  {ex.rest!=='' &&
                    <p>
                      {ex.rest} seconds rest
                    </p>}</p>
                </Collapsible>
              )
            }else if(ex.unit === 'Distance') {
              return (
                <Collapsible key={i} trigger={ex.exName}>
                  <p>{ex.sets}x{ex.dist} Meters
                  {ex.rest!=='' &&
                    <p>
                      {ex.rest} seconds rest
                    </p>}</p>
                </Collapsible>
              )
            } else if(ex.unit === 'Other') {
              return (
                <Collapsible key={i} trigger={ex.exName}>
                  <p>{ex.sets}x{ex.descrip}
                  {ex.rest!=='' &&
                    <p>
                      {ex.rest} seconds rest
                    </p>}</p>
                </Collapsible>
              )
            }
          }})}<br/>
        <u>Core Lifts</u>
        {exList.map(function(ex, i) {
          if(ex.type === 'Core Lift') {
            if(ex.unit === 'Weight') {
              if(ex.wtType === 'Fixed Weight') {
                return (
                  <Collapsible key={i} trigger={ex.exName}>
                    <p>{ex.sets}x{ex.reps} Reps @ {ex.fweight} pounds
                    {ex.rest!=='' &&
                      <p>
                        {ex.rest} seconds rest
                      </p>}</p>
                  </Collapsible>
                )
              }else if(ex.wtType === 'Body Weight') {
                return (
                  <Collapsible key={i} trigger={ex.exName}>
                    <p>{ex.sets}x{ex.reps} Reps @ Bodyweight
                    {ex.rest!=='' &&
                      <p>
                        {ex.rest} seconds rest
                      </p>}</p>
                  </Collapsible>
                )

              }else if(ex.wtType === 'Percentage') {
                return (
                  <Collapsible key={i} trigger={ex.exName}>
                    <p>{ex.sets}x{ex.reps} Reps<br/>
                    % per set: {ex.perc}
                    {ex.rest!=='' &&
                        <p>{ex.rest} seconds rest</p>
                      }</p>
                  </Collapsible>
                )
              }
            }else if(ex.unit === 'Time') {
              return (
                <Collapsible key={i} trigger={ex.exName}>
                  <p>{ex.sets}x{ex.time} Seconds
                  {ex.rest!=='' &&
                    <p>
                      {ex.rest} seconds rest
                    </p>}</p>
                </Collapsible>
              )
            }else if(ex.unit === 'Distance') {
              return (
                <Collapsible key={i} trigger={ex.exName}>
                  <p>{ex.sets}x{ex.dist} Meters
                  {ex.rest!=='' &&
                    <p>
                      {ex.rest} seconds rest
                    </p>}</p>
                </Collapsible>
              )
            } else if(ex.unit === 'Other') {
              return (
                <Collapsible key={i} trigger={ex.exName}>
                  <p>{ex.sets}x{ex.descrip}
                  {ex.rest!=='' &&
                    <p>
                      {ex.rest} seconds rest
                    </p>}</p>
                </Collapsible>
              )
            }
          }})}<br/>
      </div>


    )
  }
}
