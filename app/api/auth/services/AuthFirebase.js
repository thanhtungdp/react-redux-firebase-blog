import firebase from '../../Firebase';

export default class AuthFirebase {
    constructor(context) {
        this.context = context;
        this.user = {};
        this.profile = {};
    }

    /**
     * Register user
     * @param email | string
     * @param password | string
     * @returns {Promise}
     */
    register(email, password, profile = {}) {
        let context = this;
        let promise = new Promise(function (resolve, reject) {
            firebase.createUser({email, password}, function (err, user) {
                if (err) {
                    reject(err.message);
                }
                else {
                    context.updateProfile(profile, user.uid).then((profile)=> {
                        resolve({email, password});
                    });
                }
            });
        });
        return promise;
    }

    /**
     * Clean user from requesst
     * @param user
     * @returns {{email: *, token: (*|token|{isFetching}|{token, isFetching, error}|string), uid: (*|number)}}
     */
    cleanUser(user) {
        return {
            email: user.password.email,
            token: user.token,
            uid: user.uid
        }
    }

    /**
     * Login
     * @param email | string
     * @param password | password
     * @returns {Promise}
     */
    login(email, password) {
        let promise = new Promise(function (resolve, reject) {
            firebase.authWithPassword({email: email, password: password}, function (err, user) {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(this.cleanUser(user));
                }
            }.bind(this));
        }.bind(this));
        return promise;
    }

    /**
     * Check is Authenticated
     * @returns {Promise}
     */
    isAuthenticated() {
        let user = firebase.getAuth();
        let promise = new Promise(function (resolve, reject) {
            if (user) {
                resolve(this.cleanUser(user));
            }
            else reject('not auth token');
        }.bind(this));
        return promise;
    }

    /**
     * Logout
     * @returns {Promise}
     */
    logout() {
        return new Promise(function (relsove, reject) {
            firebase.unauth();
            relsove();
        })
    }

    /**
     * Update profile
     * @param profile | object
     * @param uid | string (eg: user_id)
     * @returns {Promise}
     */
    updateProfile(profile = {}, uid) {
        let userProfile = firebase.child('users').child(uid);
        let promise = new Promise(function (resolve, reject) {
            userProfile.set(profile, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(profile);
                }
            });
        });
        return promise;
    }

    /**
     * Get profile
     * @param uid
     * @returns {Promise}
     */
    getProfile(uid) {
        let userProfile = firebase.child('users').child(uid);
        let promise = new Promise(function (resolve, reject) {
            userProfile.on("value", (snapshot)=> {
                let profile = snapshot.val();
                resolve(profile);
            }, (error)=> {
                reject(error);
            });
        });
        return promise;
    }
}
