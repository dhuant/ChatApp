import React, { Component } from 'react';
import moment from 'moment'
class User extends Component {
    render() {
        let { user } = this.props;
        let status = '';
        let desc = '';
        if (user.value.status.online) {
            status = <i className="fa fa-circle online"></i>;
            desc = 'online';
        }
        else {
            status = <i className="fa fa-circle offline"></i>;
            let day = moment(user.value.status.lastOnline);
            let lastOnline = moment(day.toDate()).calendar();
            desc = `${lastOnline}`;
        }
        return (
            <li class="clearfix">
                <img src={user.value.avatarUrl} alt="avatar" />
                <div class="about">
                    <div class="name">{user.value.displayName}</div>
                    <div class="status">
                        {status} {desc}
                    </div>
                </div>
            </li>
        );
    }
}

export default User;