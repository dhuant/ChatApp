import React, { Component } from 'react';
import moment from 'moment';
import { getUser, getUserFromFirebase } from '../../store/Actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class User extends Component {
    onHandleOnClickUser = (uid) => {
        this.props.getUserFromFirebase(uid);
        let path = `/messenger/${uid}`;
        this.props.history.push(path);
    }
    render() {
        let { user } = this.props;
        let desc = '';
        if (user.value.status.online) {
            desc = 'online';
        }
        else {
            let day = moment(user.value.status.lastOnline);
            let lastOnline = moment(day.toDate()).calendar();
            desc = `${lastOnline}`;
        }
        return (
            <li class="clearfix">
                <img src={user.value.avatarUrl} alt="avatar" />
                <div class="about">
                    <div class="name" onClick={() => this.onHandleOnClickUser(user.key)}>{user.value.displayName}</div>
                    <div class="status">
                        <i className={user.online ? "fa fa-circle online" : "fa fa-circle offline"}></i>
                        {desc}
                    </div>
                </div>
            </li>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserFromFirebase: (uid) => {
            dispatch(getUserFromFirebase(uid))
        }
    }
};
const mapStateToProps = (state) => {
    return {
        chatHeader: state.userReducer
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
// export default withRouter(User);