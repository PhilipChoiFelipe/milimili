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

  submitHandler = (event) => {
    event.preventDefault();
    if (window.confirm('정말로 지우시겠습니까?')) {
      this.props.removeDiary(this.props.diary.key);
    }
    // console.log(this.props.diary.key)
    // return <Redirect to='/SavedDiaries' />
  }


  sharedRemovedHanler = (event) => {
    event.preventDefault();
    if (window.confirm('공유된 게시물을 정말로 지우시겠습니까?')) {
      this.props.removeMySharedDiary(this.props.diary.key);
    }
  }

  savedHandler = (event) => {
    event.preventDefault();
    if (window.confirm('공유하시겠습니까?')) {
      this.props.shareDiary(this.props.diary);
    }
  }

  componentDidMount(){
    // console.log(this.props.match.params.keySeconds)
  }

  render() {
    let content = <div></div>;
    if (!this.props.diary.shared) {
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

      //sharedDiaries section: if you click your own shared post
    } else if (this.props.diary.userID === this.props.currentUser.uid) {
      content = (
        <div>
          <WriteComment currentUser={this.props.currentUser} diary={this.props.diary} />
          <CommentList currentUser={this.props.currentUser} diary={this.props.diary} />
          <div className="text-center">
            <button type="submit" className="btn btn-danger m-3" onClick={this.sharedRemovedHanler}>
              삭제하기
          </button>
          </div>
        </div>
      )

      //sharedDiaries section: clicked on other post
    } else {
      // console.log("before comment")
      // console.log(this.props.diary)
      content = (
        <div>
          <WriteComment notifyUser={this.props.notifyUser} currentUser={this.props.currentUser} diary={this.props.diary} />
          <CommentList currentUser={this.props.currentUser} diary={this.props.diary} />
        </div>)
    }
    console.log(this.props.diary)
    // window.location.reload()
    return (
      <div>
        <div className="container text-center">
          <div className="jumbotron" style={{ backgroundColor: 'white'}}>
            <h1 id="diaryTitle" className="display-4">{this.props.diary.value}</h1>
            <p id ="diaryText" className="lead">
              {this.props.diary.diary}
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



export default ChosenDiary