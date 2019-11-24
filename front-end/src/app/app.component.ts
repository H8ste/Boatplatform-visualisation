import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  NgZone
} from "@angular/core";
import { MapInfoWindow, MapMarker, GoogleMap } from "@angular/google-maps";
import { MapsAPILoader } from "@agm/core";

interface Position {
  coordinate?: { x: number; y: number };
  lat: number;
  lng: number;
}
interface LineSVG {
  point1?: Position;
  point2?: Position;
}

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapMarker, { static: false }) marker: MapMarker;
  title = "My first AGM project";
  public latitude: number;
  public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public polyline: Array<any>;
  public polylines: Array<any>;
  // zoom = 14;
  options: google.maps.MapOptions = {
    mapTypeId: "hybrid",
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true
  };
  pushVariable = 0.002;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 3;
    this.maxSpeed = 40;
    this.latitude = 21.291;
    this.longitude = -122.214;

    this.polyline = [];
    this.polylines = this.rebuildPolylines();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {});
  }
  private rebuildPolylines() {
    let polylines = [];
    let i = 0;
    let newPolyline = { path: [], color: "blue" };
    for (let point of this.polyline) {
      console.log(point);
      newPolyline.path.push(point);
      // const speedChanged =
      //   (this.polyline[i + 1] &&
      //     point.speed < this.maxSpeed &&
      //     this.polyline[i + 1].speed < this.maxSpeed) ||
      //   (point.speed > this.maxSpeed &&
      //     this.polyline[i + 1].speed > this.maxSpeed);
      // if (point.speed > this.maxSpeed) {
      //   newPolyline.color = "red";
      // }
      if (true) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: "blue" };
      }
      i++;
    }
    console.log(polylines);
    return polylines;
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.polyline.push({
          latitude: this.latitude,
          longitude: this.longitude,
          speed: Math.random() * 10
        });
      });
    }
  }
  moveMarkerManually(direction: string, amount: number) {
    //CODE FOR DEBUG, WE JUST GET LON,LAT FROM SERVER
    let newPosition: Position = { lat: this.latitude, lng: this.longitude };
    switch (direction) {
      case "up":
        newPosition = {
          lat: newPosition.lat + this.pushVariable,
          lng: newPosition.lng
        };
        break;
      case "right":
        newPosition = {
          lat: newPosition.lat,
          lng: newPosition.lng + this.pushVariable
        };
        break;
      case "down":
        newPosition = {
          lat: newPosition.lat - this.pushVariable,
          lng: newPosition.lng
        };
        break;
      //CODE FOR DEBUG, WE JUST GET LON,LAT FROM SERVER
      case "left":
        newPosition = {
          lat: newPosition.lat,
          lng: newPosition.lng - this.pushVariable
        };
        break;
    }
    //CODE FOR DEBUG, WE JUST GET LON,LAT FROM SERVER
    this.polyline.push({
      latitude: newPosition.lat,
      longitude: newPosition.lng,
      speed: Math.random() * 20
    });
    this.polylines = this.rebuildPolylines();
    //set current position
    // this.setCurrentPosition();
    this.latitude = newPosition.lat;
    this.longitude = newPosition.lng;
    this.zoom = 12;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {});
  }
  position_changed() {
    // // this.marker.visibleChanged
    // this.pagewidth = window.innerWidth;
    // // console.log("FROM POSITION CHANGED");
    // // console.log(window.innerWidth);
    // // console.log(this.pagewidth);
    // // console.log(351 / window.innerWidth);
    // // if first time, input manual x,y with provided lat,lng
    // if (this.boatLocations.length < 1) {
    //   this.boatLocations.push({
    //     point1: {
    //       lat: this.marker_position.lat,
    //       lng: this.marker_position.lng,
    //       // lat: this.marker.getPosition().toJSON().lat,
    //       // lng: this.marker.getPosition().toJSON().lng,
    //       coordinate: { x: 912.5, y: 115 }
    //     }
    //   });
    // } else {
    //   const referenceToMarker = document
    //     .getElementById("markerID")
    //     .parentElement.children[0].children[0].children[0].children[0].children[2].children[0].children[2].children[0].getBoundingClientRect();
    //   const obj = {
    //     lat: this.marker.getPosition().toJSON().lat,
    //     lng: this.marker.getPosition().toJSON().lng,
    //     coordinate: {
    //       x: referenceToMarker.left,
    //       y: referenceToMarker.top
    //     }
    //   };
    //   // console.log(referenceToMarker.)
    //   this.boatLocations[this.boatLocations.length - 1].point2 = obj;
    //   this.boatLocations.push({ point1: obj });
    // }
    // console.log(this.boatLocations.length);
    // console.log(this.boatLocations);
    // else
    // this.marker.
    // console.log(
    //   document.getElementById("markeroof").parentElement.children[0].children[0]
    // );
    // console.log(
    //   document
    //     .getElementById("markeroof")
    //     .parentElement.children[0].children[0].children[0].children[0].children[2].children[0].children[2].children[0].getBoundingClientRect()
    // );
    // this.marker.getBoundingClientRect()
    // let prevMarkerRef = document.querySelectorAll("div > img");
    // [0]
    // .getBoundingClientRect();
    // console.log(prevMarkerRef);
    // if (this.boatLocations.length < 1 && !this.boatLocations[0].point1) {
    //   //first time
    //   //missing xy
    //   this.boatLocations.push({
    //     point1: {
    //       lat: this.marker.getPosition().toJSON().lat,
    //       lng: this.marker.getPosition().toJSON().lng
    //     }
    //   });
    // }
  }
  visible_changed() {
    console.log("visually changed");
  }

  repositionMarker(newPos: Position) {
    // this.marker = newPos;
  }

  test(stuffToTest: any) {
    console.log(stuffToTest);
  }
  maptypeid_changed(any: any) {
    console.log("oof");
    console.log(any);
  }
}
