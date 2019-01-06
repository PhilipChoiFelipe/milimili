import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      if(window.confirm('정말로 지우시겠습니까?')){
        this.props.removeDiary(this.props.diary.key);
      }
      console.log(this.props.diary.key)
      return <Redirect to='/SavedDiaries'/>
    }
  
    render() {
      return (
        <div>
          <div className="container text-center">
            <div className="jumbotron" style={{backgroundColor: 'white'}}>
              <h1 className="display-4">{this.props.diary.value}</h1>
              <p className="lead">
                {this.props.diary.diary}
              </p>
              <p className="lead">
              </p>
   
            </div>
            <form onSubmit={this.submitHandler}>
            <button type="submit" className="btn-sm btn-info" >
                공유하기
              </button>
              <button type="submit" className="btn-sm btn-danger m-3" >
                삭제하기
              </button>
              </form>
          </div>
        </div>
      );
    }
  }

  export default ChosenDiary