import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {setTitle, reduxAwait} from '../../../utils/index';
import {PostView} from '../../../components/pages/posts/index';
import {getPostView, resetCurrentPost} from '../../actions/PostAction';

class PostViewContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isAuthor: false
        }
    }

    componentWillUnmount() {
        this.props.resetCurrentPost();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post_id != nextProps.post_id) {
            this.props.getPostView(nextProps.post_id);
        }
    }

    componentDidUpdate() {
        if (this.props.post.uid == this.props.uid && !this.state.isAuthor && this.props.post.uid) {
            this.setState({isAuthor: true});
        }
        if (this.props.post.title) {
            setTitle(this.props.post.title);
        }
    }

    componentDidMount() {
        this.props.getPostView(this.props.post_id);
    }

    render() {
        return (
            <PostView {...this.props} isAuthor={this.state.isAuthor}/>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
        uid: state.auth.authenticated.user.uid,
        post: state.posts.currentPost,
        post_id: ownProps.params.id
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({getPostView, resetCurrentPost}, dispatch);
}

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(PostViewContainer);
