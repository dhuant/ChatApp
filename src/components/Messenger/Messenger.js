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
import { logOut, setStatus } from '../../store/Actions/auth';
import { getUserFromFirebase } from '../../store/Actions/user';
import { withRouter } from 'react-router-dom';
class Messenger extends Component {

    componentWillReceiveProps() {
        if (localStorage.getItem("logged in") !== 'true') {
            this.props.history.push('/');
        }
    }
    componentWillMount() {
        console.log(this.props.auth);
        if (localStorage.getItem("logged in") === 'false') {
            this.props.history.push('/');
        }
        else {
            this.props.setStatus();
            this.props.getUserFromFirebase(this.props.match.params.id);
        }
    }
    
    handleLogOut() {
        this.props.handleLogOut();
        this.props.firebase.logout();
        localStorage.setItem("logged in", "false");
    }
    render() {
        console.log('render');
        console.log(this.props.auth.displayName);
        
        return (
            <div>
                <div>
                    <h2 style={{ color: 'Black' }}>Messenger</h2>
                    <h3 style={{ color: 'Black' }}>Hello, {this.props.auth.displayName}</h3>
                    {/* <h3 style={{ color: 'Black' }}>Hello, {this.props.auth.uid}</h3> */}
                </div>
                <div class="container clearfix">
                    <button className="float-right" style={{ height: '40px', width: '40px' }} onClick={() => this.handleLogOut()} >
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                    <div class="people-list" id="people-list">
                  
                        <ListUsers />
                    </div>
                    <div class="chat">
                        <ChatHeader />
                        <ChatHistory  auth= {this.props.auth} idReceiver = {this.props.match.params.id}/>
                        <MessageInput auth= {this.props.auth} idReceiver = {this.props.match.params.id} />
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
        handleLogOut: () => {
            dispatch(logOut())
        },
        setStatus: () => {
            dispatch(setStatus())
        },
        getUserFromFirebase: (uid) => {
            dispatch(getUserFromFirebase(uid))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};


export default compose(
    firebaseConnect(), // withFirebase can also be used
    withRouter,connect(mapStateToProps, mapDispatchToProps)
)(Messenger);
// export default compose(
//     firebaseConnect(), // withFirebase can also be used
//     withRouter,connect(mapStateToProps,mapDispatchToProps)
// )(Messenger);