import React, { Component } from 'react';
import {auth,db} from './../../firebase/firebase';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      email: '',
      name: '',
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const userRef = db.collection("users").doc(auth.currentUser.uid).update(
      "name", this.state.name,
    ).then(() => {
      this.props.history.push('/profile');
    });

  }

  render() {
  	const user = auth.currentUser;
    const {
      name
    } = this.props;


    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center', textAlign: 'center'}}>
        <div>
          <h2>Edit Profile Settings</h2> <br/>

          <div style={{float: 'center',
          justifyContent: 'center',
          textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
              Name: <input type="text" name="name" placeholder={name} value={this.state.name} onChange={this.handleChange} /> <br/>
              <br/>
              <input type="submit" value="Submit" />
            </form>
            <br/>
            <br/>

            <div>
              This is currently the only information you have authorization to change!
            </div>
          </div>
        </div>
      </div>
    )


  }
}

export default withRouter(Settings);
