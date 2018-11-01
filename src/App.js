import React, { Component } from 'react';
import './App.css';
import { withFirebase } from 'react-redux-firebase';
import LoginPage from './components/Login/LoginPage';
import Messenger from './components/Messenger/Messenger'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/messenger" component={Messenger} />
        </div>
      </Router>

    );
  }
}

export default withFirebase(App);
