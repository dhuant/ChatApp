import React, { Component } from 'react';

class Message extends Component {
    
    render() {
        console.log(this.props.message)
        const {message} = this.props
        if(message.liClass){
            return (
                <li className={message.liClass}>
                        <div className="message-data align-right">
                            <span className="message-data-time" >{message.time}</span> &nbsp; &nbsp;
                            <span className="message-data-name" >Me</span> 
                            <i className="fa fa-circle me"></i>
                        </div>
                        <div className="message other-message float-right">
                            {message.message}
                        </div>
                    </li>
            )
        } else {
            return (
               <li>
                        <div className="message-data">
                            <span className="message-data-name">
                                <i className="fa fa-circle online"></i>
                                 Vincent
                            </span>
                            <span className="message-data-time">{message.time}</span>
                        </div>
                        <div className="message my-message">
                            {message.message}
                        </div>
                    </li>
            );
        }
        
    }
}

export default Message;