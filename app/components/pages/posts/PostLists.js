import React, {Component, PropTypes} from 'react';

export default class PostLists extends Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        this.props.getPostLists();
    }

    render() {
        return (
            <div>
                <h4>Post Lists</h4>
                {this.props.posts.map(post =>
                    <p>{post.title}</p>
                )}
                {this.props.isFetching && <p>Is loading ...</p>}
            </div>
        )
    }
}

PostLists.propTypes = {
    posts: PropTypes.array,
    isFetching: PropTypes.bool,
    getPostLists: PropTypes.func.required
}