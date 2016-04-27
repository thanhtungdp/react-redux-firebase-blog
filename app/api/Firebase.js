import Firebase from 'firebase';
import configs from '../configs/index';

export default new Firebase(configs.firebase.url);


