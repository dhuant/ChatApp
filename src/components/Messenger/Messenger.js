import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, getFirebase } from 'react-redux-firebase'
class Messenger extends Component {

    componentWillReceiveProps() {
        if (isEmpty(this.props.auth)) {
            this.props.history.push("/");
        }
    }

    handleLogOut() {
        this.props.firebase.logout();
        console.log(this.props.auth);
    }
    render() {
        return (
            <div>
                <h3>Messenger</h3>
                <h4>Hello, {this.props.auth.displayName}</h4>
                <button onClick= {()=> this.handleLogOut()} >Log Out</button>
            </div>
        );
    }
}
Messenger.propTypes = {
    firebase: PropTypes.shape({
        logout: PropTypes.func.isRequired
    }),
    auth: PropTypes.object,
}
export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(Messenger);