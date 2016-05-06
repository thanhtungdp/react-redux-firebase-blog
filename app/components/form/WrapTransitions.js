import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class WrapTransitions extends Component {
    componentWillAppear(callback) {
        this._animateIn(callback);
    }

    _animateIn(callback) {
        let el = ReactDOM.findDOMNode(this);
        el.classList.remove('animated')
        el.classList.add('fadeIn')
        el.classList.add('animated');
        setTimeout(()=> {
            callback();
        }, 2000);
    }

    _animateOut(callback) {
        let el = ReactDOM.findDOMNode(this);
        el.classList.remove('animated')
        el.classList.add('fadeOut');
        el.classList.add('animated');
        setTimeout(()=> {
            callback();
        }, 2000);
    }

    componentWillEnter(callback) {
        console.log('enter');
        this._animateIn(callback);
    }

    componentWillLeave(callback) {
        console.log('leave');
        this._animateOut(callback);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

WrapTransitions.propTypes = {}