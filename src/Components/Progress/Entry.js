import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {auth,db} from './../../firebase/firebase';


export default class Entry extends Component {
  state = { date: '', squat: '', bench: '', vert: '', clean: '', type: 'entry' }

  static navigationOptions: {
    header: 'none'
  }

  makeEntry = () => {
    const {
      date,
      squat,
      bench,
      vert,
      clean,
      type,
    } = this.state;

    const user = auth.currentUser;

    const newEntry = {
      userID: user.uid,
      date: date,
      squat: squat,
      bench: bench,
      vert: vert,
      clean: clean,
      type: type,
    }

    const entryID = `${user.uid}${date}`

    db.collection('logs').doc(entryID).set(newEntry);


  }

  setDate = (e) => {
    this.setState({date: e.target.value});
  }

  setSquat = (e) => {
    this.setState({squat: e.target.value});
  }

  setBench = (e) => {
    this.setState({bench: e.target.value});
  }

  setClean = (e) => {
    this.setState({clean: e.target.value});
  }

  setVert = (e) => {
    this.setState({vert: e.target.value});
  }


  render() {

    const {
      date,
      squat,
      bench,
      vert,
      clean,
      type,
    } = this.state;

    const isInvalid =
        date === '' ||
        (squat === '' &&
        bench === '' &&
        vert === '' &&
        clean === '');

      return (
        <div>
          <p>Make a log entry</p>

          <input type='text'
            placeholder="Today's Date (MMDDYYYY)"
            autoCapitalize="none"
            //style={styles.textInput}
            ref = 'date'
            onChange={this.setDate}
            value={this.state.date}
          /><br/>
          <input type='text'
            placeholder="Squat"
            autoCapitalize="none"
            //style={styles.textInput}
            ref = 'squat'
            onChange={this.setSquat}
            value={this.state.squat}
          /><br/>
          <input type='text'
            placeholder="Bench Press"
            autoCapitalize="none"
            //style={styles.textInput}
            ref = 'bench'
            onChange={this.setBench}
            value={this.state.bench}
          /><br/>
          <input type='text'
            placeholder="Vertical Jump"
            autoCapitalize="none"
            //style={styles.textInput}
            ref = 'vert'
            onChange={this.setVert}
            value={this.state.vert}
          /><br/>
          <input type='text'
            placeholder="Power Clean"
            autoCapitalize="none"
            //style={styles.textInput}
            ref = 'clean'
            onChange={this.setClean}
            value={this.state.clean}
          /><br/>

          <Button color='primary' disabled={isInvalid} title="Make Entry" onPress={this.makeEntry} >
            Submit
          </Button>
        </div>
      )
    }
}
