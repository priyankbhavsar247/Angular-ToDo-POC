var app = angular.module('todo-app', [ 'ui.router', 'ngStorage' ]);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('manageToDo', {
		url : '/manage-to-do',
		templateUrl : 'pages/manage-to-do.html',
		controller : 'to-do-controller'
	}).state('login', {
		url : '/login',
        templateUrl : 'pages/login.html',
		controller : 'login-controller'
	});

});