import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import {searchPhotoAction} from '../actions/SearchActions';

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    searchPhoto(value) {
        if (this.props.status != "FETCHING") {
            this.props.dispatch(searchPhotoAction(value));
            document.getElementById('header').style.animationPlayState = 'running';
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.search != nextProps.search) {
            this.searchPhoto(nextProps.search);
            let search = nextProps.search ? nextProps.search : '';
            this.refs.keyword.value = search;
        }
    }

    componentDidMount() {
        if (this.props.search) {
            this.searchPhoto(this.props.search);
        }
    }

    submitSearch(event) {
        if (event.which == 13) {
            const val = this.refs.keyword.value;
            hashHistory.push('search/' + val);
        }
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input type="text" onKeyDown={this.submitSearch.bind(this)} ref="keyword"
                           className="form-control input-lg" placeholder="Nature, Sky, Aurora... + Enter"
                           defaultValue={this.props.search}/>
                </div>
                {
                    (()=> {
                        if (this.props.status === 'PENDING') {
                            return <div className="loading"/>
                        }
                    })()
                }
            </div>
        )
    }
}

SearchInput.propTypes = {
    actions: PropTypes.object,
    status: PropTypes.string
}