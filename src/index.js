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
    apiKey: "AIzaSyAqNUmu2ow3XO491XWCBqNAopN5_ZoKwyQ",
    authDomain: "milistory.firebaseapp.com",
    databaseURL: "https://milistory.firebaseio.com",
    projectId: "milistory",
    storageBucket: "milistory.appspot.com",
    messagingSenderId: "866875892813"
  };
  firebase.initializeApp(config);


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
