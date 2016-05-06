import React, {Component, PropTypes} from 'react';
import {connect} from '../../utils/reduxAwait';

class CompareUID extends Component {
    render() {
        return (
            <div>
                {this.props.compare_uid == this.props.uid && this.props.children}
            </div>
        );
    }
}

CompareUID.propTypes = {
    compare_uid: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        uid: state.authenticated.user.uid
    }
}

export default connect(mapStateToProps, null)(CompareUID)
