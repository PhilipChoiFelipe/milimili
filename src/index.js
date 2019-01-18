import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

// import firebase database
import 'firebase/database';
  // Initialize Firebase
  var config = {
    apiKey: process.env.REACT_APP_WEATHER_API_KEY,
    authDomain: "milistory.firebaseapp.com",
    databaseURL: "https://milistory.firebaseio.com",
    projectId: "milistory",
    storageBucket: "milistory.appspot.com",
    messagingSenderId: "866875892813"
  };

  // let messaging = firebase.messaging();
  // messaging.usePublicVapidKey("BBT1ZkmKPmdoAqXV7RGZymqqZthqGQUsYXlIdzmOQ0nGGBlb6D2DqBG_V8ygsS8Nbjc-GR_BMvrR4RVcJXNF9tw")
  // messaging.requestPermission()
  //   .then(function () {
  //     console.log("have permission")
  //   })
  //   .catch(function (err) {
  //     console.log("nope")
  //   })
  firebase.initializeApp(config);

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
