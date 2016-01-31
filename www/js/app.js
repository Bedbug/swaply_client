// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngIOS9UIWebViewPatch','ionic', 'starter.controllers', 'starter.services','restangular','ngCordova','ngLodash'])

.run(function($ionicPlatform,$cordovaStatusbar) {
  $ionicPlatform.ready(function() {
  
      
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    
    // Status Bar
    $cordovaStatusbar.overlaysWebView(true);
    $cordovaStatusbar.styleColor('white');
    
    }
     
    if (window.cordova && window.cordova.logger) {
    window.cordova.logger.__onDeviceReady();
    }
    
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  
  // Lets see if we got this. We will try to create an Intro page
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
  })
  
  .state('watchlist', {
    url: '/watchlist',
    templateUrl: 'templates/watchlist.html',
    controller: 'WatchlistCtrl'
  })
  
  // Lets see if we got this. We will try to create an Intro page
  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  
  // Now lets make a login page
   .state('login', {
    url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
  })
  
  .state('dash', {
    url: '/dash',
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl'
  })
  
  .state('map', {
    url: '/map',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
  })
  
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}).filter("emptyifblank", function(){ return function(object, query){
    if(!query)
        return [];
    else
        return object;
}});
