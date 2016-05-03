import firebase from '../../Firebase';
import {mergeArrayObjectWithKey} from '../../../utils/firebaseUtils';

export default class PostFirebase {
    createPost(data, uid) {
        let postFirebase = firebase.child('posts');
        const post = Object.assign(data, {uid: uid});

        let promise = new Promise((resolve, reject)=> {
            try {
                let create = postFirebase.push();
                let key = create.key();
                create.set(post, function () {
                    post.id = key;
                    resolve(post);
                });
            }
            catch (e) {
                reject();
                console.log(e);
            }
        })
        return promise;
    }

    getPostLists() {
        let postsFirebase = firebase.child('posts');
        let promise = new Promise((resolve, reject) => {
            try {
                postsFirebase.on('value', function (snapshot) {
                    let posts = mergeArrayObjectWithKey(snapshot.val());
                    resolve(posts);
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return promise;
    }
}