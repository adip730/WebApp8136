import React, {Component} from 'react';
import {auth,db} from './../../firebase/firebase';
import ExerciseCard from './ExerciseCard'

var typeEnum = {
  WARM_UP: "Warm Up",
  CORE_LIFT: "Core Lift"
}


export default class Preview extends Component {

 constructor(props) {
   super(props);

   this.state = {
     authUser: null,
     exercises: [],
     exerciseMap: {},
     day: '',
     level: '',
     week: '',
     meso: '',
     wkID: this.props.wID,
     loadedCues: false
   };

 }

componentDidMount() {
  //const user = auth.currentUser;
  //this.setState({ authUser: user });

  const cueRefs = db.collection('exercises');
  cueRefs.get().then((snapshot) => {
    var exerciseMap = {};
    snapshot.docs.map((doc) =>{
      var data = doc.data();
      exerciseMap[data.exid] = data;
    })
    this.setState({exerciseMap: exerciseMap, loadedCues: true})
  });

  const workRef = db.collection('workouts').doc(this.state.wkID);
  workRef.get().then((doc) => {
    this.setState({exercises: doc.data().exercises});
    this.setState({day: doc.data().day});
    this.setState({week: doc.data().week});
    this.setState({level: doc.data().level});
    this.setState({meso: doc.data().meso});
  });
}


  getCues(exid){
    console.log(this.state.exerciseMap[exid])
    return this.state.exerciseMap[exid];
  }

  generateExerciseCard(ex, warmUp, key) {
    var compare = typeEnum.CORE_LIFT;
    if(warmUp) compare = typeEnum.WARM_UP;
    if(ex.type != compare) return;
    var defaultCues = {exStart: "Loading..."}
    var cues = defaultCues;
    return (
      <ExerciseCard exercise = {ex} key= {key} loadedCues = {this.state.loadedCues} getCues = {this.getCues.bind(this)}/>
    )
  }


  render () {

    const exList = this.state.exercises;

    var key = 0;

    return(
      <div>
        <div>
            Workout ID: {this.state.wkID} <br/>
            Mesocycle: {this.state.meso} <br/>
            Week: {this.state.week} <br/>
            Day: {this.state.day}
        </div>
        <br/>

          <p>
            <strong>Warm up:</strong>
          </p>
          {exList.map((ex) => {
            key++;
            return(
              this.generateExerciseCard(ex,true,key)
            )
          })}

          <p>
            <strong>Core Lifts:</strong>
          </p>
          {exList.map((ex) => {
            key++;
            return(
              this.generateExerciseCard(ex,false,key)
            )
          })}


        </div>

    )
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 400,
  }
})

<Button
  title="START WORKOUT"
  onPress={() => this.props.navigation.navigate('WorkLive', {
    exercises: this.state.exercises,
  })}
/>*/
