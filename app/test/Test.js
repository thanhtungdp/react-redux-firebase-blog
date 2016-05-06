import Auth from '../api/auth/index';
import 'whatwg-fetch';
import firebase from '../api/Firebase';

localStorage.setItem('hello', {a: 'tung', b: 'tien'});

let myHeaders = new Headers();
myHeaders.set('Access-Control-Allow-Origin', '*');



//userLogin('tungptkh@gmail.com','123456').then(function(user){
//    console.log(user);
//}).catch(function(err){
//    console.log(err);
//});

//var auth = new Auth();

//auth.logined().then(function (user) {
//    let users = {
//        username: 'tung',
//        first_name: 'hello'
//    }
//    auth.updateProfile(users).then(function(){
//        console.log('updated');
//    })
//
//});

/*auth.register('tungpt@gmail.com', '123456', {}).then((user)=> {
 console.log(user);
 }).catch((err) => {
 console.log(err);
 });*/