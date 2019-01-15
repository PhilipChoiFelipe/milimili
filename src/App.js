import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import './App.css';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavItem, Nav } from 'reactstrap'
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { TagCloud } from "react-tagcloud";
import _ from 'lodash';
import firebase from 'firebase/app';
import 'firebase/database';
import SignUpForm from './SignUpForm';
import ChosenDiary from './ChosenDiary'
import SavedDiaries from './SavedDiaries'
import WriteDiary from './WriteDiary'
import OthersDiaries from './OthersDiaries'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '@firebase/messaging'

// import { forEach } from '@firebase/util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaries: [],
      sharedDiaries: [],
      clickedDiary: '',
      clickedLogIn: false,
      notification: []
    }
  }

  notifyUser = (comment, diary) => {
    let ref = firebase.database().ref(`diaries/${diary.userID}`)
    let newData = {
      commenterID: comment.userID, writerID: diary.userID, commentText: comment.text, diaryKey: diary.key, title:diary.value
    }
    ref.child('notification').child(diary.key).push(newData)
    ref.child('notification').on("value", (snapshot) => {
      console.log("commented!:")
      console.log(snapshot.val())
    })

  }

  textUpdate = (diary, date, title) => {
    console.log(this.state.user)
    let currentUser = this.state.user;
    let newData = {
      userID: currentUser.uid,
      time: firebase.database.ServerValue.TIMESTAMP, diary: diary,
      title: title, date: date, displayName: currentUser.displayName,
      shared: false
    }
    // copiedDiaries.push(newData);
    let diariesRef = firebase.database().ref(`diaries/${currentUser.uid}`)
    console.log(newData);
    diariesRef.push(newData);
  }

  shareDiary = (diary) => {
    console.log(diary)
    let ref = firebase.database().ref(`diaries/${this.state.user.uid}`)
    let shared = false

    firebase.database().ref('shared/diaries').on("value", (snapshot) => {
      // if shared diary exists already
      for (let key in snapshot.val()) {
        if (diary.key === key) {
          shared = true;
          console.log('HEY!!!')
        }
      }
    })
    // console.log('HEY!!!')
    // console.log(diary)
    //title: diary.value
    if (shared === false) {
      firebase.database().ref(`shared/diaries/`).child(diary.key).set(diary)
      ref.child(diary.key).child(`shared`).set(true);
      // shared = true;
      // ref.child(diary.key).child(shared).set(true);
    } else {
      alert("이미 공유하신 게시물입니다!")
    }
  }

  removeMySharedDiary = (id) => {
    console.log("sharedremove:")
    console.log(id)
    let ref = firebase.database().ref(`shared/diaries`).child(id)
    ref.remove()
    // window.location.reload()
    // this.setState({sharedDiaries})
  }

  removeDiary = (id) => {
    let diariesRef = firebase.database().ref(`diaries/${this.state.user.uid}`)
    diariesRef.child(id).remove();
  }

  clickUpdate = (diary) => {
    console.log(diary)
    // console.log(diary.value)
    this.setState({ clickedDiary: diary })
    // console.log(this.state.clickedDiary.value)
  }
  clickLogIn = () => {
    this.setState({ clickedLogIn: true })
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.setState({
          user: firebaseUser,
        })
        //setting state for my private diaries
        // let messaging = firebase.messaging();
        // messaging.usePublicVapidKey("AAAAydXUZE0:APA91bFX8qMLjnDWsSaNVE7JvoSl5FFmPWVSseYFilJoFCbRPN_PYRF4tYd1nmTBVO9kLkgUOOz3dQ1CHTo0EFGgnVLIPaKETfHcSbmenv8k_GWttpjoTVoF684HnSrmeiP3dqsQT_JD");
        // messaging.requestPermission()
        //   .then(function () {
        //     console.log("havePermission")
        //   })


        firebase.database().ref(`diaries/${this.state.user.uid}`).on("value", (snapshot) => {
          // console.log("posted");
          // console.log(snapshot.val())
          let diariesObject = [];
          if (snapshot.exists()) {
            let diariesKeys = Object.keys(snapshot.val())
            // console.log(chirpsKeys);
            console.log(snapshot.val())
            
            diariesObject = diariesKeys.map((key) => {
              let diariesObj={}
              if(key!== 'notification'){
              diariesObj = snapshot.val()[key];
              // console.log(key)
              diariesObj.id = key;
              }
              return diariesObj;
            })
          }

          console.log("Component Did Mount:")
          console.log(diariesObject)
          this.setState({ diaries: diariesObject })

        })
        //setting state for my shared diaries


        firebase.database().ref(`shared/diaries`).on("value", (snapshot) => {
          let sharedObject = [];
          if (snapshot.exists()) {
            let sharedKeys = Object.keys(snapshot.val())
            // console.log(chirpsKeys);
            sharedObject = sharedKeys.map((key) => {
              let sharedObj = snapshot.val()[key];
              sharedObj.id = key;
              return sharedObj;
            })
            this.setState({ sharedDiaries: sharedObject })
          }
        })

        let notifyObject = [];
        firebase.database().ref(`diaries/${this.state.user.uid}`).child('notification').on("value",(snapshot)=>{
          if(snapshot.exists()){
          let notifyKeys = Object.keys(snapshot.val())
          console.log(notifyKeys)
          notifyObject = notifyKeys.map((key) => {
            let notifyObj = snapshot.val()[key];
            notifyObj.id = key;
            return notifyObj;
          })
        }
          this.setState({notification: notifyObject})
        })
        console.log(notifyObject)

      } else {
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  // handleAnonymous(anonymous) {
  //   console.log("anonymous:")
  //   console.log(anonymous)
  //   this.setState({errorMessage:null})
  //   if(anonymous){
  //     firebase.auth().signInAnonymously().catch(function(error) {
  //       this.setState({errorMessage: error.message})
  //     });
  //   }
  // }

  handleSignUp(email, password, handle) {

    let user = null;
    this.setState({ errorMessage: null });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function () {
        user = firebase.auth().currentUser;
        user.sendEmailVerification();
      })
      .then(function () {
        user.updateProfile({
          displayName: handle,
        });
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      })


    /* TODO: sign up user here */
  }

  handleSignIn(email, password) {
    // window.location.reload();
    this.setState({ errorMessage: null });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message })
      );
  }

  //A callback function for logging out the current user
  handleSignOut() {
    this.setState({ errorMessage: null }); //clear any old errors
    window.location = '/';
    firebase.auth().signOut()
      .catch(error => {
        this.setState({ errorMessage: error.message })
      })
    /* TODO: sign out user here */
  }


  render() {
    let content = null; //content to render
    if (!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container ">
          {/* 6F6B29 */}
          <div id="websiteTitle" style={{ textAlign: 'center' }}>
            <span>M</span>
            <span>I</span>
            <span>L</span>
            <span>I</span>
            <span>M</span>
            <span>I</span>
            <span>L</span>
            <span>I</span>
          </div>
          <br />
          <SignUpForm
            signUpCallback={(email, password, handle) => this.handleSignUp(email, password, handle)}
            signInCallback={(email, password) => this.handleSignIn(email, password)}
          // handleAnonymous = {(anonymous) => this.handleAnonymous(anonymous)}
          />
        </div>
      );
    } else {
      console.log("state Diaries:")
      console.log(this.state.diaries)
      content = (
        <div>
          <header className="App-header">
            <div className="menuBar mt-2 ml-2">
              <Notification notification={this.state.notification}  currentUser={this.state.user}/>
              {this.state.user && <button id="logOutButton" className="btn-lg btn" onClick={() => this.handleSignOut()}>
                <i class="fas fa-sign-out-alt"></i>
              </button>}
            </div>
            <h1 className="text-center" id="title"><Link to="/" id="titleLink">
              MiliMili
            </Link>
            </h1>
            <div className="text-center">
              {/* <button className="btn ml" onClick={this.clickLogIn}>
                  로그인
            </button> */}
              {/* {this.state.user && <button className="btn" onClick={() => this.handleSignOut()}>
                로그아웃
            </button>} */}
            </div>
          </header>

          <main className="navBar mt-3">
            <HashRouter>
              <div>
                <Navbar>
                  <div className="mx-auto">
                    <Nav>
                      <NavItem><Link to={'/'}>일기쓰기</Link>
                      </NavItem>
                      <NavItem className="ml-5"><Link to={'/SavedDiaries'}>나의 일기 </Link>
                      </NavItem>
                      <NavItem className="ml-5"><Link to={'/others'}>공유된 일기</Link></NavItem>
                    </Nav>
                  </div>
                </Navbar>
                <Switch>
                  <Route exact path='/' render={() => <WriteDiary textUpdate={this.textUpdate}/>} />
                  {/* <IndexRoute render={() => <SavedDiaries diaries={this.state.diaries} clickUpdate={this.clickUpdate} />}/> */}
                  <Route path='/SavedDiaries' render={() => <SavedDiaries diaries={this.state.diaries} clickUpdate={this.clickUpdate} />} />
                  <Route path='/others' render={() => <OthersDiaries clickUpdate={this.clickUpdate} sharedDiaries={this.state.sharedDiaries} />} />
                  <Route path='/ChosenDiary/:keySeconds' render={() => <ChosenDiary diary={this.state.clickedDiary} currentUser={this.state.user}
                    removeDiary={this.removeDiary} shareDiary={this.shareDiary} removeMySharedDiary={this.removeMySharedDiary}
                    notifyUser={this.notifyUser} />} />
                  {/* <Redirect to='/' /> */}
                </Switch>
              </div>
            </HashRouter>
          </main>
        </div>

      );

    }
    return (
      <div className="App">
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}

      </div>

    );
  }
}


class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      redirect: false,
      parameter: ''
    }
  }
  handleNotification = () => {
    console.log("Clicked")
    for(let i = 0; i<this.props.notification.length; i++){
      this.createNotification(this.props.notification[i])
    }
  }
  clickedNotification(parameter){
    this.setState({redirect: true, parameter: parameter.diaryKey})
    // console.log(parameter.diaryKey)
  }
  createNotification(notification) {
    console.log("clicked")
    console.log(notification)
    if( _.size(notification) > 1){ 
      // eslint-disable-next-line default-case
      NotificationManager.info(`"${notification[Object.keys(notification)[0]].title}"`,`${_.size(notification) }개의 댓글이 달렸습니다!`, 3000,
      ()=>{ return this.clickedNotification(notification[Object.keys(notification)[0]])});
    }else{
      NotificationManager.info(`댓글이 달렸습니다!`);
    }
  };

  render() {
    if(this.state.redirect){
      return <Redirect push to={{
        pathname: '/ChosenDiary/' + this.state.parameter
      }} />    }
      console.log("Notification Object:")
      console.log(this.props.notification)
    return (
      <div className="containerNotification">
        <div className="ml-2 mt-2" >
          <button id="notifyButton" style={{ borderRadius: 200 }} className='btn-lg btn'
            onClick={this.handleNotification}><i className="fas fa-comment"> <span id="num">{this.props.notification.length}</span> </i>
          </button>
          {/* <hr/> */}
          {/* <button className='btn btn-success'
          onClick={this.createNotification('success')}>Success
        </button>
        <hr/>
        <button className='btn btn-warning'
          onClick={this.createNotification('warning')}>Warning
        </button>
        <hr/>
        <button className='btn btn-danger'
          onClick={this.createNotification('error')}>Error
        </button> */}

          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default App;
