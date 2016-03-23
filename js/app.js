/* Knockoutjs - Udacity project no. 6 - Neighbourhood map */
$(document).ready(function() {
     
var mapOptions = {
    center: new google.maps.LatLng(53.273949, -9.050516),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
  
//Determines if markers should be visible
//This function is passed in the knockout viewModel function
function setAllMap() {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].showMe === true) {
    markers[i].holdMarker.setMap(map);
    } else {
    markers[i].holdMarker.setMap(null);
    }
  }
}
    
    //Provides information for the markers
var markers = [
    {   
    title: "The Kings Head",
    lat: 53.272401, 
    lng: -9.053328,
    description: "17th century pub with nightly live music!",
    visible: ko.observable(true),
    showMe: true
    },
    {   
    title: "The Quays",
    lat: 53.271354, 
    lng: -9.053933,
    description: "Unique pub with medieval church fittings.",
    visible: ko.observable(true),
    showMe: true
    },
    {   
    title: "O'Connells",
    lat: 53.274809, 
    lng: -9.048338,
    description: "Right there on Eyre Square.",
    visible: ko.observable(true),
    showMe: true
    },
    {   
    title: "The Skeffington Arms",
    lat: 53.274256, 
    lng: -9.049885,
    description: "The student pub of Galway City!",
    visible: ko.observable(true),
    showMe: true
    }];

setMarkers(markers);

setAllMap();

//Sets the markers on the map within the initialize function
//Sets the infoWindows to each individual marker
//The markers are inidividually set using a for loop
function setMarkers(location) {
    
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,25,-40,-25,1],
            type: 'poly'
          }  
        });

        //Binds infoWindow content to each marker
        location[i].contentString = location[i].title + '</strong><br><p>' + location[i].description + '<br>' + '</p>';

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });

        //Click marker to view infoWindow
            //zoom in and center location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
          }; 
        })(location[i].holdMarker, i));
    }
}
    
    
//Knockout ViewModel

var viewModel = {
    query: ko.observable('')
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.showMe = true;
            return marker.visible(true);
        } else {
            marker.showMe = false;
            setAllMap();
            return marker.visible(false);
        }
    });       
}, viewModel);


ko.applyBindings(viewModel);
    
});