// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// angular.module('starter.services',[])
// .service()

angular.module('starter', ['ionic'])
.constant('ApiEndpoint', {
  url: '/api'
})
.run(function($ionicPlatform, $http, $rootScope, ApiEndpoint) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }



    // CORS 요청 데모
    $http.get(ApiEndpoint.url + '/data.json').
      success(function(data, status, headers, config) {
        console.log(config);
        console.log(status);
        console.log(data);
        $rootScope.name = data.name;
        $rootScope.email= data.email;
        $rootScope.blog = data.blog;
      }).
      error(function(data, status, headers, config) {
        console.log(config);
        console.log(status);
        console.log(data);
      });

      });
})
