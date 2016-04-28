import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateProfile} from '../../redux/actions/AuthAction';
import Profile from '../../components/pages/member/Profile';

class ProfileContainer extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        return (
            <div>
                <Profile updateProfile={this.props.actions.updateProfile} profile={this.props.profile} profileStatus={this.props.profileStatus}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
        profile: state.auth.authenticated.profile,
        profileStatus: state.auth.profile
    }
}

const mapDispatchToProps = (dispatch, state)=> {
    return {
        actions: bindActionCreators({updateProfile: updateProfile}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);