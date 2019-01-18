import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/database';
import _ from 'lodash';


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
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  onCommentSubmit = (e) => {
    e.preventDefault(); //don't submit
    /* TODO: add a new Chirp to the database */
    // let propsUser = this.props.currentUser;
    if (this.state.comment.length === 0) {
      alert("댓글을 적어주세요!")
    } else if (this.state.comment.length > 350) {
      alert("댓글은 350자 이내로 써주세요!")
    } else {
      let color = this.getRandomColor();
      firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").on("value", (snapshot) => {
        for (let key in snapshot.val()) {
          if (snapshot.exists && snapshot.val()[key].userID === this.props.currentUser.uid) {
            color = snapshot.val()[key].color
            // console.log(color);
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
      //   console.log("commentsubmitted")
      //   console.log(this.state.comment)
      // console.log(this.props.diary)
      let diariesObject = {};
      firebase.database().ref(`shared/diaries/`).child(this.props.keyValue).child("comments").on("value", (snapshot) => {
        if(snapshot.exists()){
        let commentsKeys = Object.keys(snapshot.val())
        diariesObject = commentsKeys.map((key) => {
          let commentsObj = {}
          if (key !== 'notification') {
            commentsObj = snapshot.val()[key].userID;
            // console.log(key)
            // commentsObj.id = key;
          }
          return commentsObj;
        })
      }
      })
      // _.uniq(diariesObject)
      // console.log(_.isEmpty(diariesObject))
      if (!_.isEmpty(diariesObject)) {
        let unique = diariesObject.filter((v, i, a) => a.indexOf(v) === i);
        let index = unique.indexOf(this.props.currentUser.uid)
        if (index !== -1) {
          unique.splice(index, 1)
        };
        let indexOwner = unique.indexOf(this.props.diary.userID)
        if (indexOwner !== -1) {
          unique.splice(indexOwner, 1)
        };
        this.props.notifyCommentUser(unique, this.props.diary, this.props.keyValue)
      }
      firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").push(newComment)
      this.setState({ comment: '' }); //empty out post for next time
      if (newComment.userID !== this.props.diary.userID) {
        this.props.notifyUser(newComment, this.props.diary, this.props.keyValue);
      }
    }
  }

  //onKeyPress={this.handleKeyPress}
  render() {
    //   console.log("for comment section")
    //   console.log(this.props.diary)
    return (
      <div className="text-center">
        <div id="commentTextArea" className="container">
          <form className="commentForm" onSubmit={this.onCommentSubmit}>
            <div className="input-group" >
              <textarea className="form-control" value={this.state.comment} id="textarea" name="text" rows="2" cols="80" type="text"
                placeholder="할말.." onChange={this.updateComment}></textarea>
              <span className="input-group-btn">
                <button type="submit" className="btn btn-light ml-1" style={{ height: "60px" }}>입력</button>
              </span>
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

export default WriteComment