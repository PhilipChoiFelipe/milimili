import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/database';
// import Time from 'react-time'

// import { Form } from 'reactstrap'

import { Redirect } from 'react-router-dom';


class ChosenDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
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
      console.log("before comment")
      console.log(this.props.diary)
      content = (
        <div>
          <WriteComment currentUser={this.props.currentUser} diary={this.props.diary} />
          <CommentList currentUser={this.props.currentUser} diary={this.props.diary} />
        </div>)
    }



    return (
      <div>
        <div className="container text-center">
          <div className="jumbotron" style={{ backgroundColor: 'white'}}>
            <h1 className="display-4">{this.props.diary.value}</h1>
            <p id ="diaryTitle" className="lead">
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

class WriteComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
    this.updateComment = this.updateComment.bind(this)
  }

  updateComment = (event) => {
    event.preventDefault();
    this.setState({ comment: event.target.value });
  }

  getRandomColor() {
             var letters = 'BCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * letters.length)];
                }
                return color;
  }

  onCommentSubmit = (e) => {
    e.preventDefault(); //don't submit
    /* TODO: add a new Chirp to the database */
    // let propsUser = this.props.currentUser;
    if(this.state.comment.length === 0){
      alert("댓글을 적어주세요!")
    }else if(this.state.comment.length > 100){
      alert("댓글은 100자 이내로 써주세요!")
    }else{
    let color = this.getRandomColor();
    firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").on("value", (snapshot) => {
      for (let key in snapshot.val()) {
        if (snapshot.exists && snapshot.val()[key].userID === this.props.currentUser.uid) {
          color = snapshot.val()[key].color
          console.log(color);
        }
      }
    })
    let newComment = {
      userID: this.props.currentUser.uid,
      text: this.state.comment,
      time: firebase.database.ServerValue.TIMESTAMP,
      color: color,
      displayName: this.props.currentUser.displayName
    }
    console.log("commentsubmitted")
    console.log(this.state.comment)
    //.child(`${this.props.diary.userID}-${this.props.diary.date}`)
    firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").push(newComment)
    this.setState({ comment: '' }); //empty out post for next time
  }
  }

  //onKeyPress={this.handleKeyPress}
  render() {
    console.log("for comment section")
    console.log(this.props.diary)
    return (
      <div className="text-center">
        <div className="container">
          <form className="commentForm" onSubmit={this.onCommentSubmit}>
            <textarea className="form-control" value={this.state.comment} id="textarea" name="text" rows="2" cols="80" type="text"
              placeholder="할말.." onChange={this.updateComment}></textarea>
            <div className="text-right">
              <button type="submit" className="btn btn-light mb-5 ml-2">입력</button>
            </div>
          </form>
          {/* <button className="btn btn-primary ">

              입력
                </button> */}
        </div>
      </div>
    );
  }
}

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  removeComment = (commentKey) => {
    firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").child(commentKey).remove();
  }

  componentDidMount() {
    firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").on("value", (snapshot) => {
      console.log(snapshot.val())
      if (snapshot.exists()) {
        this.setState({ comments: snapshot.val() })
      }
    })
  }

  componentWillMount() {
    firebase.database().ref('unregister').off();
  }
  render() {
    // let refComment = firebase.database().ref(`shared/diaries/${this.props.diary.userID}-${this.props.diary.date}/comments`)
    // console.log(typeof(refComment))
    let content = '';
    console.log("comments")
    console.log(this.state.comments)
    if (this.state.comments !== []) {
      let commentKeys = Object.keys(this.state.comments)
      // console.log(chirpsKeys);
      let commentObject = commentKeys.map((key) => {
        let commentObj = this.state.comments[key];
        commentObj.id = key;
        return commentObj;
      })
      content = commentObject.map((object) => {
        return (<SingleComment removeComment ={this.removeComment}key={object.id} comment={object} currentUser={this.props.currentUser} diary={this.props.diary} />)
      })
    }
    return (
      <div>
        {content}
      </div>);
  }
}


class SingleComment extends Component {
  removeComment = () => {
    this.props.removeComment(this.props.comment.id);
    console.log(this.props.comment.id)
  }

  render() {
    console.log(this.props.currentUser.uid)
    console.log(this.props.diary.userID)
    let comment = this.props.comment;
    //<span className="handle">{comment.userName} </span>
    let content = <div></div>
    //others comment 
    //if comment's commenter's id is different that writer's id
    let button = <div></div>;
    if(this.props.comment.userID === this.props.currentUser.uid){
      button = (<div className="col-1" id="removeComment">
      <button id="oneCommentIn" onClick={this.removeComment} className="btn">
        x
      </button>
    </div>)
    }
    if (this.props.comment.userID !== this.props.diary.userID) {
      content = (
        <div className="container mb-3" id="commentContainerOther">
          <div className="row p-3 py-2 border" id="oneComment" style={{ backgroundColor: this.props.comment.color }}>
            <div className="col-lg-2 col-md-3">
              <p id="oneCommentIn">
                {this.props.comment.displayName}
        </p>
            </div>
            <div className="col pl-4 pl-lg-1 align-center">
              {/* <span className="time"><Time value={comment.time} relative/></span> */}
              <div>{comment.text}</div>
            </div>
            {button}
          </div>
        </div>)
      //writer's comment
       } else {
      content = (
        <div className="container mb-3" id="commentContainerOwn">
          <div className="row p-3 py-2 bg-white border" id="ownComment">
            <div className="col-lg-2 col-md-3">
              <p id="oneCommentIn">
                {this.props.comment.displayName}
            </p>
            </div>
            <div className="col pl-4 pl-lg-1">
              {/* <span className="time"><Time value={comment.time} relative/></span> */}
              <div>{comment.text}</div>
            </div>
              {button}
          </div>
        </div>
      )
    }    
    console.log(document.getElementById('removeComment'))
    return (
      <div>
        {content}
        
      </div>
    )
  }
}


export default ChosenDiary