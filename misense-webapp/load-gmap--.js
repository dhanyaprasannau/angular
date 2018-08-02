$(function () {
  var locations1=[];
  var locations2=[];
  var locations3=[];
  var locations = [];
   locations1 = formatLevelData(1);
   locations2=formatLevelData(2);
    locations3=formatLevelData(3);
    locations = locations2.concat(locations3);
    locations = locations1.concat(locations);
  // Setup the different icons and shadows
    var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
  // var iconURLPrefix = '/assets/images/';
// console.log(locations2);
  var icons = [
    iconURLPrefix + 'red-dot.png',
    iconURLPrefix + 'green-dot.png',
    iconURLPrefix + 'blue-dot.png',
  ]
  var iconsLength = icons.length;

  var map = new google.maps.Map(document.getElementById('mapCanvas2'), {
    center: new google.maps.LatLng(25.8617959, -80.2117923),
    zoom:5,  
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    // panControl: false,
    // zoomControlOptions: {
    //    position: google.maps.ControlPosition.LEFT_BOTTOM
    // }
    
  });

  var infowindow = new google.maps.InfoWindow({
    maxWidth: 160
  });

  var markers = new Array();

  var iconCounter = 0;

  // Add the markers and infowindows to the map
  for (var i = 0; i < locations.length; i++) {  
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: icons[locations[i][3]]
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
          //  alert("googlemap");
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
        $('.locationFilter').html(locations[i][1]+':'+locations[i][2]);
        $('.locationFilter').click();
      }
    })(marker, i));
    // var opt = { minZoom: 6, maxZoom: 10 };
    // map.setOptions(opt);
    iconCounter++;
    // We only have a limited number of possible icon colors, so we may have to restart the counter
    if(iconCounter >= iconsLength) {
      iconCounter = 0;
    }
  }

  function autoCenter() {
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();
    //  Go through each...
    for (var i = 0; i < markers.length; i++) {  
              bounds.extend(markers[i].position);
    }
    //  Fit these bounds to the map
    map.fitBounds(bounds);
  }
  autoCenter();

  function formatLevelData(levelCount){
    var levelVal='';
    levelVal = $('#level'+levelCount).html();
    var locations=[];
    if(levelVal){
      var levelArray = levelVal.split(",");
      levelArray.forEach(function(e) {
      var x = e.split(":");
        // Define your locations: HTML content for the info window, latitude, longitude
      locations.push(['<h4>Level'+levelCount+'</h4>', x[0], x[1],levelCount-1])
    })
    }
    return locations;
  }
});
