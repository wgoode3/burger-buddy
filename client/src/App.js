import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import List from './Components/List';
import New from './Components/New';
import Review from './Components/Review';
import Edit from './Components/Edit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="jumbotron">
          <h1>Burger Buddy</h1>
        </div>
        <div className="nav">
          <div className="container">
            <Link to="/">Home</Link>
            <Link to="/new">New</Link>
            <a href="#!">About</a>
            <a href="#!">Contact Us</a>
            <a href="#!">Blog</a>
            <a href="#!">User</a>
          </div>
        </div>
        <div className="container">
          <Route exact path="/" component={List} />
          <Route path="/new" component={New} />
          <Route path="/burger/:_id" component={Review} />
          <Route path="/edit/:_id" component={Edit} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
