import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import GoogleButton from 'react-google-button';
import {withRouter} from 'react-router-dom';

class LoginPage extends Component {
  componentDidUpdate() {
    if (!isEmpty(this.props.auth)) {
      console.log(this.props.auth.uid);     
      this.props.history.push(`/messenger/${this.props.auth.uid}`);
      localStorage.setItem('logged in',"true"); 
    }
  }
  render() {

    return (
      <div className="container" style={{width: '15%'}}>
          <div style={{margin: '100px auto'}} >
          <GoogleButton onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })} />
          </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object,
}
export default compose(
  firebaseConnect(),withRouter,
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)