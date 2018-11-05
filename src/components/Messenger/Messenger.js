import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, getFirebase } from 'react-redux-firebase';
import '../../style/messenger.scss';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ListUsers from './ListUser';
import MessageInput from './MessageInput';
import Search from './Search';

class Messenger extends Component {

    componentWillReceiveProps() {
        if (localStorage.getItem("logged in") !== "true")
             this.props.history.push('/');
    }
    componentWillMount(){
        if(localStorage.getItem("logged in") === false){
            this.props.history.push("/");
        }
    }

    handleLogOut() {
        this.props.firebase.logout();
        localStorage.setItem("logged in","false");
    }
    render() {
        return (
            <div>
                <h3>Messenger</h3>
                <h4>Hello, {this.props.auth.displayName}</h4>
                <button onClick={() => this.handleLogOut()} >Log Out</button>
                <div class="container clearfix">
                    <div class="people-list" id="people-list">
                        <Search/>
                        <ListUsers/>
                    </div>
                    <div class="chat">
                        <ChatHeader/>
                        <ChatHistory/>
                        <MessageInput/>
                    </div>
                </div>
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