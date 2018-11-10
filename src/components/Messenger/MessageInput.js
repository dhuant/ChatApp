import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sendMessage} from '../../store/Actions/message'

class MessageInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
        }
    }
    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    onHanleKey = (e) => {
        if(e.keyCode === 13){
            this.onSubmit(e);
        }
        if( e.keyCode === 16 && e.keyCode===13){
            let str = this.state.message + '\n';
            this.setState({message: str});
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const idSender = this.props.auth.uid;
        const idReceiver = this.props.idReceiver;
        const idMessage = (idSender < idReceiver) ? (idSender + idReceiver) : (idReceiver + idSender);
        if(this.state.message !== ''){
            const item = {
                message: this.state.message,
                idSender: idSender,
                idReceiver: idReceiver,
                idMessage: idMessage,
                time: new Date()
            }
            // console.log(item);
            this.props.sendMessage(item);
            this.setState({
                message: '',
            })
        }
        
    }
    render() {
        // console.log(this.props.auth);
        // console.log(this.props.idReceiver);
        return (
            <div class="chat-message clearfix">
                <textarea name="message" value= {this.state.message} onChange={this.onChange} id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-file-image-o"></i>
                <button onClick={this.onSubmit}>Send</button>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);