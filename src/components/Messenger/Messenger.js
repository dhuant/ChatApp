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
import {logOut,setStatus} from '../../store/Actions/Actions'

class Messenger extends Component {

    componentWillReceiveProps() {
        if (localStorage.getItem("logged in") !== "true")
             this.props.history.push('/');
    }
    componentWillMount(){
        if(localStorage.getItem("logged in") === false){
            this.props.history.push("/");
        }
        else {
            this.props.setStatus();    
        }
    }

    handleLogOut() {
        this.props.handleLogOut();
        this.props.firebase.logout();
        localStorage.setItem("logged in","false");
    }
    render() {
        return (
            <div>
                <h2>Messenger</h2>
                <h3>Hello, {this.props.auth.displayName}</h3>
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
const mapDispatchToProps = (dispatch) => {
    return {
        handleLogOut: ()=>{
            dispatch(logOut())
        },
        setStatus: () => {
            dispatch(setStatus())
        },
    }
}
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        uid: state.firebase.auth.uid,
    }
};

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(mapStateToProps,mapDispatchToProps)
)(Messenger);