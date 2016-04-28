import Auth from '../api/auth/index';

localStorage.setItem('hello',{a: 'tung',b:'tien'});

Auth.isAuthenticated().then((user)=>{
    console.log(user);
}).catch((error)=>{
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