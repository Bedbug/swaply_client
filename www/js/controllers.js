angular.module('starter.controllers', [])

// .controller('IntroCtrl', function($scope, $stateParams) {
// })
.controller('ProfileCtrl', function($scope, $rootScope, $state) {
  
  
  // Dummy Watchlist
  $rootScope.watchlist = [
    {
      "_id": "55f58e71a391258159207751",
      "title": "Metal gear Solid 4: Phantom Pain",
      "pic": "http://im.ziffdavisinternational.com/ign_ap/screenshot/default/mgsvtppxbox-oneprelimstndpng-1dddde-624wpng_dfkp.jpg",
      "tags": ["XONE"],
      "__v": 0
    },
    {
      "_id": "55f58e9fa391258159207752",
      "title": "Bloodborne",
      "pic": "http://images.pushsquare.com/games/ps4/bloodborne/cover_large.jpg",
      "tags": ["PS4"],
      "__v": 0
    }
    ];
  
  $scope.showWatchlist = function(){
    $state.transitionTo('watchlist', {arg:'arg'});
  };
    
})

.controller('WatchlistCtrl', function($scope, $rootScope, $stateParams, $ionicModal, $http, $ionicLoading, lodash,$ionicListDelegate) {
    
    $scope.needsUpdate = false;
  $scope.availableTags = ["XONE","PS4"];
  $scope.searchList = [
    {
      "_id": "55f58e71a391258159207751",
      "title": "Metal gear Solid 4: Phantom Pain",
      "pic": "http://im.ziffdavisinternational.com/ign_ap/screenshot/default/mgsvtppxbox-oneprelimstndpng-1dddde-624wpng_dfkp.jpg",
      "tags": [],
      "__v": 0
    },
    {
      "_id": "55f58e9fa391258159207752",
      "title": "Bloodborne",
      "pic": "http://images.pushsquare.com/games/ps4/bloodborne/cover_large.jpg",
      "tags": [],
      "__v": 0
    }
    ];
    
    $scope.add = function(item){
      $scope.needsUpdate = true;
      if($rootScope.watchlist==undefined) $rootScope.watchlist = [];
      
      console.log($rootScope.watchlist);
      $rootScope.watchlist.push(item);
      
      $ionicListDelegate.closeOptionButtons()
    }
    
    $scope.WatchListRange = 2;
  
    
  
    $scope.removeTag = function(item,index){
      $scope.needsUpdate = true;
      item.tags.splice(index,1);
      // $scope.watchlist[index].tags.splice(index,1)
    }
    
     $scope.dropped = function(tag, item) {
       $scope.needsUpdate = true;
       // console.log($scope.watchlist[item].tags);
       // console.log(tag);
       // console.log(lodash.contains($scope.watchlist[item].tags, tag));
        if(!lodash.contains($rootScope.watchlist[item].tags, tag))
          $rootScope.watchlist[item].tags.push(tag);
    
       $scope.$apply();
      // this is your application logic, do whatever makes sense
      // console.log(dropEl);
      // var drag = angular.element(dragEl);
      // var drop = angular.element(dropEl);
 
      // console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr("id") + "!");
    };
})

.controller('LoginCtrl', function($scope, $stateParams, $ionicModal, $http, $ionicLoading, $state) {
  
$scope.User = {};

  $scope.login = function(){
    
    $scope.show();
    
   $http({
  method: 'GET',
  url: 'http://swaply.mod.bz/api/authenticate/'+$scope.User.email
  }).then(function successCallback(response) {
    console.log(response);
    $scope.hide();
    $scope.closeModal();
     $state.transitionTo('dash', {arg:'arg'});
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    console.log(response);
      $scope.hide();
      $scope.closeModal();
     $state.transitionTo('dash', {arg:'arg'});
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  
  }
  
  // Global Loading
  $scope.show = function() {
    $ionicLoading.show({
      templateUrl: "templates/swaply_spinner.html"
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  
  // Login Modal
   $ionicModal.fromTemplateUrl('templates/login_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  
  
})

.controller('MapCtrl', function($scope, $rootScope, $cordovaGeolocation, $ionicPlatform){
  
   var div; 
   var count = 0;
        div = document.getElementById("map_canvas");
        
        if($rootScope.map){
          $rootScope.map.clear();
           $rootScope.memarker.remove();
        }
        $rootScope.map = window.plugin.google.maps.Map.getMap(div);
        $rootScope.map.addEventListener(window.plugin.google.maps.event.MAP_READY, onMapReady);
    
            function onMapReady() {
              
              count++;
              console.log("count:"+count);
              
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                
                       
                $cordovaGeolocation
                  .getCurrentPosition(posOptions)
                  .then(function (position) {
                    var lat  = position.coords.latitude
                    var long = position.coords.longitude
                    // console.log("Coords: "+position.coords);
                    
                    var MyPlace = new window.plugin.google.maps.LatLng(lat, long);
                    
                   $rootScope.memarker = $rootScope.map.addMarker({
                      'icon':'http://plebeosaur.us/etc/map/bluedot_retina.png',
                        'position': MyPlace,
                        'title': "My position now."
                      }, function(marker) {
                          marker.showInfoWindow();
                      });
                    
                    
                    
                      $rootScope.map.animateCamera({
                        'target': MyPlace,
                        'zoom': 18,
                        'bearing': 140
                      }, function() {
                        console.log("The animation is done");
                      });
                  }, function(err) {
                    // error
            });
      }
                 
        
        // 
        // map = window.plugin.google.maps.Map;//.getMap(div);
        
  
   
})

.controller('DashCtrl', function($scope, SwapItems, $state, Restangular,$ionicSlideBoxDelegate) {
  // Open Profile
  $scope.openProfile = function(){
    console.log("CLICK");
        $state.transitionTo('profile', {arg:'arg'});
    };
  
  
   var items = [
        {game_name:"Bloodborne", cover:"./img/test_cover.jpg", distance: "1.24Km", tags:["XONE","PS4"], token: 3},
        {game_name:"MGS 5: Phantom Pain",  cover:"./img/test_cover2.jpg", distance: "3.14Km", tags:["XONE"], token: 1},
        {game_name:"Bloodborne", cover:"./img/test_cover.jpg", distance: "1.24Km", tags:["XONE","PS4"], token: 3}
      ];
    
    Restangular.setBaseUrl('http://swaply.mod.bz/api/');  
    Restangular.setRestangularFields({ id: "_id" });
    var AllShares = Restangular.all('sharedwasps');
    loadData();
    
    function loadData(){
      AllShares.getList().then(function(data){
        $scope.swap_items = items;  
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
  
  //loadData();
  
  $scope.openMap = function(){
    console.log("Open Map");
    $state.transitionTo('map', {arg:'arg'});
  };
  
  var slideBoxID = -1;
  
  
  $scope.swipedCard = function(item, index){
     // Reset Previous SlideBox if exists
    var d = $ionicSlideBoxDelegate._instances;
    
    if(slideBoxID>-1 && slideBoxID != index)
      d[slideBoxID].slide(0);
    
     slideBoxID = index;
     
  }
  
  $scope.doRefresh = function(){
    loadData();
  };
  
  $scope.slideChanged = function(item, index){
    console.log("Changed: "+ index+" :"+item);
    
    
   $scope.swap_items.forEach(function(swapItem){
     if(swapItem == item){
      if(index == 1){
        swapItem.selected = true;
      }else{
        swapItem.selected = false;
      }
     }
     // else{
      // swapItem.selected = false;
      // swapItem.expand = false;
     // }
   });
  }
  
  $scope.expand = function(item){
    console.log(item);
    item.expand = !item.expand;
  }
  // var mypromise = SwapItems.all();
  
  // mypromise.then(function(data){
  //   $scope.swap_items = data;
  // });
})

.controller('ChatsCtrl', function($scope, Items
// , Restangular
) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  var mypromise = Items.all();
  
  mypromise.then(function(data){
    $scope.allItems = data;
  });
  
  
  // var Items = Restangular.all('activities');
  // Restangular.setBaseUrl('https://sportimo_api.jit.su/api/');
  //  Restangular.setRestangularFields({ id: "_id" });
  //  //Restangular.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
  // function loadItems(){
  //       Items.getList().then(function(data) {
  //           $scope.allItems = data;
  //           console.log(data.length);
  //       });
  //   };
  // loadItems();

  // $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Items.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
