/* React */
import React,{Component} from 'react';
import {Link} from 'react-router';

/* Component */
import Header from '../components/layouts/master/partials/Header';

export default class AppMaster extends Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}