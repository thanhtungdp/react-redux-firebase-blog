//Import React
import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactTransitionGroup from 'react-addons-transition-group'

// Action
import {checkToken, getProfile} from '../../../redux/actions/AuthAction';

// Components
import Header from './partials/Header';
import {WrapTransitions} from '../../../components/form/index';

export default class AppMaster extends Component {

    constructor() {
        super(...arguments);
    }

    componentDidUpdate() {
        if (!this.props.auth.guest && !this.props.auth.profile.updated_at) {
            this.props.getProfile();
        }
    }

    componentDidMount() {
        this.props.checkToken();
        this.setState({firstRender: true})
    }

    render() {
        return (
            <div>
                <Header auth={this.props.auth}/>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticated
    }
}

const mapDispatchToProps = (dipsatch) => {
    return bindActionCreators({getProfile, checkToken}, dipsatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMaster);