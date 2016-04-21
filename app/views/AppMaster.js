import React,{Component} from 'react';
import {Link} from 'react-router';
export default class AppMaster extends Component{
    render(){
        return (
            <div>
                <Link to="search">Search</Link>
                {this.props.children}
            </div>
        )
    }
}