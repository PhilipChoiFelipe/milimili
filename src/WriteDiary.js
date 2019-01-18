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
    if (this.state.textValue.length === 0 || this.state.title.length === 0) {
      alert("제목/내용을 써주세요!")
    } else if (this.state.title.length > 20) {
      alert("제목은 20자 이내로 쓰셔야합니다")
    } else if (this.state.textValue.length > 2000) {
      alert("글은 2000자 이내로 써주세요")
    } else {
      if (window.confirm('내 일기장에 저장하시겠습니까?')) {
        this.props.textUpdate(this.state.textValue, date.getMilliseconds(), this.state.title);
        this.setState({ textValue: '', title: '' })
      }
    }
  }

  handleChange = (event) => {
    this.setState({ textValue: event.target.value });
  }

  titleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <form className="myForm mt-5" onSubmit={this.handleSubmit}>
              <textarea value={this.state.title} className="mb-2 p-2"  id="textarea" type="text" rows="1"placeholder="제목" onChange={this.titleChange}></textarea>
              <div className="form">
                <textarea value={this.state.textValue} className="p-2" id="textarea" type="text" rows="20"  placeholder="오늘하루는 어떠셨나요?" onChange={this.handleChange}></textarea>
              </div>
            <button type="submit" className="btn btn-warning btn-lg mt-3 mb-3">
              저장
            </button>
          </form>
        </div>
        <div id="footer" className="mt-5 pb-2">
          {/* <Notification notify={this.notifyUser}/> */}
          <p className="lead mt-1 ml-3" style={{ fontSize: "0.9em", color: "#B09273" }}>
            Copyright (c) FELIPECHOI All Right Reserved.
            <br />
            contact: min_0917@naver.com
            </p>
        </div>
      </div>
    );
  }
}

export default WriteDiary