import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import { TagCloud } from "react-tagcloud";


class SavedDiaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      clickedDiary: ''
    }
  }

  handleClick(tag) {
    console.log(tag.value)
    this.props.clickUpdate(tag);
    this.setState({ redirect: true, clickedDiary: tag })
  }

  render() {
    console.log("passedDown diaries to saved")
    console.log(this.props.diaries)
    let data = this.props.diaries.map((diary) => {
      // return <OneSavedDiary key={diary.date} oneDiary={diary} />
      return ({ value: diary.title, count: Math.round((Math.random() * 20)), diary: diary.diary, date: diary.date, key: diary.id, id: diary.id, userID: diary.userID});
    })
    // let diaryCards = this.props.diaries.map((diary) => {
    //   return <DiaryCard diary={diary} />
    // })

    if (this.state.redirect) {
      // return <Redirect push to={'/ChosenDiary/' + this.state.clickedDiary.key}/>
      return <Redirect push to={{
        pathname: '/ChosenDiary/' + this.state.clickedDiary.id
      }} />

    }
    // const customRenderer = (tag, size, color) => (
    //   <span key={tag.value}
    //         style={{
    //           animation: 'blinker 7s linear infinite',
    //           animationDelay: `${Math.random() * 2}s`,
    //           fontSize: `${size}em`,
    //           // border: `2px solid ${color}`,
    //           margin: '3px',
    //           padding: '3px',
    //           display: 'inline-block',
    //            color: color,
    //         }}>{tag.value}</span>
    // );
    return (
      <div>
        < div className="container mt-4" id="wordCloud">
        <TagCloud 
        className="text-center" id="tagCloud" minSize={30}
              maxSize={60}
              tags={data}
              onClick={(tag) => this.handleClick(tag)} 
              shuffle={false}
              // renderer={customRenderer}
              />
              </div>
      </div >
    );
  }
}



export default SavedDiaries