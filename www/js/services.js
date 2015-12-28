var app = angular.module('starter.services',[]);

app.factory('Playlists', function($http){
    //list of playlists to retrieve data from
        var playlists = [];
        var youtubePlaylistsParams = {
            key: 'AIzaSyDki9Hc5ITjBJK50bO1h2zxld0oPiO8FLA',
            part: 'id,snippet',            
            order: 'date',
            maxResults: 50,            
            channelId: 'UC4zsqN5YdXfxkkdVvwNA3JA'
        };                      
            
        $http.get('https://www.googleapis.com/youtube/v3/playlists', {params: youtubePlaylistsParams})
              .success(function(data){
                 angular.forEach(data.items, function(child){
                    playlists.push(child);
                  });
            }).error(function(data){
                console.log ("Error");
        });                     
    


    return {
        all : function(){
            return playlists;
        },
        get: function(playlistId){
            for(var i = 0; i < playlists.length; i++){
                if(playlists[i].id  == playlistId){
                    return playlists[i];
                }                
            }
            return null;
        },
        remove: function(playlist) {
            playlists.splice(playlists.indexOf(playlist),1);
        }
    }
});


app.factory('PlaylistVideos', function($http){
    var videos = [];  
    
    var getPlaylistVideos  = function(playlistId) { 
        console.log(playlistId);
        var youtubePlaylistParams = {
                key: 'AIzaSyDki9Hc5ITjBJK50bO1h2zxld0oPiO8FLA',
                part: 'snippet',            
                order: 'date',
                maxResults: 50,            
                playlistId: playlistId
            };             

            $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {params: youtubePlaylistParams})
                  .success(function(data){
                     angular.forEach(data.items, function(child){
                        videos.push(child);
                      });
                      console.log(videos);
                }).error(function(data){
                    console.log ("Error");
                });                 
        
        return videos;
    };
            
    return {
        all : function(playlistId){                        
            return getPlaylistVideos(playlistId);
        },
        get: function(videoId){
            if(videos.length < 1) {
                this.all();
                for(var i = 0; i < videos.length; i++){
                if(videos[i].id  === videoId){
                    return videos[i];
                    }                
                }
            }            
            return null;
        },
        remove: function(video) {
            videos.splice(videos.indexOf(video),1);
        }
    }
});


app.factory('NearestChurch', function($http){
    var churchlocations = [
        {
          id : 0,
          location: "Woolwich",
          region: "Greenwich and Suffolk",
          streetName: "St Michael Church",
          postCode: "SE18 5LP"
        },
        {
          id : 1,
          location: "Dulwich",
          region: "Dulwich",
          streetName: "522 Lordship Lane, Dulwich",
          postCode: "SE22 8LD"
        },
        {
          id : 2,
          location: "Medway",
          region: "Dulwich",
          streetName: "Medway Rycroft Hall,Boundary Road Chatham Kent",
          postCode: "ME4 6UW"
        },
        {
          id : 3,
          location: "Gravesend",
          region: "Dulwich",
          streetName: "Church Gravesend Holy Trinity Primary School Trinity Road, Gravesend",
          postCode: "DA12 1LU"
        },
        {
          id : 4,
          location: "Hounslow",
          region: "Hounslow",
          streetName: "McCrea Hall, United Reformed Church, 114 Hanworth Road, Houslow",
          postCode: "TW3 1UF"
        },
        {
          id : 5,
          location: "Plaistow",
          region: "Plaistow",
          streetName: "5-15 Beaumont Road, Off Prince Regent Lane, Plaistow",
          postCode: "E13 8RJ"
        },
        {
          id : 6,
          location: "Clampham Junction",
          region: "Borough",
          streetName: "Transformation House, 58 S.t John's Hill, Clapham Junction ",
          postCode: "SW11 2AA"
        }        
    ];
    
    return {
        all : function(){                        
            return churchlocations;
        },
        get: function(churchId){                            
                for(var i = 0; i < churchlocations.length; i++){
                if(churchlocations[i].id  === churchId){
                    return churchlocations[i];
                    }                
                }            
            return null;
        },
        remove: function(church) {
            churchlocations.splice(churchlocations.indexOf(church),1);
        }
    }
});

app.factory('GeolocationSvc', ['$q', '$window',
    function($q, $window) {
      return function() {
        var deferred = $q.defer();

        if(!$window.navigator) {
          deferred.reject(new Error('Geolocation is not supported'));
        } else {
          $window.navigator.geolocation.getCurrentPosition(function(position) {
            deferred.resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          }, deferred.reject);
        }

        return deferred.promise;
      };
  }]);
  
   app.factory('ZipCodeLookupSvc', [
    '$q', '$http', 'GeolocationSvc',
    function($q, $http, GeolocationSvc) {
      var MAPS_ENDPOINT = 'http://maps.google.com/maps/api/geocode/json?latlng={POSITION}&sensor=false';

      return {
        urlForLatLng: function(lat, lng) {
          return MAPS_ENDPOINT.replace('{POSITION}', lat + ',' + lng);
        },

        lookupByLatLng: function(lat, lng) {
          var deferred = $q.defer();
          var url = this.urlForLatLng(lat, lng);

          $http.get(url).success(function(response) {
            // hacky
            var zipCode1;
            var address1;
            var result = [];
            console.log(response);
            
            angular.forEach(response.results, function(result) {
              if(result.types[0] === 'postal_code') {
                zipCode1 = result.address_components[0].short_name;
              }
              if(result.types[0] === 'street_address') {
                address1 = result.formatted_address;
              }
            });                   
            result = {
                zipcode: zipCode1,
                address: address1
            }
//            deferred.resolve(zipCode);
            deferred.resolve(result);
          }).error(deferred.reject);

          return deferred.promise;
        },

        lookup: function() {
          var deferred = $q.defer();
          var self = this;

          GeolocationSvc().then(function(position) {
            deferred.resolve(self.lookupByLatLng(position.lat, position.lng));
          }, deferred.reject);

          return deferred.promise;
        }
      };
    }
  ]);
  
  
   
 
