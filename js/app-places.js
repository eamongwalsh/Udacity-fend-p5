/* Knockoutjs - Udacity project no. 6 - Neighbourhood map */

/* This bit works - basic.... verified API key  
     var myMap;
      function initMap() {
        myMap = new google.maps.Map(document.getElementById('mapDiv'), {
          center: {lat: 53.27, lng: -9.053},
          zoom: 12
        });
      }*/

    // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    var viewModel = {
        myValue: ko.observable("What are you looking for?"),
        mySubmit: function() {

            //alert("submitting: " + this.myValue());
            initMap(this.myValue());
        } //end mySubmit function

    }; //end viewModel
        
      var map;
      var infowindow;
      //var placeType = 'bar';

      function initMap(placeType) {
        var galway = {lat: 53.27, lng: -9.053};

        map = new google.maps.Map(document.getElementById('mapDiv'), {
          center: galway,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: galway,
          radius: 500,
          type: [placeType]
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
  
        
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

ko.applyBindings(viewModel);