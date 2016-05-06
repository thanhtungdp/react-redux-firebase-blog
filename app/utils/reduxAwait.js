import {connect as reduxConnect} from 'react-redux';

export function connect(mapStateToProps, ...args) {
    return reduxConnect((state, ownProps) => {
        const props = mapStateToProps(state, ownProps);
        let awaitStatuses = (state.await.statuses instanceof Array) ? {} : state.await.statuses;
        let awaitErrors = (state.await.errors instanceof Array) ? {} : state.await.errors;
        return {...props, awaitStatuses, awaitErrors};
    }, ...args)
}