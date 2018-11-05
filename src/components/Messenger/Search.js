import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div class="search">
                <input type="text" placeholder="search" />
                <i class="fa fa-search"></i>
            </div>
        );
    }
}

export default Search;