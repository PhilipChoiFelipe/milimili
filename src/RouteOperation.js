import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'reactstrap'
import _ from 'lodash';
import ChosenDiary from './ChosenDiary'
import SavedDiaries from './SavedDiaries'
import WriteDiary from './WriteDiary'

class RouteOperation extends Component{
    constructor(props) {
        super(props);
        this.state = {
          diaries: [],
          clickedDiary: ''
        }
      }
      textUpdate = (diary, date, title) => {
        let copiedDiaries = this.state.diaries;
        copiedDiaries.push({ diary, date, title });
        this.setState({ diaries: copiedDiaries });
      }
    
      removeDiary = (keySecond) =>{
        let copiedDiaries = this.state.diaries;
         _.remove(copiedDiaries, (diary) => {
          return diary.date === keySecond
        })
        console.log(copiedDiaries)
        this.setState({diaries: copiedDiaries})
      }
    
      clickUpdate = (diary) => {
        console.log(diary.value)
        this.setState({ clickedDiary: diary })
        // console.log(this.state.clickedDiary.value)
      }
    
      render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="text-center" id="title"><Link to="/" id="titleLink">
                MiliMili
                </Link>
              </h1>
            </header>
    
            <main className="navBar mt-5">
              <HashRouter>
                <div>
                  <Navbar>
                    <div className="mx-auto">
                      <Nav>
                        <NavItem><Link to={'/'}>일기쓰기</Link>
                        </NavItem>
                        <NavItem className="ml-5"><Link to={'/SavedDiaries'}>나의 일기 </Link>
                        </NavItem>
                        <NavItem className="ml-5"><Link to={'/others'}>남의 일기</Link></NavItem>
                      </Nav>
                    </div>
                  </Navbar>
                  <Switch>
                    <Route exact path='/' render={() => <WriteDiary textUpdate={this.textUpdate} />} />
                    <Route path='/SavedDiaries' render={() => <SavedDiaries diaries={this.state.diaries} clickUpdate={this.clickUpdate} />} />
                    <Route path='/others' render={()=><OthersDiaries/>}/>
                    <Route path='/ChosenDiary/:keySeconds' render={() => <ChosenDiary diary={this.state.clickedDiary} removeDiary={this.removeDiary}/>} />
                    <Redirect to='/' />
                  </Switch>
                </div>
              </HashRouter>
            </main>
          </div>
    
        );
      }
}

class OthersDiaries extends Component {
    render(){
      return(<p>hi</p>);
    }
  }

export default RouteOperation