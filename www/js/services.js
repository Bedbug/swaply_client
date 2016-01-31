angular.module('starter.services', [])

.factory('Items', function(Restangular) {
  // Might use a resource here that returns a JSON array
    
    // var items;
    // var allactivities = Restangular.all('activities');
    // Restangular.setBaseUrl('https://sportimo_api.mod.bz/api/');
    // Restangular.setRestangularFields({ id: "_id" });
    // //Restangular.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
    
  return {
    all: function() {
     return {};
     // }
          
      
    },
    remove: function(chat) {
      // items.splice(items.indexOf(chat), 1);
    },
    get: function(chatId) {
      // for (var i = 0; i < items.length; i++) {
      //   if (items[i]._id === parseInt(chatId)) {
      //     return items[i];
      //   }
      // }
      return null;
    }
  };
})

.factory('SwapItems',function(Restangular){
    
    var items = [
        {game_name:"Bloodborne", cover:"./img/test_cover.jpg", distance: "1.24Km", tags:["XONE","PS4"], token: 3},
        {game_name:"MGS 5: Phantom Pain",  cover:"./img/test_cover2.jpg", distance: "3.14Km", tags:["XONE"], token: 1},
        {game_name:"Bloodborne", cover:"./img/test_cover.jpg", distance: "1.24Km", tags:["XONE","PS4"], token: 3}
      ];
    
    Restangular.setBaseUrl('http://swaply.mod.bz/api/');  
    Restangular.setRestangularFields({ id: "_id" });
    var AllShares = Restangular.all('sharedwasps');
    
    
    //Restangular.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
  
  
  return{
    all: function(){
      AllShares.getList().then(function(data){
        return items;  
      })
      
    }
  }
})

;
