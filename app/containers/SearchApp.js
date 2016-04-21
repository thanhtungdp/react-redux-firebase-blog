import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as action from '../actions/SearchActions';
import SearchInput from '../components/SearchInput';
import PhotoList from '../components/PhotoList';

class SearchApp extends Component {
    render() {
        const actions = bindActionCreators(action, this.props.dispatch);
        return (
            <div>
                <div id="header" className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 search-bar-content">
                                <h1>Search adsda giờ c lâu thấy bà kkadk kjad k kjads k jsd kadjas kad j
                                    skadon 500px hello baby</h1>
                                <SearchInput actions={actions} status={this.props.status} search={this.props.search}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <PhotoList actions={actions} photos={this.props.photos} status={this.props.status}
                               page={this.props.page}/>
                </div>
            </div>
        )
    }
}

SearchApp.propTypes = {
    status: PropTypes.string.isRequired,
    photos: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.number
}

const mapStateToProps = (state, ownProps) =>
{
    return {
        photos: state.photos.photos,
        status: state.photos.status,
        page: state.photos.page,
        search: ownProps.params.search
    }
}


export default connect(mapStateToProps)(SearchApp)