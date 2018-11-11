import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
class Message extends Component {

    render() {
        // console.log(this.props.message);
        // console.log(`chat with ${this.props.chatHeader.displayName}`)
        const { message } = this.props;
        const {auth} = this.props;
        let day = moment(message.time);
        // let time = moment(day.toDate()).calendar();
        let time = moment().format('LT');
        let parts = message.message.match(/(https?|ftp:)([^\s]+)/g);
        let links = null;
        if (parts) {
            links = parts.map((link, index) => {
                return (
                    <img src={link} key={index} />
                )
            })
        }
        let img = <img src={message.imgUrl}/>;
        // console.log(parts);
        if (message.liClass) {
            return (
                <li className={message.liClass}>
                    <div className="message-data align-right">
                        <span className="message-data-time" >{time}</span> &nbsp; &nbsp;
                            <span className="message-data-name" >{auth.displayName} </span>
                        <i className="fa fa-circle me"></i>
                    </div>
                    <div className="message my-message float-right">
                        {message.message}
                        {img}
                        {links}
                    </div>
                </li>
            )
        } else {
            return (
                <li>
                    <div className="message-data align-left">
                        <img src={this.props.chatHeader.avatarUrl} alt="avatar" className="float-left mr-2" />
                        <span className="message-data-name">
                            {this.props.chatHeader.displayName}
                        </span>
                        <span className="message-data-time">{time}</span>&nbsp; &nbsp;
                    </div>
                    <div className="message other-message float-left">
                        {message.message}
                        {img}
                        {links}
                    </div>
                </li>
            );
        }

    }
}
const mapStateToProps = (state) => {
    return {
        chatHeader: state.userReducer,
        //user: state.user,
    }
}
export default connect(mapStateToProps)(Message);