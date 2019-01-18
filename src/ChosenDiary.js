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


class ChosenDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      diary: ''
    }
  }

  // submitHandler = (event) => {
  //   event.preventDefault();
  //   if (window.confirm('정말로 지우시겠습니까?')) {
  //     this.props.removeDiary(this.props.diary.key);
  //   }
  //   // console.log(this.props.diary.key)
  //   // return <Redirect to='/SavedDiaries' />
  // }


  sharedRemovedHanler = (event) => {
    event.preventDefault();
    if (window.confirm('공유된 게시물을 정말로 지우시겠습니까?')) {
      this.props.removeMySharedDiary(this.state.diary.key);
      // this.setState({ redirect: true })
    }
  }

  // savedHandler = (event) => {
  //   event.preventDefault();
  //   if (window.confirm('공유하시겠습니까?')) {
  //     this.props.shareDiary(this.props.diary);
  //   }
  // }

  componentDidMount() {
    // console.log(this.props.match.params.keySeconds)
    let ref = firebase.database().ref(`shared/diaries`).child(this.props.match.params.keySeconds)
    ref.on("value", (snapshot) => {
      // console.log(snapshot.val())
      this.setState({ diary: snapshot.val() })
    })
  }

  render() {
    if (this.state.redirect) {
      //  return <Redirect push to={
      //     '/ChosenDiary/'
      //  } />
      window.location.reload()
    }
    // console.log(this.props.match.params.keySeconds);
    // console.log(this.props.currentUser.uid)
    // console.log();
    let body = <div></div>
    if (this.state.diary !== null) {
      body =
        (<div className="container text-center mt-4">
          <div className="jumbotron" style={{ backgroundColor: 'white' }}>
            <h1 id="diaryTitle" className="display-4">{this.state.diary.title}</h1>
            <p id="diaryText" className="lead">
              {this.state.diary.diary}
            </p>
            <p className="lead">
            </p>
          </div>
        </div>)
    }
    let content = <div></div>;
    if (this.state.diary !== null && typeof (this.state.diary) !== 'undefined') {
      if (this.state.diary.userID === this.props.currentUser.uid) {
        // console.log(this.state.diary)
        content = (
          <div>
            <WriteComment keyValue = {this.props.match.params.keySeconds} currentUser={this.props.currentUser} diary={this.state.diary} notifyCommentUser= {this.props.notifyCommentUser}/>
            <CommentList keyValue = {this.props.match.params.keySeconds} currentUser={this.props.currentUser} diary={this.state.diary} />
            <div className="text-center">
              <button type="submit" className="btn btn-danger m-3" onClick={this.sharedRemovedHanler}>
                삭제하기
          </button>
            </div>
          </div>
        )

        //sharedDiaries section: clicked on other post
      } else {
        content = (
          <div>
            <WriteComment keyValue = {this.props.match.params.keySeconds} notifyCommentUser= {this.props.notifyCommentUser} 
            notifyUser={this.props.notifyUser} currentUser={this.props.currentUser} diary={this.state.diary} />
            <CommentList keyValue = {this.props.match.params.keySeconds} currentUser={this.props.currentUser} diary={this.state.diary} />
          </div>)
      }
    }else{
      content=(<p className="text-center lead display-4 m-5" >존재하지않는 일기입니다</p>)
    }
    // console.log(this.state.diary)
    // window.location.reload()
    return (
      <div>
        {body}

        {/* <form className="myForm"> */}
        {content}
        {/* </form> */}
      </div>
    );
  }
}



export default ChosenDiary