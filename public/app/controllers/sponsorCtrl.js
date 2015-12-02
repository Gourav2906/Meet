angular.module('sponsor', [])
   
.controller('sponsorCtrl', function($scope, $http,$location) {
    
       $scope.user ={
        _id: localStorage.getItem('clickedEventId'),
			   companyname:"",
			   amount:"",
		  };
  
        $scope.submit = function() {
     
       $http({
          method  : 'POST',
          url     : '/api/addsponsor',
          data    : $scope.user 
         }).then(function successCallback(res) {
         	console.log("yo baby");
           $location.path('/displayevents');
         }, function errorCallback(err) {
         	console.log("no baby");
         });

        console.log("it works");
        console.log($scope.user);

        }
     });