import firebase from '../../Firebase';
import Auth from '../../auth/index';

import {mergeArrayObjectWithKey, mergeObjectWithKey} from '../../../utils/firebaseUtils';

export default class PostFirebase {

    /**
     * Create new post
     * @param newPost | object
     * @param uid | string (eg: user_id)
     * @returns {Promise}
     */
    createPost(newPost, uid) {
        let postFirebase = firebase.child('posts');
        const post = Object.assign(newPost, {
            uid: uid,
            created_at: new Date().getTime()
        });
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
                reject(e.message);
            }
        })
        return promise;
    }

    /**
     * Update post
     * @param post | object
     * @param post_id | string
     * @returns {Promise}
     */
    updatePost(post, post_id) {
        let postFirebase = firebase.child('posts').child(post_id);
        post.created_at = new Date().getTime();

        let promise = new Promise((resolve, reject)=> {
            try {
                postFirebase.update(post, function () {
                    post.id = post_id;
                    resolve(post);
                });
            }
            catch (e) {
                reject(e.message);
            }
        })
        return promise;
    }

    /**
     * Get post lists
     * @returns {Promise}
     */
    getPostsList() {
        let postsFirebase = firebase.child('posts');
        let promise = new Promise((resolve, reject) => {
            try {
                postsFirebase.on('value', function (snapshot) {
                    let posts = mergeArrayObjectWithKey(snapshot.val());
                    let loopGetUser = (postIndex) => {
                        if (postIndex == posts.length) {
                            resolve(posts.reverse())
                        } else {
                            Auth.getProfile(posts[postIndex].uid).then((profile)=> {
                                posts[postIndex].user = profile;
                                loopGetUser(postIndex + 1)
                            });
                        }
                    }
                    loopGetUser(0);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
        return promise;
    }

    /**
     * Get Post
     * @param id | string
     * @returns {Promise}
     */
    getPost(id) {
        let postFirebase = firebase.child('posts').child(id);
        let promise = new Promise((resolve, reject) => {
            try {
                postFirebase.on('value', function (snapshot) {
                    let post = snapshot.val();
                    if (post) {
                        Auth.getProfile(post.uid).then((profile)=> {
                            post.user = profile;
                            resolve(mergeObjectWithKey(post, id));
                        });
                    }
                    else {
                        reject('Post\'s not exists');
                    }
                });
            }
            catch (e) {
                reject(e.message);
            }
        });
        return promise;
    }

    deletePost(id) {
        let postFirebase = firebase.child('posts').child(id);
        return new Promise((resolve, reject) => {
            postFirebase.remove((err)=> {
                if (err) {
                    reject(err.message);
                }
                else resolve('Post was deleted');
            });
        })
    }
}