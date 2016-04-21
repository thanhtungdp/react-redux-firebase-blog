import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

export default class SearchInput extends Component {

    searchPhoto(value) {
        if(this.props.status!="FETCHING") {
            this.props.actions.searchPhotoAction(value);
            document.getElementById('header').style.animationPlayState = 'running';
        }
    }

    componentWillUpdate(nextProps){
        if(this.props.search != nextProps.search){
            this.searchPhoto(nextProps.search);
        }
    }

    componentDidMount(){
        if(this.props.search){
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