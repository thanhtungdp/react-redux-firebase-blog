import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import WrapTransitions from './WrapTransitions';

export default class WrapContainer extends Component {
    getWrapClassName() {
        let className = [
            'bg-white'
        ]
        className.push('animated');
        if(this.props.out){
            className.push(this.props.animateOut);
        }else {
            if (this.props.animateIn) {
                className.push(this.props.animateIn);
            }
        }
        return classNames(className);
    }

    render() {
        return (
            <Grid>
                <Col md={10} mdOffset={1} className={this.getWrapClassName()}>
                    {this.props.children}
                </Col>
            </Grid>
        )
    }
}

WrapContainer.propTypes = {}