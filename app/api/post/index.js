import PostFirebase from './services/PostFirebase';

export class Post {
    constructor() {
        this.service = new PostFirebase(this);
        return this.service;
    }
}

export default new Post();