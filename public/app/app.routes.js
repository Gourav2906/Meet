angular.module('appRoutes', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html',
            controller: 'mainCtrl'
		})
		/*.when('/login', {
			templateUrl: 'app/views/pages/login.html'
		})*/


		.when('/signup',{
          templateUrl:'app/views/pages/signup.html'
		})

		.when('/addevent',{
          templateUrl:'app/views/pages/event.html',
           controller:'eventCtrl'

		})
        
        .when('/displayevents',{
          templateUrl:'app/views/pages/display.html',
           controller:'displayCtrl'
		})
       
        .when('/view',{
          templateUrl:'app/views/pages/eventtemplate.html',
           controller:'viewCtrl'

		})
     

        .when('/addsponsor',{
          templateUrl:'app/views/pages/sponsor.html',
           controller:'sponsorCtrl'

		})

		.when('/logout', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'mainCtrl'
		})
				

	$locationProvider.html5Mode(true);

})