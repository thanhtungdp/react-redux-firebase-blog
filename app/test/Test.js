import Auth from '../api/auth/index';
import 'whatwg-fetch';

localStorage.setItem('hello', {a: 'tung', b: 'tien'});

let myHeaders = new Headers();
myHeaders.set('Access-Control-Allow-Origin','*');

function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);
}


window.fetch('http://www.cooky.vn/directory/search?q=&st=2&pageSize=40', {mode:'no-cors',headers: myHeaders,credentials: 'include'})
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (text) {
        console.log('Request successful', text);
    })
    .catch(function (error) {
        log('Request failed', error)
    });


Auth.isAuthenticated().then((user)=> {
    console.log(user);
}).catch((error)=> {
    console.log(error);
});

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