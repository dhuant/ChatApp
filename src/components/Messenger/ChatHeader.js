import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateStarUser,getUserFromFirebase} from '../../store/Actions/user';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';
class ChatHeader extends Component {
    onClick = async(star) => {
        const item = {
            star: !star,
            idAuth: this.props.auth.uid,
            idChatWith: this.props.chatHeader.uid
        }
        await this.props.updateStarUser(item);
        this.props.getUserFromFirebase(item.idChatWith);
    }
    render() {
        console.log(this.props.chatHeader)
        let starClass = 'fa fa-star uncheck';
        if(this.props.chatHeader.star){
            starClass = "fa fa-star check"
        }
        return (
            
            <div className="chat-header clearfix">
                <img src={this.props.chatHeader.avatarUrl} width = '40px' height = '40px' alt="avatar" />
                <div className="chat-about">
                    <div className="chat-with">Chat with {this.props.chatHeader.displayName}</div>
                    
                </div>
                <i className={starClass} onClick={() =>this.onClick(this.props.chatHeader.star)}></i>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateStarUser: (item) => {
            dispatch(updateStarUser(item))
        },
        getUserFromFirebase: (id) => {
            dispatch(getUserFromFirebase(id))
        }
    }
};
const mapStateToProps = (state) => {
    // console.log(state.userReducer);
    return {
        chatHeader: state.userReducer,
        auth: state.firebase.auth
    }
}
export default compose(firebaseConnect(),connect(mapStateToProps, mapDispatchToProps))(ChatHeader);