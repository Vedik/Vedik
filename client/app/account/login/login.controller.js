
'use strict';

angular.module('myAppApp')
  .controller('LoginCtrl', function ($scope, Auth,$state, $location, $window) {
    $scope.loaded=false;
    $scope.user = {};
    $scope.submitted=false;
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('dashboard');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

          $scope.submittedSignUp=false;

    $scope.register = function(form) {
      $scope.submittedSignUp = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.emailNew,
          password: $scope.user.passwordNew,
        })
        .then( function() {
          // Account created, redirect to home
          $state.go('welcomeUser');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
     
    };

    $scope.loaded=true;
    $('#login').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $('#login_wrapper').addClass('animated fadeInUp');
         $('#animate').addClass('animated fadeInUp');
    });
   
  });
