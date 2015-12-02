angular.module('display',[])

.controller('displayCtrl',function($scope,$http,$location) {

	$scope.events = [];

	$scope.clickEvents = function(data) {
		console.log(data.name);
		localStorage.setItem("clickedEventId",data._id);
		localStorage.setItem("clickedEventName",data.name);
		localStorage.setItem("clickedEventCreator",data.creator);
		localStorage.setItem("clickedEventDescription",data.description);
		localStorage.setItem("clickedEventDate",data.date);
		localStorage.setItem("clickedEventTime",data.time);
		localStorage.setItem("clickedEventLocation",data.location);
		localStorage.setItem("clickedEventImagepath",data.imagepath);
		$location.path('/view');
	}


	/*$scope.clickSponsors = function(data) {
		console.log(data.name + " " + data.category + " " + data.members);
		localStorage.setItem("clickedEventId",data._id);
		localStorage.setItem("clickedEventName",data.name);
		localStorage.setItem("clickedEventCreator",data.creator);
		localStorage.setItem("clickedEventDescription",data.description);
		localStorage.setItem("clickedEventDate",data.date);
		localStorage.setItem("clickedEventTime",data.time);
		localStorage.setItem("clickedEventLocation",data.location);
		localStorage.setItem("clickedEventImagepath",data.imagepath);
		$location.path('/addsponsor');
	}*/


	$scope.showEvents = function() {
		console.log('init works');

		$http({
			method: 'GET' ,
			url: '/api/displayevents'
		}).then(function successCallback(response) {

			console.log('hurray');
			$scope.events = response.data;
			console.log($scope.events);

		}, function errorCallback(response) {
			console.log('sorry babu');
		})
	}

});