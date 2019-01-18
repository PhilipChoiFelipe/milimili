import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/database';
import WriteComment from './WriteComment'
import CommentList from './CommentList'

// import Time from 'react-time'

// import { Form } from 'reactstrap'

import { Redirect } from 'react-router-dom';


class OwnChosenDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      diary: '',
      // exists: false
    }
  }

  submitHandler = (event) => {
    // console.log(this.props.match.params.keySeconds)
    // console.log(this.state.diary)
    event.preventDefault();
    if (window.confirm('정말로 지우시겠습니까?')) {
      this.props.removeDiary(this.props.match.params.keySeconds);
    }
    // console.log(this.props.diary.key)
    // return <Redirect to='/SavedDiaries' />
  }

  savedHandler = (event) => {
    event.preventDefault();
    if (window.confirm('공유하시겠습니까?')) {
      this.props.shareDiary(this.state.diary);
    }
  }

  componentDidMount(){
    let ref = firebase.database().ref(`/diaries`).child(this.props.currentUser.uid).child(this.props.match.params.keySeconds)
    // console.log((ref))
    // ref.on("value", (snapshot) => {
    //   if(snapshot.exists()){
    //     this.setState({exists: true})
    //   }
    // })
    // if(this.state.exists){
    ref.child("key").on("value", (snapshot) => {
        if(!snapshot.exists()){
            ref.child("key").set(this.props.match.params.keySeconds)
            // console.log(snapshot.val())
        }
    })
  // }
  
    ref.on("value", (snapshot) => {
      // console.log(snapshot.val())
      this.setState({diary: snapshot.val()})
    })
  }

  render() {
    // console.log(this.props.match.params.keySeconds)
    // console.log(this.state.diary)
    // console.log(this.props.match.params.keySeconds);
    // console.log();

    let content = <div></div>;
      content = (
        <div className="text-center">
          <button type="submit" className="btn btn-info" onClick={this.savedHandler}>
            공유하기
        </button>
          <button type="submit" className="btn btn-danger m-3" onClick={this.submitHandler}>
            삭제하기
        </button>
        </div>
      )

    // window.location.reload()
    return (
      <div>
        <div className="container text-center mt-4">
          <div className="jumbotron" style={{ backgroundColor: 'white'}}>
            <h1 id="diaryTitle" className="display-4">{this.state.diary.title}</h1>
            <p id ="diaryText" className="lead">
              {this.state.diary.diary}
            </p>
            <p className="lead">
            </p>
          </div>
        </div>

        {/* <form className="myForm"> */}
        {content}
        {/* </form> */}
      </div>
    );
  }
}




export default OwnChosenDiary