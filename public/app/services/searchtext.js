angular.module('searchtextservice',[])

.service('textservice', function() {
	var searchedText;

	var addText = function(data) {
		searchedText = data;
	};

	var getText = function() {
		return searchedText;
	};

	return {
		addText: addText ,
		getText: getText
	};

});