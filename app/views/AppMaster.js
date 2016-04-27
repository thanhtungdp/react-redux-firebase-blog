import React,{Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/pages/master/Header';

export default class AppMaster extends Component{
    render(){
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}