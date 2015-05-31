var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getInfo = function(artist){
    	var deferred = $q.defer();
			$http({
				method: 'JSONP',
				url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
			}).then(function(results){
				results = results.data.results;
				var finalArray = [];
				for(var i = 0; i < results.length; i++){
					var formattedArtist = new Artist(results[i]);
					finalArray.push(formattedArtist);
					console.log(finalArray)
				}
				deferred.resolve(finalArray);
			});
			return deferred.promise;
  		 };

  	var Artist = function(artistInfo){
	      this.AlbumArt = artistInfo.artworkUrl60
	      this.Artist = artistInfo.artistName
	      this.Collection = artistInfo.collectionName
	      this.CollectionPrice = artistInfo.collectionPrice
	      this.Play = artistInfo.previewUrl
	      this.Type = artistInfo.kind
  	}


});