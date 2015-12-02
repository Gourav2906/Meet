angular.module('storyCtrl',['storyservice'])

.controller('storycontroller',function(story){

    var vm=this;
 
		 story.allstory()
		 .success(function(data){                                                                                                  
               vm.stories= data;
		 });


		 vm.createstory=function(){
            vm.message='';
 		 	story.create(vm.storyData)
            .success(function(data){
               vm.storyData= '';
 
               vm.message=data.message;
                

		       vm.stories.push(data);
		 }); 
		};



})