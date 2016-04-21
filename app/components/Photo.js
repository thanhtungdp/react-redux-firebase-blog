import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
    }

    onHide(e) {
        let domModalContent = ReactDOM.findDOMNode(this.refs.modal_content);
        let domEventClick = e.target.parentNode;

        // If not click in out side modal-content then is close it
        console.log(domModalContent.contains(domEventClick));
        console.log(domModalContent.className);
        if (!domModalContent.contains(domEventClick) && domEventClick.className != 'modal-content') {
            this.setState({show: false})
            this.props.handleClose();
        }
    }


    render() {
        let css = {display: this.state.show ? 'block' : 'none'}
        let className = classNames({
            "modal fade": true,
            "in": this.state.show
        });
        return (
            <div>
                Baby
                <div className={className} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={css} onClick={this.onHide.bind(this)}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" ref="modal_content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.onHide.bind(this)}
                                        data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Image</h4>
                            </div>
                            <div className="modal-body">
                                <img src={this.props.image} alt="title"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Photo.defaultProps = {
    show: false,
    handleClose: ()=> {
    }
}

Photo.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    image: PropTypes.string
}