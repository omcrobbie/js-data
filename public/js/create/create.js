'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('create', {
		url: '/create/:userId',
		templateUrl: 'js/create/create.html',
		controller: 'CreateCtrl', 
		/*
				add a resolve block that has an author function which 
				users $stateParams to retrieve the author object
		*/
		resolve: {
			author: function(User, $stateParams){
				return User.find($stateParams.userId);
			}
		}
	})
})

// add necessary dependencies here 
app.controller('CreateCtrl', function($scope, Post, $state, $stateParams) {

	$scope.previewTrue = false;

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	}

	/*

	TODOS: 
	1 - create the object that the form can use via ng-model
  2 - create a function that 
	 		a) persists the ng-modeled post object 
			b) changes the state to 'main'  

	*/
	$scope.createNewPost = function(){
		//console.log($scope.newPost);
		Post.create({
			title: $scope.newPost.title, 
			body: $scope.newPost.body, 
			author: $stateParams.userId})
		.then(function(post){
			$state.go('main');
		});
	}
	
}) 