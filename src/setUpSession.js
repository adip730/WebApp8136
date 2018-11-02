export const setUpSession = () => {

}

export const calcToday = () => {
  const date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd < 10) { dd= '0' + dd };
  if(mm < 10) { mm = '0' + mm };
  const today = mm + '/' + dd + '/' + yyyy;

  return today;
}


function getMonday( date ) {
  var day = date.getDay() || 7;
  if( day !== 1 )
      date.setHours(-24 * (day - 1));
  return date;
}

getMonday(new Date());


export const watchUserInfo = (userID) => {
  const userRef = db.collection('users').doc(userID);
  userRef.get().then((doc) => {
    this.setState({
      seasonStart: doc.data().seasonStart,
      name: doc.data().name,
      organization: doc.data().organization,
      sport: doc.data().sport,
      level: doc.data().level,
      prog: doc.data().program,
    })
  })
}


export const weeksUntil = (today, seasonStart) => {

}


export const getWeek = (prog, weeksUntil) => {

}
