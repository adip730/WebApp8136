import React, { Component } from 'react';
import {auth,db} from './../../firebase/firebase';

export default class History extends Component {

  constructor() {
    super();

    this.state = {
      authUser: null,
      entries: '',
      workouts: '',

    }
  }

  getLogs() {
    const user = auth.currentUser;
    db.collection('logs').where('userID', '==', user.uid)
    .get().then((snap) => {
      var ents = [];
      var wkouts = [];
      snap.forEach((doc) => {
        if (doc.data().type === 'entry') {
          ents.push(doc.data());
        }
        else if (doc.data().type === 'workout') {
          wkouts.push(doc.data());
        }
      })
      this.setState({entries:ents});
      this.setState({workouts:wkouts});
    })
  }

  componentDidMount() {
    this.getLogs();
  }


  render() {

    const entries = this.state.entries;
    var entList = '';
    if (entries === undefined || entries.length == 0) {
      var entList = () => { return (
        <div>
          No entries made yet
        </div>
      )
    }
    } else {
      entList = entries.map((e,i) => {
        return (
          <div>
                <strong>{e.date}</strong> <br/>
                Squat: {e.squat} <br/>
                Clean: {e.clean} <br/>
                Vertical Jump: {e.vert} <br/>
                Bench: {e.bench} <br/><br/>
          </div>
        )
      })
    }


    return (
      <div>
        <p>
          <h2>Training History:</h2>
          Log Entries:
        </p>
        {entList}


      </div>



    )
  }
}
