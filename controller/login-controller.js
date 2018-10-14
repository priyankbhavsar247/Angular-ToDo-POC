app.controller('login-controller',
		function($scope, $rootScope, $state, $localStorage) {

			$rootScope.loggedInUser = $localStorage.loggedInUser;
			$scope.usernmae = 'priyank';
			$scope.passwordValue = 'priyank';
			$scope.isAuthenticated = true;

			$scope.login = function(username, password) {
				if ($scope.usernmae == username && $scope.passwordValue == password) {
					$localStorage.loggedInUser = username;
					$rootScope.loggedInUser = username;
					$state.go('manageToDo');
				} else{
					$scope.isAuthenticated = false;
				}
			}
		});