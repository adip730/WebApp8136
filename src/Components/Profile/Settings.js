import React, { Component } from 'react';
import {auth,db} from './../../firebase/firebase';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      email: '',
      name: '',
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
    );
  }

  render() {
  	const user = auth.currentUser;
    const {
      name
    } = this.props;

    return (
      <div style={{display:'flex', flexDirection: 'column',
        alignItems:'center', justifyContent:'center'}}>
        <div>
          <h2>SETTINGS</h2> <br/>

          <div>
            <form onSubmit={this.handleSubmit}>
              Name: <input type="text" name="name" placeholder={name} value={this.state.name} onChange={this.handleChange} /> <br/>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
