import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash';
import Message from './Message';
class ChatHistory extends Component {
    scrollToBottom = () => {
        this.endChat.scrollIntoView({ behavior: "smooth" });

    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentWillReceiveProps(nextProps) {
        this.scrollToBottom();
        
    }
    componentDidUpdate(prevProps, prevState) {
        this.scrollToBottom();
        
    }
    
    
    render() {
        // console.log(_.values(this.props.messages));
        // console.log(this.props.messages);

        // console.log(this.props.idSender);
        // console.log(this.props.idReceiver);
        const auth = this.props.auth;

        const idSender = auth.uid;
        const idReceiver = this.props.idReceiver;
        const idMessage = (idSender < idReceiver) ? (idSender + idReceiver) : (idReceiver + idSender);
        //console.log(idMessage)
        let idx = -1;
        _.values(this.props.messages).forEach((mess, index) => {
            //console.log(_.values(mess)[0].idMessage)
            if (idMessage === _.values(mess)[0].idMessage) {
                idx = index;
            }
        })

        const chat = _.values(_.values(this.props.messages)[idx]);
        //console.log(chat)
        let list = null;
        if (chat) {
            list = chat.map((message, index) => {
                let liClass = null;
                if (message.idSender === idSender) {
                    liClass = "clearfix";
                }
                message.liClass = liClass;
                return (
                    <Message key={index} message={message} auth={auth} />
                )
            })
        }

        return (
            <div className="chat-history">
                <ul>
                    {list}
                </ul>
                <div style={{ float: "left", clear: "both" }} ref={(e) => { this.endChat = e; }}>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    messages: state.firebase.data.messages,
})
export default compose(firebaseConnect(['messages']), connect(mapStateToProps))(ChatHistory)