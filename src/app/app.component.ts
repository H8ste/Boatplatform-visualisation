import { Component, ViewChild, ElementRef, QueryList, ViewChildren, Directive, Input, ContentChild } from '@angular/core';
// import { AgmMap } from '@agm/core/directives/map'
interface Position {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  // @ContentChild(AgmMap, {static:false}) contentChildren !: QueryList<AgmMap>;
  // @ViewChild("marker",{static: false}) markerElement: ElementRef;
  title = 'My first AGM project';
  map_center:Position = {lat:57.056188899999995,lng:9.9300977};
  marker:Position = {lat:57.056188899999995,lng:9.9300977};
  zoom = 14;
  previousPositions:Position[] = []
  pushVariable = 0.002;

  constructor() {
    this.previousPositions.push(this.marker);
  }

  up() {
    let newPosition = this.marker;
    newPosition = {lat: newPosition.lat + this.pushVariable, lng: newPosition.lng}
    this.previousPositions.push(this.marker);
    this.repositionMarker(newPosition);
  }
  right() {
    let newPosition = this.marker;
    newPosition = {lat: newPosition.lat, lng: newPosition.lng + this.pushVariable}
    this.previousPositions.push(this.marker);
    this.repositionMarker(newPosition);
  }
  down() {
    let newPosition = this.marker;
    newPosition = {lat: newPosition.lat - this.pushVariable, lng: newPosition.lng}
    this.previousPositions.push(this.marker);
    this.repositionMarker(newPosition);
  }
  left() {
    let newPosition = this.marker;
    newPosition = {lat: newPosition.lat, lng: newPosition.lng - this.pushVariable}
    this.previousPositions.push(this.marker);
    this.repositionMarker(newPosition);
  }

  
  repositionMarker(newPos:Position){
    // let test = document.getElementById("myDiv").getBoundingClientRect();
    //get current marker x,y position
    // console.log(test)
    //save that position into array
    console.log('oof');
    //  console.log(this.contentChildren)
    this.marker = newPos;
    console.log(this.previousPositions)
  }
}