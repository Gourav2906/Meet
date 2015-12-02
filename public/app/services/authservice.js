angular.module('authservice',[])



.factory('Auth',function($http,$q,AuthToken){

var authfactory={};

authfactory.login=function(username,password){


	return $http.post('/api/login',{

		username:username,
		password:password
	})
	.success(function(data){


		AuthToken.setToken(data.token);
		return data;
	})
}
authfactory.logout=function(){

	AuthToken.setToken();
}
authfactory.isLoggedIn=function(){

	if(AuthToken.getToken())
		return true;
	else
		return false;
}
authfactory.getuser=function(){

	if(AuthToken.getToken())
		return $http.get('/api/me');
	else
		return $q.reject({message :"User has no token"});
}
return authfactory;
})


.factory('AuthToken',function($window){

var authtokenfactory={};
authtokenfactory.getToken=function(){
	return $window.localStorage.getItem('token');
}
authtokenfactory.setToken=function(token){

	if(token)
		$window.localStorage.setItem('token' ,token);
	else
		$window.localStorage.removeItem('token');
}
return authtokenfactory;
})

// .factory('AuthInterceptor',function($q,$location,AuthToken) {
// 	var interceptorfactory={};

// 	interceptorfactory.request=function(config){

// 		var token=AuthToken.getToken();

// 	if(token){
// 		config.headers['x-access-token']=token;
// 	} 
// 	return config;
// 	};

// // interceptorfactory.responseerror=function(response){

// 	// if(response.status==403)
// 	// 	$location.path('/login');
// 	// return $q.reject(response);
// // }
// return interceptorfactory;
// }) 

.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};


	interceptorFactory.request = function(config) {

		var token = AuthToken.getToken();

		if(token) {

			config.headers['x-access-token'] = token;

		}

		return config;

	};

	


	return interceptorFactory;
});

