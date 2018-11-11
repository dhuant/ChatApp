import React, { Component } from 'react';
import User from './User';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (e)  =>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render() {
        let users = this.props.users.ordered.users;

        console.log(users);
        let listUsers = '';
        
        if (users) {
            users = users.filter((user) => {
                return user.value.displayName.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
            })
            listUsers = users.map((user, index) => {
                return (
                    <User
                        key={index}
                        user={user} />
                )
            })
        }
        return (
            <div>
                <div class="search">
                    <input type="text" name="keyword" value= {this.state.keyword} onChange={this.onChange} placeholder="search" />
                    <i class="fa fa-search"></i>
                </div>
                <ul class="list">
                    {listUsers}
                </ul>
            </div>

        );
    }

}
const mapStateToProps = state => ({
    uid: state.firebase.auth.uid,
    users: state.firebase,
})

export default compose(firebaseConnect(['users']), connect(mapStateToProps))(ListUser)