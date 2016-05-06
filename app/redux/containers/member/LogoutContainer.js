import React from 'react';
import {connect} from 'react-redux';
import {authLogout} from '../../actions/AuthAction';
import {hashHistory} from 'react-router';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(authLogout());
    }
    render() {
        return (
            <div>
                Logout
            </div>
        )
    }
}

export default connect()(Logout);
