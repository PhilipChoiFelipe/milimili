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
      let data = this.props.diaries.map((diary) => {
        // return <OneSavedDiary key={diary.date} oneDiary={diary} />
        return ({ value: diary.title, count: Math.random() * 50, diary: diary.diary, key: diary.date });
      })
  
      if (this.state.redirect) {
        // return <Redirect push to={'/ChosenDiary/' + this.state.clickedDiary.key}/>
        return <Redirect push to={{
          pathname: '/ChosenDiary/' + this.state.clickedDiary.key
        }} />
  
      }
  
      return (
        <div>
          < div className="container" id="wordCloud">
            <TagCloud className="text-center" id="tagCloud" minSize={50}
              maxSize={90}
              tags={data}
              onClick={(tag) => this.handleClick(tag)} />
          </div >
        </div >
      );
    }
  }

  export default SavedDiaries