import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import PostItem from './partials/PostItem';
import {Loading, WrapContainer} from '../../form/index';
import {postsList} from '../../../configs/index';

export default class PostsList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            redirecting: false
        }
    }

    onClick(e) {
        e.preventDefault();
        let url = e.target.href;
        this.setState({redirecting: true});
        setTimeout(()=> {
            window.location = url;
        }, 300);
    }

    componentDidMount() {
        window.addEventListener('scroll', function () {
            if (this.props.awaitStatuses.getPosts == 'success') {
                console.log(document.body.scrollHeight + 'vs' + document.body.scrollTop + 'vs' + window.innerHeight);
                if (document.body.scrollHeight <= document.body.scrollTop + window.innerHeight) {
                    this.props.loadMore();
                }
            }
        }.bind(this));
    }

    render() {
        let posts = this.props.posts.slice(0, this.props.currentItems).map(post =>
            <Col md={6} key={post.id}>
                <PostItem post={post} onClick={this.onClick.bind(this)}/>
            </Col>
        );


        return (
            <WrapContainer animateIn="fadeIn" animateOut="zoomOut" out={this.state.redirecting}>
                <h1 className="title"><i className="icon-notebook"></i> Posts List</h1>
                <div className="post-lists">
                    <Row>
                        <Masonry options={{transitionDuration: 700}}>
                            {posts}
                        </Masonry>
                        { this.props.currentItems < this.props.posts.length &&
                        <Col md={12} className="text-center">
                            <button className="btn btn-red" onClick={() => this.props.loadMore()}>Load more</button>
                        </Col>
                        }
                    </Row>
                </div>
                {this.props.awaitStatuses.getPosts == 'pending' && <Loading text="Posts is loading"/>}
            </WrapContainer>
        )
    }
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    awaitStatuses: PropTypes.shape({
        getPosts: PropTypes.string
    })
}