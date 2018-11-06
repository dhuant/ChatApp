import React, { Component } from 'react';
import User from './User';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
class ListUser extends Component {
    render() {
        let users = this.props.users.ordered.users;

        let listUsers = '';
        if (users) {
            listUsers = users.map((user, index) => {
                return (
                    <User
                        key={index}
                        user={user} />
                )
            })
        }
        return (
            <ul class="list">
                {listUsers}
            </ul>
        );
    }

}
const mapStateToProps = state => ({
    uid: state.firebase.auth.uid,
    users: state.firebase,
})

export default compose(firebaseConnect(['users']), connect(mapStateToProps))(ListUser)