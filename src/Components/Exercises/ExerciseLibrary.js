import React, { Component } from 'react';
import './../compcss/exLib.css';
import Collapsible from 'react-collapsible';
import firebase from './../../firebase/firebase';
import { Button } from 'reactstrap';



class ExerciseLibrary extends Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
      searchVal: "",
      showAddModal: false,
      showEditModal: false,
      currentExercise: {},
    }

  }


  componentWillMount() {
    var db=firebase.firestore();
    const exRef = db.collection('exercises');
    let listing = this.state.exercises;
    exRef.get().then(snap => {
      snap.forEach(function(doc) {

        listing.push(doc.data())
      })
      this.setState({exercises:listing});
    });

  }

  handleSearchVal = (event) => {
    this.setState({ searchVal: event.target.value });
  }

  isSearchValue = (value) => {
    const searchVal = this.state.searchVal.toLowerCase();
    const exerciseValArray = value.toLowerCase().split(' ');
    return  exerciseValArray.some(val => val.startsWith(searchVal));
  }


  exerciseButton = (name) => {
    return (
      <div style={{height:"2.5rem"}}>
        <div className="alignleft" style={{
          border: "1px solid",
          borderRadius: "4px",
          padding: "5px",
          margin: "2px",
          textAlign: "center",
          cursor: "pointer",
        }}>
          {name}
        </div>



      </div>
      )
  }



  exercisesToCollapsible = (exercises) => {
    return exercises.map((exercise, i) => {
      return (
        <div key={`exercise-${i}`}>
          <Collapsible value={exercise.exName} trigger={this.exerciseButton(exercise.exName)} transitionTime={225} >
            <div style={{
                textAlign: 'left',
                fontWeight: 'normal',
            }}>
              <table className='table-ex' style={{
                marginTop: "5px",
                marginLeft: "5%",
                display: "table",
              }}>
                <tbody>
                  <tr className='tr-ex'>
                    <th className='th-ex alignTextRight'>Setup and Start</th>
                    <th className='th-ex'>{exercise.exStart}<br/></th>
                  </tr>
                  <tr className='tr-ex'>
                    <th className='th-ex alignTextRight'>Action</th>
                    <th className='th-ex'>{exercise.exAct}<br/></th>
                  </tr>
                  <tr className='tr-ex'>
                    <th className='th-ex alignTextRight'>Type</th>
                    <th className='th-ex'>{exercise.exType}<br/></th>
                  </tr>
                </tbody>
              </table>
            </div>
          </Collapsible>
          <hr style={{ margin: "5px"}} />
        </div>
    )})
  }

  render() {
    const exercises = Array.from(this.state.exercises).filter((val) => this.isSearchValue(val.exName));
    var leftSide = exercises.splice(0, Math.ceil(exercises.length / 2));

    const leftColumn = this.exercisesToCollapsible(leftSide);
    // Right side is what is remaining in array
    const rightColumn = this.exercisesToCollapsible(exercises);



    return (
      <div>
        <div className="ExDB">
          <h1>Exercise Library</h1>
          <p>Click on an exercise to learn more about it</p>
        </div>
        <div style={{
              width: "60%",
              marginLeft: "18%",
            }}
            className="block"
        >
          <label style={{width: "10%"}}>Search:</label>
          <input className="searchInput" value={this.state.searchVal}
            onChange={this.handleSearchVal} type="text"
            style={{marginLeft: '10px', width: "200px"}}
          />
        </div>
        <div className='exDisp'>

        <div className="row">
          <div className="column">{leftColumn}</div>
          <div className="column">{rightColumn}</div>
        </div>

        </div>


      </div>
    );
  }
}

export default ExerciseLibrary;
