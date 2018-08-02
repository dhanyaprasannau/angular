import { Component, OnInit } from '@angular/core';

const url = '/load-zipmap.js';
@Component({
  selector: 'app-zipcode-map',
  templateUrl: './zipcode-map.component.html',
  styleUrls: ['./zipcode-map.component.css']
})
export class ZipcodeMapComponent implements OnInit {
  loadMap: Promise<any>
  constructor() { }

  ngOnInit() {
    // this.loadMap = new Promise((resolve)=>{
    //   this.loadHeatMap();
    // })
  }
  loadHeatMap(){
    // console.log('preparing to load Zipmap...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}

}
