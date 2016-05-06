import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {setTitle, reduxAwait} from '../../../utils/index';
import {getPostsList, loadMorePosts} from '../../actions/PostAction';
import {PostsList} from '../../../components/pages/posts/index';
import {postsList as postsListConfig} from '../../../configs/index';

class PostsListContainer extends Component{
    componentDidMount(){
        this.props.getPostsList();
        setTitle('Posts List');
    }

    render(){
        return (
            <PostsList {...this.props}/>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        posts: state.posts.lists,
        currentItems: state.posts.currentItems
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({getPostsList, loadMore: loadMorePosts}, dispatch)
}

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);