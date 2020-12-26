import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCuz7gZs8aAaukv1MKAng3JHDUpKvPQqQk",
  authDomain: "jobcircular-a4e2d.firebaseapp.com",
  databaseURL:"https://jobcircular-a4e2d.firebaseio.com",
  projectId: "jobcircular-a4e2d",
  storageBucket: "jobcircular-a4e2d.appspot.com",
  messagingSenderId:"180705402227",
  appId:"1:180705402227:web:c9351cfdb4fde473f8f906"

});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new  firebase.auth.TwitterAuthProvider();
export const githubProvider = new  firebase.auth.GithubAuthProvider();
export const db =  firebase.firestore();
// export const fbdb =  firebase.database();


export default app;



