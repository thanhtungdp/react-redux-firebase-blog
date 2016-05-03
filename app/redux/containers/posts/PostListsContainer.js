import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPostLists} from '../../actions/PostAction';
import {PostLists} from '../../../components/pages/posts/index';

class PostListsContainer extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        return (
            <div>
                <PostLists {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
        posts: state.posts.lists.payload.posts,
        isFetching: state.posts.lists.isFetching
    }
}

const mapDispatchToProps = (dispatch, state)=> {
    return bindActionCreators({getPostLists},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListsContainer);