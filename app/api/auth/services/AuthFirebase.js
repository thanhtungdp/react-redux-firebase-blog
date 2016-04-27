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

    login(email, password) {
        let promise = new Promise(function (resolve, reject) {
            firebase.authWithPassword({email: email, password: password}, function (err, user) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                    this.user = user;
                }
            }.bind(this));
        }.bind(this));
        return promise;
    }

    isAuthenticated() {
        let user = firebase.getAuth();
        let promise = new Promise(function (resolve, reject) {
            if (user) {
                resolve(user);
            }
            else reject();
        }.bind(this));
        return promise;
    }

    logout() {
        return new Promise(function(relsove, reject){
            firebase.unauth();
            relsove();
        })
    }

    updateProfile(profile = {}) {
        let userProfile = firebase.child('users').child(this.user.uid);
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
}
