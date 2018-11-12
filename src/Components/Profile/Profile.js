import React, {Component} from 'react';
import LogOut from './../AuthFlow/LogOut';
import {auth,db} from './../../firebase/firebase';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      prog: '',
      sport: '',
      level: '',
      school: '',
      email: '',
      name: '',
    };
  }

  /*componentDidMount() {

     const user = auth.currentUser;
     this.setState({ authUser: user });
     const userRef = db.collection('users').doc(user.uid);
     userRef.get().then((doc) => {
       this.setState({name: doc.data().name});
       this.setState({school: doc.data().school});
       this.setState({sport: doc.data().sport});
       this.setState({level: doc.data().level});

       db.collection('programs').where('sport', '==', this.state.sport)
       .get()
       .then((qSnap) => {
         qSnap.forEach((doc) => {
           if (doc.data().level === this.state.level) {
             this.setState({prog: doc.data().pid})
           }
         })
       });
     })

  }*/

  render() {
    const user = auth.currentUser;
    const {
      name,
      email,
      organization,
      seasonStart,
      sport,
      level,
      prog,
    } = this.props;

    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <div>
          <h2>PROFILE</h2> <br/>

          <div>
          Name: {this.props.name} <br/>
          Email: {user.email} <br/>
          Organization: {this.props.organization} <br/>
         </div>
        {this.props.seasonStart !== null &&
          <div>
            Season Start Date: {this.props.seasonStart} <br/>
          </div>
        }
        <div>
          Sport: {this.props.sport} <br/>
          Level: {this.props.level} <br/>
          Your program: {this.props.prog} <br/>
        </div>

        </div>
        <br/>
        <LogOut />
      </div>
    )
  }
}


/*Email: {user.email} <br/>
School: {this.state.school} <br/>
Sport: {this.state.sport} <br/>
Level: {this.state.level} <br/>
Your program: {this.state.prog} <br/>*/
