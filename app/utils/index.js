import CompareUID from '../redux/containers/CompareUID';
import * as firebaseUtils from './firebaseUtils';
import * as reduxAwait from './reduxAwait';

export function compareUID(compare_id, Component){
    return <CompareUID compare_id={compare_id}><Component/></CompareUID>
}

export function setTitle(title){
    document.title = title;
}

export {
    reduxAwait
}