import React, { Component } from 'react';

class User extends Component {
    render() {
        let {user} = this.props;
        return (
            <li class="clearfix">
                <img src={this.props.user.value.avatarUrl} alt="avatar" />
                <div class="about">
                    <div class="name">{this.props.user.value.displayName}</div>
                    <div class="status">
                        <i class="fa fa-circle online"></i>online
                    </div>
                </div>
            </li>
        );
    }
}

export default User;