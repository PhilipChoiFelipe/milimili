import React, { Component } from 'react';
import './App.css';
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaries: [],
      clickedDiary: '',
      clickedLogIn: false
    }
  }
  textUpdate = (diary, date, title) => {
    let copiedDiaries = this.state.diaries;
    copiedDiaries.push({ diary, date, title });
    this.setState({ diaries: copiedDiaries });
  }

  removeDiary = (keySecond) => {
    let copiedDiaries = this.state.diaries;
    _.remove(copiedDiaries, (diary) => {
      return diary.date === keySecond
    })
    console.log(copiedDiaries)
    this.setState({ diaries: copiedDiaries })
  }

  clickUpdate = (diary) => {
    console.log(diary.value)
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
          loading: false
        })
      } else {
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  handleSignUp(email, password, handle, avatar) {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({
          displayName: handle,
          photoURL: avatar
        }).then((profile) => {
          return profile;
        }).catch((error) => {
          this.setState({ errorMessage: error.message })
          // console.log(this.state.errorMessage)
          // Alert your error to your user 
        })
      }).catch((error) => {
        // Alert your error to your user
        this.setState({ errorMessage: error.message })
      });

    /* TODO: sign up user here */
  }
  
  handleSignIn(email, password) {
    this.setState({ errorMessage: null });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message })
      );
  }

  //A callback function for logging out the current user
  handleSignOut() {
    this.setState({ errorMessage: null }); //clear any old errors
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
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-sm-12 col-md-6 offset-md-3 shadow-lg mt-5" id="signupBox">
              <h1 style={{ textAlign: 'center' }}>Sign Up</h1>

              {/* <img src="img/fruit.png" alt="brand logo" className="brandLogoBig mx-auto d-block" style={{ width: 50, height: 50 }} /> */}
              <br />
              <SignUpForm
                signUpCallback={(email, password) => this.handleSignUp(email, password)}
                signInCallback={(email, password) => this.handleSignIn(email, password)}
              />
            </div>
          </div>
        </div>
      );
    } else {
        content = (
          <div>
            <header className="App-header">
              <h1 className="text-center" id="title"><Link to="/" id="titleLink">
                MiliMili
            </Link>
              </h1>
              <div className="text-center">
                {/* <button className="btn ml" onClick={this.clickLogIn}>
                  로그인
            </button> */}
                {this.state.user && <button className="btn" onClick={()=>this.handleSignOut()}>
                  로그아웃
            </button>}
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
                        <NavItem className="ml-5"><Link to={'/others'}>남의 일기</Link></NavItem>
                      </Nav>
                    </div>
                  </Navbar>
                  <Switch>
                    <Route exact path='/' render={() => <WriteDiary textUpdate={this.textUpdate} />} />
                    <Route path='/SavedDiaries' render={() => <SavedDiaries diaries={this.state.diaries} clickUpdate={this.clickUpdate} />} />
                    <Route path='/others' render={() => <OthersDiaries />} />
                    <Route path='/ChosenDiary/:keySeconds' render={() => <ChosenDiary diary={this.state.clickedDiary} removeDiary={this.removeDiary} />} />
                    <Redirect to='/' />
                  </Switch>
                </div>
              </HashRouter>
            </main>
          </div>
        );

    }
    return (
      <div className="App">
        {content}
      </div>

    );
  }
}

class OthersDiaries extends Component {
  render() {
    return (<p>hi</p>);
  }
}

export default App;
