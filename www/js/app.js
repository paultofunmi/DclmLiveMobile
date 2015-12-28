// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova','youtube-embed'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('app.home', {
    url: "/home",
    views: {
      'tab-home': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl',        
      }
    }
  })
  
  .state('app.locationfinder', {
    url: "/locationfinder",
    views: {
      'tab-locations': {
        templateUrl: "templates/locationfinder.html",
        controller: 'LocationFinderCtrl',        
      }
    }
  })
  
  
    
  .state('app.locations', {
    url: "/locations",
    views: {
      'tab-locations': {
        templateUrl: "templates/locationfinder.html",
        controller: 'LocationFinderCtrl'
      }
    }
  })
  
  .state('app.devotional', {
    url: "/devotionals",
    views: {
      'tab-devotional': {
        templateUrl: "templates/devotional.html",
//        controller: 'DevotionalCtrl'
      }
    }
  })
  
  .state('app.livestream', {
    url: "/livestream",
    views: {
      'tab-livestream': {
        templateUrl: "templates/livestream.html",
//        controller: 'LiveStreamCtrl'
      }
    }
  })
  
   
  .state('app.sermons', {
    url: "/sermons",
    views: {
      'tab-sermons': {
        templateUrl: "templates/sermons.html",
        controller: 'SermonCtrl'
      }
    }
  })
  
  .state('app.sermon-playlists', {
    url: "/sermons/:playlistId",
    views: {
      'tab-sermons': {
        templateUrl: "templates/sermon-playlist.html",
        controller: "SermonPlaylistCtrl",
      }
    }
  })

  .state('app.about', {
    url: "/about",
    views: {
      'tab-about': {
        templateUrl: "templates/about.html",
        controller: 'HomeCtrl'
      }
    }
  })
  
  .state('app.events', {
    url: "/events",
    views: {
      'tab-events': {
        templateUrl: "templates/events.html"
      }
    }
  })

  .state('app.playlists', {
    url: "/playlists",
    views: {
      'tab-playlists': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'tab-playlists': {
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
