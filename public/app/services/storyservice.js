angular.module('storyservice',[])

.factory('story',function($http){

  var storyfactory={}

  storyfactory.create=function(storyData){
  	return 	$http.post('/api',storyData);
  }

  storyfactory.allstory=function(){
  	return $http.get('/api')
  }
 
   return  storyfactory;
})