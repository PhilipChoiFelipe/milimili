import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/database';
import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';
// import "bootstrap-less";

// require("bootstrap/less/bootstrap.less");


class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            pageCount: ''
        }
        // this.handlePageChange = this.handlePageChange.bind(this)

    }



    removeComment = (commentKey) => {
        if (window.confirm('정말로 지우시겠습니까?')) {
            firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").child(commentKey).remove();
        }
    }

    componentDidMount() {
        firebase.database().ref(`shared/diaries/`).child(this.props.diary.key).child("comments").on("value", (snapshot) => {
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
        // console.log("comments")
        // console.log(this.state.comments)
        if (this.state.comments !== []) {
            let commentKeys = Object.keys(this.state.comments)
            // console.log(chirpsKeys);
            let commentObject = commentKeys.map((key) => {
                let commentObj = this.state.comments[key];
                commentObj.id = key;
                return commentObj;
            })
            content = commentObject.map((object) => {
                return (<SingleComment removeComment={this.removeComment} key={object.id} comment={object} currentUser={this.props.currentUser} diary={this.props.diary} />)
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
        // console.log(this.props.comment.id)
    }

    render() {
        let comment = this.props.comment;
        //<span className="handle">{comment.userName} </span>
        let content = <div></div>
        //others comment 
        //if comment's commenter's id is different that writer's id
        let button = <div></div>;
        if (this.props.comment.userID === this.props.currentUser.uid) {
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
                            {comment.text}
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
                            <div id="commentBox">{comment.text}</div>
                        </div>
                        {button}
                    </div>
                </div>
            )
        }
        return (
            <div>
                {content}

            </div>
        )
    }
}

export default CommentList