import firebase from '../../Firebase';

export default class AuthFirebase {
    constructor(context) {
        this.context = context;
        this.user = {};
        this.profile = {};
    }

    register(email, password, profile) {
        let promise = new Promise(function (resolve, reject) {
            firebase.createUser({email, password}, function (err, user) {
                if (err) {
                    reject(err);
                }
                else resolve(user)
            });
        });
        return promise;
    }

    cleanUser(user) {
        return {
            email: user.password.email,
            token: user.token,
            uid: user.uid
        }
    }

    login(email, password) {
        let promise = new Promise(function (resolve, reject) {
            firebase.authWithPassword({email: email, password: password}, function (err, user) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.cleanUser(user));
                }
            }.bind(this));
        }.bind(this));
        return promise;
    }

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

    logout() {
        return new Promise(function (relsove, reject) {
            firebase.unauth();
            relsove();
        })
    }

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
