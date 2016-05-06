import React, {Component, PropTypes} from 'react';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-overlay">
                <div className="mikepad-loading">
                    <div className="binding"></div>
                    <div className="pad">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                    </div>
                    {this.props.text &&
                    <div className="text">
                        {this.props.text} ...
                    </div>
                    }
                </div>
            </div>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string
}