import firebase from 'firebase';
import moment from 'moment';
import shortid from 'shortid';

class Storage {
	constructor() {
 
  var config = {
    apiKey: "AIzaSyBkqmRHwL9C5zRwEMylmb-QXa7HP4K-A8I",
    authDomain: "workout-log-37c32.firebaseapp.com",
    databaseURL: "https://workout-log-37c32-default-rtdb.firebaseio.com",
    projectId: "workout-log-37c32",
    storageBucket: "workout-log-37c32.appspot.com",
    messagingSenderId: "573900446310",
    appId: "1:573900446310:web:288988cef0429ea055eba7"
  };

    this.app = firebase.initializeApp(config);
    this.db = firebase.database();
  }

  getWorkouts(id) {
    const user = firebase.auth().currentUser;
    const uid = user && user.uid;

    if (!uid) {
      return null;
    }

    if (typeof id === "undefined") {
      return this.db.ref('workouts/').orderByChild('uid').equalTo(user.uid);
    }

    return this.db.ref('workouts/' + id);
  }

  addWorkout({ date = false, exercises = [] }) {
    const id = shortid.generate();
    const user = firebase.auth().currentUser;
    const uid = user && user.uid;

    if (!uid) {
      return;
    }

    // convert to unix timestamp
    date = moment(date).unix() || moment().unix();

    this.db.ref('workouts/').push().set({ 
      id,
      uid,
      date,
      exercises
    });
  }

  updateWorkout(refId, data) {
    if (typeof refId === 'undefined') {
      return;
    }

    var date = moment(data.date).unix();

    this.db.ref('workouts/' + refId).update({
      ...data,
      date
    });
  }

  deleteWorkout(refId) {
    this.db.ref('workouts/' + refId).remove();
  }
}

export default Storage;