$(function () {
  var layer;
     setTimeout(initMap, 1000)
  //  initMap();
  function initMap() {    
    var map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(25.8617959, -80.2117923),
      zoom: 10,    
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
    });
    var zipcodesVal = $('#zipcodes').html();
    var zipcodeArray = zipcodesVal.split(",");
    var zipcodes = '';
    var zipcodes25 = '00000';
    var zipcodes50 = '00000';
    var zipcodes75 = '00000';
    var zipcodes100 = '00000';
    var x25='';
    var x50 = '';
    var x75 = '';
    var x100 = '';
    zipcodeArray.forEach(e=>{
      const zipSubArray = e.split(":");
      if(zipSubArray[0]!='#null' && zipSubArray[1]){
        zipcodes += zipcodes?','+zipSubArray[0]:zipSubArray[0];
        const quotesPercentage = zipSubArray[1].replace('%','');
        if(quotesPercentage>0 && quotesPercentage<=25){
           x25+=','+quotesPercentage;
          zipcodes25 += zipcodes25?','+zipSubArray[0]:zipSubArray[0];
        }
        if(quotesPercentage>25 && quotesPercentage<=50){
          x50+=','+quotesPercentage;
          zipcodes50 += zipcodes50?','+zipSubArray[0]:zipSubArray[0];
        }
        if(quotesPercentage>50 && quotesPercentage<=75){
          x75+=','+quotesPercentage;
          zipcodes75 += zipcodes75?','+zipSubArray[0]:zipSubArray[0];
        }
        if(quotesPercentage>75){
          x100+=','+quotesPercentage;
          zipcodes100 += zipcodes100?','+zipSubArray[0]:zipSubArray[0];
        }
      }
     
    })

    layer = new google.maps.FusionTablesLayer({
      query: {
        select: 'geometry',
         from: '1SgRUeXQa2mGPKnmnlPuHzZSZ5o6r_AjydZpHzYir',
         where: 'ZIP IN ('+zipcodes+')'
      },
      styles: [ {
        where: 'ZIP IN ('+zipcodes25+')',
        polygonOptions: {//Green
          fillColor: '#008000',
          fillOpacity: 0.5,
          strokeColor:'#008000'
        }
      }, {
        where: 'ZIP IN ('+zipcodes50+')',
        polygonOptions: {//Yellow
          fillColor: '#FFFF00',
          fillOpacity: 0.5,
          strokeColor:'#FFFF00'
        }
      }, {
        where:'ZIP IN ('+zipcodes75+')',
        polygonOptions: {//Orange
          fillColor: '#FFA500',
          fillOpacity:0.5,
          strokeColor:'#FFA500'
        }
      }, {
        where:'ZIP IN ('+zipcodes100+')',
        polygonOptions: {
          fillColor: '#FF0000',
          fillOpacity: 0.5,
          strokeColor:'#FF0000'
        }
      }]
    });
    layer.setMap(map);
    var opt = { minZoom: 6, maxZoom: 12 };
    map.setOptions(opt);
    var infoWindow = new google.maps.InfoWindow(); 

    google.maps.event.addListener(layer, 'click', function(event) {
       infoWindow.setOptions({
        content: event.infoWindowHtml,
        position: event.latLng,
        pixelOffset: event.pixelOffset
      });
      infoWindow.open(map);
      layer.set("styles", [{
        where: 'ZIP IN ('+zipcodes25+')',
        polygonOptions: {
          fillColor: '#008000',
          fillOpacity: 0.5,
          strokeColor:'#008000'
        }
      }, {
        where: 'ZIP IN ('+zipcodes50+')',
        polygonOptions: {
          fillColor: '#FFFF00',
          fillOpacity: 0.5,
          strokeColor:'#FFFF00'
        }
      }, {
        where:'ZIP IN ('+zipcodes75+')',
        polygonOptions: {
          fillColor: '#FFA500',
          fillOpacity:0.5,
          strokeColor:'#FFA500'
        }
      }, {
        where:'ZIP IN ('+zipcodes100+')',
        polygonOptions: {
          fillColor: '#FF0000',
          fillOpacity: 0.5,
          strokeColor:'#FF0000'
        }
      },{
        where: 'ZIP ='+event.row.ZIP.value,
        polygonOptions: {
          fillOpacity: 1,
          strokeColor:'#000000'
        }
      }]);
      $('.mapSection').html(event.row.ZIP.value);
      $('.mapSection').click();
    });

  }   
});

