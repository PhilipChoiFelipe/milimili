import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class WriteDiary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        textValue: '',
        title: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      let date = new Date();
      this.props.textUpdate(this.state.textValue, date.getMilliseconds(), this.state.title);
    }
    handleChange = (event) => {
      this.setState({ textValue: event.target.value });
    }
  
    titleChange = (event) => {
      this.setState({ title: event.target.value })
    }
  
    render() {
      return (
        <div className="container text-center">
          <form className="myForm mt-5" onSubmit={this.handleSubmit}>
            <input className="mb-3 p-2" size="71" id="title" type="text" placeholder="제목" onChange={this.titleChange}></input>
            <div className="form">
              <textarea className="p-2" id="textarea" type="text" rows="20" cols="70" placeholder="오늘하루는 어떠셨나요?" onChange={this.handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-warning btn-lg mt-3 mb-3">
              제출
            </button>
          </form>
        </div>);
    }
  }

  export default WriteDiary