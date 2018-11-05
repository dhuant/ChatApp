import React, { Component } from 'react';

class MessageInput extends Component {
    render() {
        return (
            <div class="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-file-image-o"></i>
                <button>Send</button>
            </div>
        );
    }
}

export default MessageInput;