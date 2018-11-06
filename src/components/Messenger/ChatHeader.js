import React, { Component } from 'react';
import {connect} from 'react-redux';

class ChatHeader extends Component {
    render() {
        return (
            
            <div class="chat-header clearfix">
                <img src={this.props.chatHeader.avatarUrl} width = '40px' height = '40px' alt="avatar" />
                <div class="chat-about">
                    <div class="chat-with">Chat with {this.props.chatHeader.displayName}</div>
                    
                </div>
                <i class="fa fa-star"></i>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state.userReducer);
    return {
        chatHeader: state.userReducer
    }
}
export default connect(mapStateToProps)(ChatHeader);