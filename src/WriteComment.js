import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/database';

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
      }else if(this.state.comment.length > 350){
        alert("댓글은 350자 이내로 써주세요!")
      }else{
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

      if(newComment.userID !== this.props.diary.userID){
        this.props.notifyUser(newComment, this.props.diary);
    }

      firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").push(newComment)
      this.setState({ comment: '' }); //empty out post for next time
    }
    }
  
    //onKeyPress={this.handleKeyPress}
    render() {
    //   console.log("for comment section")
    //   console.log(this.props.diary)
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

  export default WriteComment