// var myApp = angular.module('myApp',[]);
angular.module('event',[])

.controller('eventCtrl', function($scope,$http,$location) {
    $scope.name = "Himanshu Aggarwal ";

    $scope.events = {
        name:"" ,
        creator: "" ,
        date:"" ,
        location:"" ,
        description:"" ,
        time:"" ,
        imagepath:""
    };


    $scope.addEvent = function() {
        console.log($scope.events);
        $http({
            method: 'POST' ,
            url: '/api/addevent' ,
            data: $scope.events
        }).then(function successCallback(response){

            console.log('hurray');
            $location.path('/');

        }, function errorCallback(response) {

            console.log('sorry buddy');

        });
    }

    $scope.blah = function() {
        console.log('it works man');
    }

});