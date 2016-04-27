import AuthFirebase from './services/AuthFirebase';

export class Auth {
    constructor() {
        this.service = new AuthFirebase(this);
        return this.service;
    }
}

export default new Auth()