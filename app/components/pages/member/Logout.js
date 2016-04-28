import React from 'react';
import {connect} from 'react-redux';
import {authLogout} from '../../../redux/actions/AuthAction';
import {hashHistory} from 'react-router';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(authLogout());
    }

    componentWillMount() {
        if (!this.props.isFetching) {
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('update');
    }

    render() {
        return (
            <div>
                Logout
                {this.props.isFetching && 'Logout ...'}
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps)(Logout);
