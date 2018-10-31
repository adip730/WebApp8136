import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Title } from 'native-base';
import {auth,db} from './../../../firebase';




export default class User extends Component {
   constructor(props) {
     super(props);

     this.state = {
       authUser: null,
       organization: '',
       email: '',
       name: '',
       prog: '',
       sport: '',
       level: '',
       week: '',
       meso: '',
       weekIndex: '',
       thisWeek: {},
       days: [],
       today: '',
       seasD: '',
       seasM: '',
       seasY: '',
       weeksUntil: '',
       thisDay: '',
       dayIndex: '0',
     };
   }

   getWeek() {
     const progRef = db.collection('programs').doc(this.state.prog);
     progRef.get().then((doc) => {
       var i;
       for (i = 0; i < 52; i++) {
          var iterate = doc.data().weeks[i];
          if(iterate.meso==="Daily Undulating") {
            var index = i - parseInt(this.state.weeksUntil);
            if (index < 0) {
              index = index + 52;
              this.setState({weekIndex: parseInt(index, 10)});
              break;
            }
            else {
              this.setState({weekIndex: parseInt(index, 10)});
              break;
            }
            break;
          }
       }

       const ind = this.state.weekIndex;
       const thisW = doc.data().weeks[ind];
       this.setState({meso: thisW.meso});
       this.setState({week: thisW.week});
       this.setState({thisWeek: thisW});
       this.setState({days: thisW.days});


     })

   }

   makeDate() {
     const date = new Date();
     var dd = date.getDate();
     var mm = date.getMonth()+1;
     var yyyy = date.getFullYear();
     if(dd < 10) { dd= '0' + dd };
      if(mm < 10) { mm = '0' + mm };
      const today = mm + '/' + dd + '/' + yyyy;

      this.weeksTilSeason(dd,mm,yyyy);
      this.setState({today:today});
     }

     weeksTilSeason(day,month,year) {
        var td = parseInt(day, 10);
        var sd = parseInt(this.state.seasD, 10);
        var tm = parseInt(month, 10);
        var sm = parseInt(this.state.seasM, 10);
        var ty = parseInt(year, 10);
        var sy = parseInt(this.state.seasY, 10);
        if (sy > ty) {
          sm = sm+12*(sy-ty);

        }
        var daysBetween = (sm-tm)*30 + (sd-td);
        var weeksUntil = parseInt((daysBetween)/7);
        console.log(weeksUntil);


        this.setState({weeksUntil: weeksUntil});

      }

      componentDidMount() {

       //const user = auth.currentUser;
       //this.setState({ authUser: user });
       const userRef = db.collection('users').doc(this.props.screenProps.userID);
       userRef.get().then((doc) => {
         this.setState({sport: doc.data().sport});
         this.setState({level: doc.data().level});
         this.setState({seasD: doc.data().seasonD});
         this.setState({seasM: doc.data().seasonM});
         this.setState({seasY: doc.data().seasonY});
         this.setState({prog: doc.data().program});
         this.makeDate();
         this.getWeek();
       })

    }
