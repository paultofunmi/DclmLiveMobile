angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cordovaEmailComposer) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
      
        var email = {
            to: 'tofunmi.og@gmail.com',
            cc: 'joaggy@gmail.com ',
            bcc: ['superaffiliatesales@gmail.com', 'eosai01@yahoo.co.uk '],            
            subject: 'New Prayer Request',
            body: '<p style="color: #F00;">Type your message here</p>',
            isHtml: true
        };
        
           try {
                   $cordovaEmailComposer.isAvailable().then(function() {
                    // is available
                    console.log('possible');
                  }, function () {
                    // not available
                    console.log('not possible');
                  });
            }catch(e) {

            }

        $scope.sendprequest = function(){
                console.log('p');
                var email = {
                    to: 'tofunmi.og@gmail.com',
                    cc: 'joaggy@gmail.com ',
                    bcc: ['superaffiliatesales@gmail.com', 'eosai01@yahoo.co.uk '],            
                    subject: 'New Prayer Request',
                    body: '<p style="color: #F00;">Type your message here</p>',
                    isHtml: true
                };
                
                $cordovaEmailComposer.open(email).then(null, function () {
                    // user cancelled email
                    console.log('p email dismisssed');
                });
        }
            
        $scope.sharetestimony = function(){
//                console.log('t');
//                var email = {
//                    to: 'tofunmi.og@gmail.com',
//                    cc: 'joaggy@gmail.com ',
//                    bcc: ['superaffiliatesales@gmail.com', 'eosai01@yahoo.co.uk '],            
//                    subject: 'New Testimony',
//                    body: '<p style="color: #F00;">Type your message here</p>',
//                    isHtml: true
//                };
//                
//                $cordovaEmailComposer.open(email).then(null, function () {
//                    // user cancelled email
//                    console.log('t email dismisssed');
//                });                
                    
                      cordova.plugins.email.open({
                            to:      'tofunmi.og@gmail.com',
                            subject: 'Greetings',
                            body:    '<h1>Nice greetings from Leipzig</h1>',
                            isHtml:  true
                        });
                        
                        
//                    if(window.plugins && window.plugins.emailComposer) {
//                        
//                        
//                        window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
//                            console.log("Response -> " + result);
//                        }, 
//                        "Feedback for your App", // Subject
//                        "",                      // Body
//                        ["tofunmi.og@mgail.com"],    // To
//                        null,                    // CC
//                        null,                    // BCC
//                        false,                   // isHTML
//                        null,                    // Attachments
//                        null);                   // Attachment Data
//                    }
                
            
        }
            
        $scope.contact = function(){
                console.log('c');
                var email = {
                    to: 'tofunmi.og@gmail.com',
                    cc: 'joaggy@gmail.com ',
                    bcc: ['superaffiliatesales@gmail.com', 'eosai01@yahoo.co.uk '],            
                    subject: 'New Message from Contact Form',
                    body: '<p style="color: #F00;">Type your message here</p>',
                    isHtml: true
                };
                
                $cordovaEmailComposer.open(email).then(null, function () {
                    // user cancelled email
                    console.log('c email dismisssed');
                });
        }         
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('SermonCtrl', function($scope, Playlists) {    
    $scope.playlists = Playlists.all();    
})

.controller('SermonPlaylistCtrl', function($scope, $stateParams, Playlists, PlaylistVideos) {            
        $scope.playlist = Playlists.get($stateParams.playlistId);        
        $scope.videos = PlaylistVideos.all($stateParams.playlistId);                       
        console.log($scope.videos);
        $scope.$on('youtube.player.player', function ($event, player) {
            // play it again
            player.playVideo();
        });
        
})


.controller('LocationFinderCtrl', function($scope, $ionicLoading, NearestChurch, ZipCodeLookupSvc) {      
      $scope.zipCode = null;
      $scope.message = 'Finding zip code...';

      ZipCodeLookupSvc.lookup().then(function(result) {
        $scope.zipCode = result.zipcode;
        $scope.address = result.address;
      }, function(err) {
        $scope.message = err;
      });  
      
     $scope.findNearestChurch = function () {   
       $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Locating Nearest Church!'
        });
        
       console.log('findlocation');
       $ionicLoading.hide();   
     };
      
      

            
 })

    
    // Get Users Location
    // Compare with church locations
    // Calculate average distance away
    // Sort from least to most farthest.


.controller('HomeCtrl', function($scope) {
  
   
});
