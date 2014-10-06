// cordovaModuleName and cordovaInitialize come from cordovaSetup.js which is overwritten by platform.
angular.module('starter', ['ionic', 'controllers', 'services', cordovaModuleName])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(cordovaInitialize)

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

      .state('invite', {
          url: "/invite",
          templateUrl: "templates/invite.html",
          controller: 'InviteCtrl'
      })
      .state('compose', {
          url: "/compose",
          templateUrl: "templates/compose.html",
          controller: 'ComposeCtrl'
      })

  $urlRouterProvider.otherwise('/invite');

});


