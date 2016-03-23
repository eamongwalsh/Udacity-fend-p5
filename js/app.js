/* Knockoutjs - Udacity project no. 6 - Neighbourhood map */
$(document).ready(function() {
/* This bit works - basic.... verified API key  */

    var mapOptions = {
        center: new google.maps.LatLng(53.27, -9.053),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
  
    //Create Markers

    var markers = [];

    markers[0] = new google.maps.Marker({
        position: new google.maps.LatLng(53.272401, -9.053328),
        map: map
    });

    markers[1] = new google.maps.Marker({
        position: new google.maps.LatLng(53.271354, -9.053933),
        map: map,
    });

    //Create Infowindows
    
    var infoWindows = [];
    var contentStrings = [];
    
    contentStrings[0] = "<div style='height: 150px; width: 150px;'><img src='http://www.menupages.ie/images/550x344/6053_the%20kings%20head.JPG' height='100' width='100'><p>The Kings Head!</p></div>";
    
    contentStrings[1] = "<div style='height: 150px; width: 150px;'><img src='http://pubsdirect.ie/images/pub_images/360x220/289.jpg' height='100' width='100'><p>The Quays medival pub!</p></div>";

    for (var i = 0; i < contentStrings.length; i++) {
        infoWindows[i] = new google.maps.InfoWindow({
            content: contentStrings[i]
        });
    }
    
    google.maps.event.addListener(markers[0], 'click', function() {
        infoWindows[0].open(map, markers[0]);
    });
 
    google.maps.event.addListener(markers[1], 'click', function() {
        infoWindows[1].open(map, markers[1]);
    });

    function createMarker(latitude, longitude, name) {
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(latitude, longitude)
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(name);
          infowindow.open(map, this);
        });
    }


    var locations = [{
        name: "Kings Head",
        facts: "17th century pub with nightly live music!",
        marker: markers[0],
        lat: 53.272401,
        lon: -9.053328
    }, {
        name: "The Quays",
        facts: "Unique pub with medieval church fittings.",
        marker: markers[1],
        lat: 53.271354,
        lon: -9.053933
    }];

    //Knockout ViewModel

    var viewModel = {
        query: ko.observable('')
    };

    viewModel.locations = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(locations, function(location) {
            return location.name.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);


ko.applyBindings(viewModel);
    
});