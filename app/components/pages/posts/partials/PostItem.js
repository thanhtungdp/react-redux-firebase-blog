import React, {Component, PropTypes} from 'react';
import {Col} from 'react-bootstrap';

export default class PostItem extends Component {
    render() {
        let post = this.props.post;
        return (
            <div className="post-item">
                <h4 className="title">
                    <a href={`#/posts/${post.id}`} onClick={this.props.onClick}>{post.title}</a>
                </h4>
                <p className="description">
                    {post.description}
                </p>
                <p className="user"><i className="icon-user"></i> {post.user.first_name}</p>
            </div>
        )
    }
}

PostItem.propTypes = {
    post: PropTypes.object
}