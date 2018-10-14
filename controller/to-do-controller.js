app.controller('to-do-controller', function($scope, $rootScope, $localStorage, $window) {
	$scope.todo = {
		'title' : ''
	};
	$rootScope.loggedInUser = $localStorage.loggedInUser;
	$scope.hideDiv = true;
	$scope.showAlertDiv = false;
	function get() {
		
		if (!$localStorage.loggedInUser) {
			window.location = "/todo-angular/?#!/login"
			return;
		}

		if (!$localStorage.todos) {
			$localStorage.todos = {};
		}
		var toDoData = $localStorage.todos[$localStorage.loggedInUser];
		if (toDoData && toDoData.length) {
			$scope.todos = toDoData;
			$scope.hideDiv = false;
		}
	}

	get();

	$scope.toggleAll = function() {
		angular.forEach($scope.todos, function(itm){ itm.selected = $scope.selectAll; });
	 }
	 	 
	 $scope.optionToggled = function(){
	
	   $scope.selectAll = $scope.todos.
	   							every(function(itm){
									return itm.selected; 
								})
	 }

	if ($localStorage.loggedInUser) {
		$scope.todos = $localStorage.todos[$localStorage.loggedInUser] || [];
	} else {
		$scope.todos = [];
	}

	$scope.saveToDo = function() {

		if (!$scope.todo.title) {
			return;
		}

		if (!$localStorage.todos) {
			$localStorage.todos = {};
		}

		if ($scope.todo.index >= 0 && $scope.todos[$scope.todo.index]) {
			$scope.todos[$scope.todo.index].title = $scope.todo.title;
			$scope.todo.index = $scope.todos.length;
		} else {
			$scope.todo.index = ($scope.todos.length) ? $scope.todos.length + 1
					: 1;
			$scope.todos.push(angular.copy($scope.todo));
		}

		$localStorage.todos[$localStorage.loggedInUser] = $scope.todos;
		$scope.todo.title = '';
		$scope.hideDiv = false;
		$scope.showAlertDiv = false;
	}

	$scope.deleteTodo = function(index) {

		if (!$localStorage.todos) {
			$localStorage.todos = {};
		}

		$scope.todos.splice(index, 1);
		$localStorage.todos[$localStorage.loggedInUser] = $scope.todos;
		$scope.todo.index = ($scope.todos) ? $scope.todos.length : 0;

		if($scope.todos.length == 0){
			$scope.hideDiv = true;
		}
		$scope.showAlertDiv = false;
	}

	$rootScope.logout = function() {
		$rootScope.loggedInUser = null;
		$localStorage.loggedInUser = null;
		window.location = "/todo-angular/?#!/login";
	}

	$scope.deleteMultiple = function() {

		$scope.showAlertDiv = true;
		for (var i = $scope.todos.length - 1; i >= 0; i--) {
			
			if ($scope.todos[i].selected) {
				$scope.todos.splice(i, 1);
				$scope.showAlertDiv = false;
			}
		}
		$scope.todo.index = ($scope.todos) ? $scope.todos.length : 0;
		if($scope.selectAll){
			$scope.hideDiv = true;
			$scope.selectAll = false;
		}
	}

	$scope.editToDo = function(index) {
		var title = $scope.todos[index].title;
		$scope.todo.title = title;
		$scope.todo.index = index;
	}
});