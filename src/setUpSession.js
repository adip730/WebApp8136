import React, { Component } from 'react';
import {db, auth} from './firebase/firebase';
import AuthUserContext from './AuthUserContext';


export const setUpSession = (Component) => {
  class SetUpSession extends Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,

        name: '',
        organization: '',
        prog: '',
        sport: '',
        level: '',

        today: '',
        seasonStart: '',
        weeksUntil: '',

        meso: '',
        week: '',
        thisWeek: {},
        days: [],

        loaded: false,
      };


    }

    componentWillMount() {
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({authUser})
          : this.setState({authUser:null})
      })
    }


    componentDidMount() {
      this.setState({loaded: !true})
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.checkRun(authUser, 50).then(() => this.runAsync(authUser))
          : this.setState({
            authUser: null,

          name: '',
          organization: '',
          prog: '',
          sport: '',
          level: '',

          today: '',
          seasonStart: '',
          weeksUntil: '',

          meso: '',
          week: '',
          thisWeek: {},
          days: [],

          loaded: false, });
      });
    }

    checkRun(authUser, interval) {
      var retryCount = 0;
      var retryCountLimit = 100;
      const userRef = db.collection('users').doc(authUser.uid);
      var promise = new Promise((resolve, reject) => {
        var timer = setInterval(function () {
          userRef.get().then((doc) => {
            if (doc.exists) {
              console.log('yes')
              clearInterval(timer);
              resolve();
              return;
            } else {
              console.log('waiting')
            }
          })
          retryCount++;
          if (retryCount >= retryCountLimit) {
              clearInterval(timer);
              reject("retry count exceeded");
          }
        }, interval);
      });

      return promise;
    }

    runAsync(authUser) {
      this.setState({authUser});
      var data = [];
      console.log(authUser);
      const userRef = db.collection('users').doc(authUser.uid);
      userRef.get().then((doc) => {
        if(doc.exists){
          console.log('got it')
          this.setState({
            seasonStart: doc.data().seasonStart,
            name: doc.data().name,
            organization: doc.data().organization,
            sport: doc.data().sport,
            level: doc.data().level,
            prog: doc.data().program,
          })
          data.start = doc.data().seasonStart;
          data.prog = doc.data().program;

        } else {
          console.log('not yet')
        }

      })
      .then(() => {
        data.today = this.calcToday()
      })
      .then(() => {
        data.weeksUntil = this.weeksUntil(data.today, data.start);
      })
      .then(() => {
        this.getWeek(data.prog, data.weeksUntil);
      })
      .then(() => {
        this.setState({loaded: true});
      })
    }

    calcToday = () => {
      const date = new Date();
      var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();
      if(dd < 10) { dd= '0' + dd };
      if(mm < 10) { mm = '0' + mm };
      const today = mm + '/' + dd + '/' + yyyy;
      this.setState({today});
      return today
    }
/*
    function getMonday( date ) {
      var day = date.getDay() || 7;
      if( day !== 1 )
          date.setHours(-24 * (day - 1));
      return date;
    }

    getMonday(new Date());
*/
    weeksUntil = (today, seasonStart) => {
      var weeksUntil;
      if(seasonStart != 'n/a') {
        var td = parseInt(today.substring(3,5), 10);
        var sd = parseInt(seasonStart.substring(3,5), 10);
        var tm = parseInt(today.substring(0,2), 10);
        var sm = parseInt(seasonStart.substring(0,2), 10);
        var ty = parseInt(today.substring(6,10), 10);
        var sy = parseInt(seasonStart.substring(6,10), 10);
        if (sy > ty) {
          sm = sm+12*(sy-ty);
        }
        var daysBetween = (sm-tm)*30 + (sd-td);
        console.log(daysBetween);
        weeksUntil = parseInt((daysBetween)/7);

      } else {
        weeksUntil = 'n/a';
      }
      this.setState({weeksUntil});
      return weeksUntil;
    }

    getWeek = (prog, weeksUntil) => {
      const progRef = db.collection('programs').doc(prog);
      progRef.get().then((doc) => {
        var i;
        var index = 0;
        if (weeksUntil != 'n/a') {
          for (i = 0; i < 52; i++) {
             var iterate = doc.data().weeks[i];
             if(iterate.meso==="Daily Undulating") {
               index = i - parseInt(weeksUntil);
               if (index < 0) {
                 index = index + 52;
                 break;
               }
               break;
             }
          }
        }

        console.log(index);
        const thisW = doc.data().weeks[index];
        console.log(thisW);
        console.log(thisW.days);
        this.setState({
          meso: thisW.meso,
          week: thisW.week,
          days: thisW.days,
        });
        return thisW.days;
      })

    }


    render() {
      //const { authUser, name } = this.state;

      return (
        <AuthUserContext.Provider
          value={this.state}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return SetUpSession;
}

export default setUpSession;




/*
function getMonday( date ) {
  var day = date.getDay() || 7;
  if( day !== 1 )
      date.setHours(-24 * (day - 1));
  return date;
}

getMonday(new Date());




export const weeksUntil = (today, seasonStart) => {
  var weeksUntil;
  if(seasonStart != '') {
    var td = parseInt(today.substring(3,5), 10);
    var sd = parseInt(seasonStart.substring(3,5), 10);
    var tm = parseInt(today.substring(0,2), 10);
    var sm = parseInt(seasonStart.substring(0,2), 10);
    var ty = parseInt(today.substring(6,10), 10);
    var sy = parseInt(seasonStart.substring(6,10), 10);
    if (sy > ty) {
      sm = sm+12*(sy-ty);
    }
    var daysBetween = (sm-tm)*30 + (sd-td);
    weeksUntil = parseInt((daysBetween)/7);
  } else {
    weeksUntil = 'n/a';
  }
  return weeksUntil;
}


export const getWeek = (prog, weeksUntil) => {
  const progRef = db.collection('programs').doc(prog);
    progRef.get().then((doc) => {
      var i;
      var index = 0;
      if (weeksUntil != 'n/a') {
        for (i = 0; i < 52; i++) {
           var iterate = doc.data().weeks[i];
           if(iterate.meso==="Daily Undulating") {
             index = i - parseInt(weeksUntil);
             if (index < 0) {
               index = index + 52;
               break;
             }
             break;
           }
        }
      }

      /*
      console.log(index);
      const thisW = doc.data().weeks[index];
      console.log(thisW);
      dispatch(setMeso(thisW.meso));
      dispatch(setWeek(thisW.week));
      dispatch(setThisWeek(thisW));
      dispatch(setDays(thisW.days));
      */
