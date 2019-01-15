import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import { TagCloud } from "react-tagcloud";

class OthersDiaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      clickedDiary: '',
      // loading: true
    }
  }
  // componentDidMount() {
  //   if (typeof (this.props.sharedDiaries) !== undefined) {
  //     this.setState({ loading: false })
  //   }
  // }

  handleClick(tag) {
    this.props.clickUpdate(tag);
    this.setState({ redirect: true, clickedDiary: tag })
  }
  render() {
    // if (this.state.loading) {
    //   return (<div className="text-center">
    //     <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
    //   </div>);
    // }
    // console.log(this.props.sharedDiares)

    if (this.state.redirect) {
      // return <Redirect push to={'/ChosenDiary/' + this.state.clickedDiary.key}/>
      return <Redirect push to={{
        pathname: '/ChosenDiary/' + this.state.clickedDiary.key
      }} />
    }
    let data = [];
    // console.log(this.props.sharedDiaries)
    if (typeof (this.props.sharedDiaries) !== 'undefined') {
      data = this.props.sharedDiaries.map((diary) => {
        return ({
          value: diary.value, count: Math.random() * 20, diary: diary.diary, date: diary.date,
          key: diary.id, userID: diary.userID, shared: true, id: diary.id
        });
      })
    }
    // console.log("sharedDiares in Component");
    // console.log(data);
    // const customRenderer = (tag, size, color) => (
    //   <span key={tag.value}
    //     style={{
    //       animation: 'blinker 7s linear infinite',
    //       animationDelay: `${Math.random() * 2}s`,
    //       fontSize: `${size}em`,
    //       // border: `2px solid ${color}`,
    //       margin: '3px',
    //       padding: '3px',
    //       display: 'inline-block',
    //       color: color,
    //     }}>{tag.value}</span>
    // );
    return (
      <div>
        < div className="container mt-4" id="wordCloud">
          <TagCloud className="text-center" id="tagCloud" minSize={30}
            maxSize={60}
            tags={data}
            onClick={(tag) => this.handleClick(tag)}
          // renderer={customRenderer}
          />
        </div>
      </div >
    );
  }
}

export default OthersDiaries