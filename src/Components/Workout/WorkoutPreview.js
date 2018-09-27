import React, { Component } from 'react';
import Prev from './Prev';
//import {Button} from './reactstrap';
import {auth,db} from './../../firebase/firebase';

class WorkoutPreview extends Component {
  constructor() {
      super();

      this.state = {
        authUser: null,
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
        dayIndex: '4',
        exercises: [],

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
               index = index + 22;
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
        const thisW = doc.data().weeks[ind-1];
        this.setState({meso: thisW.meso});
        this.setState({week: thisW.week});
        this.setState({thisWeek: thisW});
        this.setState({days: thisW.days});

        this.setState({thisDay: this.state.days[this.state.dayIndex]});
        const workRef = db.collection('workouts').doc(this.state.thisDay.wID);
        workRef.get().then((doc) => {
          this.setState({exercises: doc.data().exercises});
          this.setState({day: doc.data().day});
        })

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

        const user = auth.currentUser;
        this.setState({ authUser: user });
        const userRef = db.collection('users').doc(user.uid);
        userRef.get().then((doc) => {
          this.setState({sport: doc.data().sport});
          this.setState({level: doc.data().level});
          this.setState({seasD: doc.data().seasonD});
          this.setState({seasM: doc.data().seasonM});
          this.setState({seasY: doc.data().seasonY});
          db.collection('programs').where('sport', '==', this.state.sport)
          .get()
          .then((qSnap) => {
            qSnap.forEach((doc) => {
              if (doc.data().level === this.state.level) {
                this.setState({prog: doc.data().pid})
                this.makeDate();
                this.getWeek();

              }
            })
          });
        })

     }


  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {

    return (
      <div>
        <div>
          <h1>Today's Workout</h1>
        </div>

        <div>
          Today's Workout: {this.state.thisDay.wID} <br/> Today's Date: {this.state.today} <br/>
        </div>
        <div>
          Mesocycle : {this.state.meso} <br/>
          Week : {this.state.week} <br/>
          Day : {parseInt(this.state.dayIndex) + 1}
        </div>


        <div>

          <Prev exercises={this.state.exercises} />
        </div>



      </div>


    )
  }
}

export default WorkoutPreview;
