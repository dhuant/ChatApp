import React, { Component } from 'react';
import User from './User';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import _ from 'lodash'
class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render() {
        let users = this.props.users;
        // let priority =  users.find(this.props.uid);
        const idCurrent = this.props.uid;
        const index = _.findIndex(users, { 'key': idCurrent })
        let priority = null;
        if (index !== -1) {
            priority = _.values(users[index].value.priority);
            for (let i = 0; i < users.length; i++) {
                for (let j = 0; j < priority.length; j++) {
                    if (users[i].key === priority[j].idChatWith) {
                        users[i].star = priority[j].isStar;
                        users[i].lastChat = priority[j].lastChat;
                    }
                }
            }
        }
        let online = [];
        let offline = [];
        if (users) {
            for (let i = 0; i < users.length; i++) {
                users[i].starScore = users[i].star ? 100 * (new Date()) : 1;
                users[i].timeScore = users[i].lastChat ? users[i].lastChat : 1;
                if (users[i].value.status.online) {
                    online.push(users[i])
                } else {
                    offline.push(users[i])
                }
            }
        }

        online.sort((a, b) => {
            return ((b.starScore * b.timeScore) - (a.starScore * a.timeScore))
        })
        offline.sort((a, b) => {
            return ((b.starScore * b.timeScore) - (a.starScore * a.timeScore))
        })

        users = online.concat(offline);
        console.log(users);
        let listUsers = '';
        if (users) {
            console.log(users);
            if (this.state.keyword !== "") {
                users = users.filter((user) => {
                    return user.value.displayName.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
                })
            }

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
                <div className="search">
                    <input type="text" name="keyword" value={this.state.keyword} onChange={this.onChange} placeholder="search" />
                    <i className="fa fa-search"></i>
                </div>
                <ul className="list">
                    {listUsers}
                </ul>
            </div>

        );
    }

}
const mapStateToProps = state => ({
    uid: state.firebase.auth.uid,
    users: state.firebase.ordered.users,
})

export default compose(firebaseConnect(['users']), connect(mapStateToProps))(ListUser)