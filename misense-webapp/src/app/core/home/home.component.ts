import { Component, OnInit, ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from '../../auth/auth.service';
import { HomeService } from './home.service';
import {DataTableModule} from "angular-6-datatable";
import { element } from 'protractor';
import { first } from 'rxjs/operators';
import { QueryService } from './query.service';
import { platform } from 'os';
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('mapCanvas2') gmapElement: any;
  map: google.maps.Map;
  productDetails = new Array();
  categoryDetails:any;
  levelDetails:any;
  feeDetails:any;
  commissionDetails: any;
  flag:number;
  res1 :any; res2:any; res3: any; res4: any; res:any;
  zipcodes:any;
  zipcodeDatas:any;
  level1Zipcodes:any;
  level2Zipcodes:any;
  level3Zipcodes:any;
  filterString = new Array();
  filterLocationVal = new Array();
  loadMap: Promise<any>
  loadHeatMap: Promise<any>
  constructor(public authService: AuthService,
  private homeService: HomeService,
  private spinner: NgxSpinnerService) {
   this.flag = 0;
    this.authService.isLogin()
    .subscribe(data=>{
      this.getMapData();
      this.loadMapwithLevels('');      
      this.loadAllCharts('','','postcode');
    },error=>{
      this.spinner.hide();
      this.authService.signout();
    })
   }
 
  ngOnInit() {
    this.spinner.show();
   }

  loadAllCharts(filterVar:any,filterLocationVar:any,filterType:string){
      this.productDetails = [];
      this.categoryDetails = [];
      this.levelDetails = [];
      this.commissionDetails = [];
      this.homeService.getProductStatus(filterVar,filterLocationVar,filterType)
      .pipe(first())
      .subscribe(data=>{
        this.res1 = data; 
        this.productDetails = this.homeService.getFormattedData(this.res1.cellset);
        this.flag++;
        if(this.flag==5){
          this.spinner.hide();
        } 
      },
      error=>{
        console.log("product selection error");
      });

      this.homeService.getCategoryDetails(filterVar,filterLocationVar,filterType)
      .subscribe(data=>{
        this.res2 = data;
        this.categoryDetails = this.homeService.getFormattedData(this.res2.cellset);
        this.flag++;
        if(this.flag==5){
          this.spinner.hide();
        } 
    },
    error=>{
      console.log("category select error");
    });

    this.homeService.getLevelDetails(filterVar, filterLocationVar, filterType)
    .subscribe(data=>{
      this.res3 = data;
      this.levelDetails = this.homeService.getFormattedData(this.res3.cellset);
      this.flag++;
      if(this.flag==5){
        this.spinner.hide();
      }
  },
  error=>{
    console.log("category select error");
  });

  this.homeService.getCommissionDetails(filterVar, filterLocationVar, filterType)
  .subscribe(data=>{
    this.res4 = data;
    this.commissionDetails = this.homeService.getFormattedData(this.res4.cellset);
    this.flag++;
    if(this.flag==5){
      this.spinner.hide();
    }
  },error=>{
    console.log("Error in Commission selection");
  })
  }

 
  filterData(){
    this.spinner.show();
    this.flag = 0;
    if ($('.eventClick').html() == "true")
    {
      if($('.mapSection').html()){
        this.filterString.push ($('.mapSection').html());
      }
    }
    else{
      if($('.mapSection').html()){
        this.filterString=[];
        this.filterString.push ($('.mapSection').html());
      }
    }
     this.loadAllCharts(this.filterString,'','postcode');
     this.loadMapwithLevels($('.mapSection').html());  
  }

  filterByLocation(){
    this.spinner.show();
    this.flag = 1;
    if($('.mapSection').html()){
      this.filterString=[];
      this.filterString.push ($('.mapSection').html());   
    }
    if($('.locationFilter').html()){
      this.filterLocationVal = [];
      this.filterLocationVal.push($('.locationFilter').html());
    }
    this.loadAllCharts(this.filterString,this.filterLocationVal,'location');  
  }

  getZipcodes(){
    const mdxQuery='[postcode].[postcode].[postcode].Members';
    this.homeService.getZipcodeList(mdxQuery)
    .subscribe(data=>{
      this.res = data;
      this.zipcodes = this.homeService.getFormattedColumns(this.res.cellset);
      // console.log(this.zipcodes);

    },error=>{
      console.log("Error Getting Zipcode");
    })
  }

  getMapData(){
    this.zipcodeDatas = '';
    this.homeService.getMapDetails()
    .subscribe(data=>{
      this.res = data;
      this.zipcodes = this.homeService.getFormattedData(this.res.cellset);
      // console.log(this.zipcodes);
     this.zipcodes.forEach(element => {
       if(element.postcode!='#null'){
        this.zipcodeDatas += this.zipcodeDatas ? ','+ element.postcode+':'+element.PercentageOfAll
          : element.postcode+':'+element.PercentageOfAll;
   
       }    
     }
    );
    this.loadHeatMap = new Promise((resolve)=>{
      this.homeService.loadHeatMap();
    })

    },error=>{
      console.log("Error Getting Zipcode");
    })

  }

  loadMapwithLevels(zipcode:string){
    this.level1Zipcodes = '';
    this.level2Zipcodes = '';
    this.level3Zipcodes = '';  
    this.homeService.getLevelForMap(1,zipcode)
    .subscribe(data=>{
      this.res = data;
      let levels;
      levels = this.homeService.getFormattedData(this.res.cellset);
      levels.forEach(e=>{
        if(e.coordinates != '#null'){
            this.level1Zipcodes +=  this.level1Zipcodes ? ','+ e.coordinates : e.coordinates;
                 
        }
      })
      this.homeService.getLevelForMap(2,zipcode)
      .subscribe(data=>{
      this.res = data;
      let levels2;
      levels2 = this.homeService.getFormattedData(this.res.cellset);
      levels2.forEach(e=>{
        if(e.coordinates != '#null'){
            this.level2Zipcodes +=  this.level2Zipcodes ? ','+ e.coordinates : e.coordinates;
        }
      })
      this.homeService.getLevelForMap(3,zipcode)
      .subscribe(data=>{
      this.res = data;
      let levels3;
      levels3 = this.homeService.getFormattedData(this.res.cellset);
      levels3.forEach(e=>{
        if(e.coordinates != '#null'){
            this.level3Zipcodes +=  this.level3Zipcodes ? ','+ e.coordinates : e.coordinates;
        }
      })
        this.loadMap = new Promise((resolve)=>{
          this.homeService.loadLocationMap();
          this.flag++;
          if(this.flag==5){
            this.spinner.hide();
          } 
        })
      })
      })
    })
  }
  
}
