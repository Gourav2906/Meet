angular.module('main', [])


.controller('mainCtrl', function($rootScope, $location,$window,Auth) {

	var vm = this;


	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {

		vm.loggedIn = Auth.isLoggedIn();

		Auth.getuser()
			.then(function(data) {
				vm.user = data.data;
			});
	});

	$rootScope.temppath = "/app/views/pages/images/bayern.jpeg";


	vm.doLogin = function() {

		vm.processing = true;

		vm.error = '';

		console.log(vm.loginData.username + vm.loginData.password);

		Auth.login(vm.loginData.username, vm.loginData.password)


			.success(function(data) {
				vm.processing = false;

				Auth.getuser()
					.then(function(data) {
						vm.user = data.data;
					});

				if(data.success) {
					$('#modal1').closeModal();
					$location.path('/');
					$window.location.reload();
				}
				else
					vm.error = data.message;

			});
	}


	vm.doLogout = function() {
		Auth.logout();
		 $location.path('/logout');
	   
		// $location.path('/');
	}

	$rootScope.openModal = function() {
  		$('#modal1').openModal();   
	}


});