import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { } from '@types/googlemaps';

import { QueryService } from "./query.service";

const gMapUrl = '/load-gmap.js';
const hMapurl = '/load-zipmap.js';

declare var $ :any;

@Injectable()
export class HomeService{
    constructor(private httpClient:HttpClient,
                private queryService:QueryService){ 

                }

    data :any;
    userList = new Array();
    count:number;
    jCount:number;
    column= new Array();    
    selectedCubes: any;
    availableCubes=[];


    getProductStatus(filterVar:any,filterLocationVar:any, filterType:string){
        var filterValues = '';
        var filterLocationValues = '';
        var filterCondition = '';
        if(filterVar && filterVar.length > 0){
            filterVar.forEach(e => {
                filterValues = filterValues ? ',[postcode].[postcode].['+e+']' : '[postcode].[postcode].['+e+']';
            }); 
        }
        if(filterLocationVar && filterLocationVar.length > 0){
            filterLocationVar.forEach(e => {
                filterLocationValues = filterLocationValues ? ',[coordinates].[coordinates].['+e+']' : '[coordinates].[coordinates].['+e+']';
                
            }); 
        }
        if(filterType == 'location'){
                filterCondition = filterValues? 'WHERE CrossJoin({' + filterValues + '}, {' + filterLocationValues + '})'
                                :'WHERE{' + filterLocationValues + '}';         
           
        }else{
            filterCondition = 'WHERE{' + filterValues + '}';
        }
        const rowValues = '[Measures].[level_1_id], [Measures].[level_2_id], [Measures].[level_3_id]';
        const columnValues = '[quote_status].[quote_status].[quote_status].Members';
        return this.queryService.getQueryDetails('Product', rowValues, columnValues, filterCondition);
    }

    getCategoryDetails(rows:any, filterLocationVar:any, filterType:string){
        let whereFilter='';
        let filterVals = '';     
        let filterLocationValues = '';
        let rowValues = '';
        if(rows && rows.length>0) {
            rows.forEach(e => {      
                rowValues += rowValues? ',[postcode].[postcode].['+e+']' : '[postcode].[postcode].['+e+']';
                               
            });
        }else{                  
            rowValues = '[postcode].[postcode].[postcode].Members';                       
        }
        whereFilter ='WHERE {[quote_status].[quote_status].[POLICY]}'; 
        if(filterLocationVar && filterLocationVar.length>0){
            filterLocationVar.forEach(e => {
                filterVals = filterVals ? ',[coordinates].[coordinates].['+e+']' : '[coordinates].[coordinates].['+e+']';
            }); 
            whereFilter = 'WHERE CrossJoin({' + filterVals + '}, {[quote_status].[quote_status].[POLICY]})';   
        }        
        const columnValues='[Measures].[Category3], [Measures].[Category4], [Measures].[Category5]';
        
        return this.queryService.getQueryDetails('Category', rowValues, columnValues, whereFilter); 
    }

    getLevelDetails(rows:any, filterLocationVar:any, filterType:string){ 
        let whereFilter='';
        let filterVals = '';  
        let rowValues = '';
        if(rows && rows.length > 0 )  {
            rows.forEach(e => {      
                rowValues += rowValues? ',[postcode].[postcode].['+e+']' : '[postcode].[postcode].['+e+']';
                               
            });
        }else{                 
            rowValues = '[postcode].[postcode].[postcode].Members'; 
        }
        whereFilter ='WHERE {[quote_status].[quote_status].[POLICY]}'; 
        if(filterLocationVar && filterLocationVar.length > 0 ){
            filterLocationVar.forEach(e => {
                filterVals = filterVals ? ',[coordinates].[coordinates].['+e+']' : '[coordinates].[coordinates].['+e+']';
            }); 
            whereFilter = 'WHERE CrossJoin({' + filterVals + '}, {[quote_status].[quote_status].[POLICY]})';   
        }  
        const columnValues = '[Measures].[level_1_id], [Measures].[level_2_id], [Measures].[level_3_id]';
        return this.queryService.getQueryDetails('Level', rowValues, columnValues, whereFilter);
    }

    getCommissionDetails(filterVar:any, filterLocationVar:any, filterType:string){
        var filterValues = '';
        var filterLocationValues = '';
        var filterCondition = '';
        if(filterVar){
            filterVar.forEach(e => {
                filterValues = filterValues ? ',[postcode].[postcode].['+e+']' : '[postcode].[postcode].['+e+']';
            }); 
        }
        if(filterLocationVar){
            filterLocationVar.forEach(e => {
                filterLocationValues = filterLocationValues ? ',[coordinates].[coordinates].['+e+']' : '[coordinates].[coordinates].['+e+']';
                
            }); 
        }
        if(filterType == 'location'){
                filterCondition = filterValues? 'WHERE CrossJoin({' + filterValues + '}, {' + filterLocationValues + '})'
                                :'WHERE{' + filterLocationValues + '}';         
           
        }else{
            filterCondition = 'WHERE{' + filterValues + '}';
        }
        const rowValues = '[Policy Bound_date].[Weekly].[Month-Year].Members';
        const columnValues = '[Measures].[Quote Count], [Measures].[Commission]';
        return this.queryService.getQueryDetails('Commission', rowValues, columnValues, filterCondition);
    }    

    getFormattedData(data:JSON){
        this.data = [];
        this.data = data;
         this.count = 1;
         this.column = [];
         this.userList=[];
         if( data && this.data.length>0){
            this.data[0].forEach(element=>{
                this.column.push(element.value);
              })
              while(this.count < this.data.length){
                const newData = new Array();
                 this.jCount = 0;
                this.data[this.count].forEach(element => {          
                   newData[this.column[this.jCount]]=element.value;
                   this.jCount++;
                });
                this.userList.push(newData);
               this.count++;
              }
         }
         return this.userList;
    }
    getFormattedColumns(data:JSON){
        this.data = [];
        this.data = data;
         this.count = 1;
         let newData=[];
         if( data && this.data.length>0){
            while(this.count < this.data.length){               
                this.data[this.count].forEach(element => {          
                    newData.push(element.value);                   
                 });
                 this.count++;
            }
         }
         return newData;
    }

    getZipcodeList(zipcode:string){
        return this.queryService.getItemListQuery(zipcode,'ZipcodeList','');
    }

    getMapDetails(){
        return this.queryService.getWithMemberQuery('Mapdetails','WHERE {[quote_status].[quote_status].[POLICY]}');
    }

    getLevelForMap(level:number, zipcode:string){ 
        let whereFilter;
        const columnValues = '[quote_premiums_level_'+level+'_level_status].[quote_premiums_level_'+level+'_level_status].[active]';
        const rowValues = '[coordinates].[coordinates].[coordinates].Members'; 
        if(zipcode){
            whereFilter = 'WHERE CrossJoin({[quote_status].[quote_status].[POLICY]}, {[postcode].[postcode].['+zipcode+']})';
        }else{
            whereFilter = 'WHERE {[quote_status].[quote_status].[POLICY]}';
        }
        return this.queryService.getQueryDetails('Level'+level, rowValues, columnValues, whereFilter);
  
    }

    loadHeatMap(){
        // console.log('preparing to load Zipmap...')
        let node = document.createElement('script');
        node.src = hMapurl;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    loadLocationMap(){
        var locations1 = [];
        var locations2 = [];
        var locations3 = [];
        var locations = [];
        locations1 = this.formatLevelData(1);
        locations2 = this.formatLevelData(2);
        locations3 = this.formatLevelData(3);
        locations = locations2.concat(locations3);
        locations = locations1.concat(locations);
        var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
        var icons = [
        iconURLPrefix + 'red-dot.png',
        iconURLPrefix + 'green-dot.png',
        iconURLPrefix + 'blue-dot.png',
        ]
        var iconsLength = icons.length;
        var map = new google.maps.Map(document.getElementById('mapCanvas2'), {
        center: new google.maps.LatLng(25.9776729, -80.14232410000001),
        zoom:5,  
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false
        });  
        let infowindow = new google.maps.InfoWindow({
        maxWidth: 160
        });  
        var markers = new Array();
    
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
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
            $('.locationFilter').html(locations[i][1]+':'+locations[i][2]);
            $('.locationFilter').click();
            }
        })(marker, i));
        var opt = { minZoom: 4, maxZoom: 10 };
        map.setOptions(opt);   
        } 
        //  Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds();
        //  Go through each...
        for (var i = 0; i < markers.length; i++) {  
            bounds.extend(markers[i].position);
        }
        //  Fit these bounds to the map
        map.fitBounds(bounds); 
    }


  formatLevelData(levelCount){
    let levelVal = '';
    levelVal = $('#level'+levelCount).html();
    var locations=[];
    if(levelVal){
      var levelArray = levelVal.split(",");
      levelArray.forEach(function(e) {
      var x = e.split(":");
        // Define your locations: HTML content for the info window, latitude, longitude, level
      locations.push(['<h4>Level'+levelCount+'</h4>', x[0], x[1],levelCount-1])
    })
    }
    return locations;
  }

  

    
}