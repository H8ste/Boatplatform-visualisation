import { Component, OnInit, ViewChild } from "@angular/core";
import { MapMarker, GoogleMap } from "@angular/google-maps";
import { MapsAPILoader } from "@agm/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

interface Position {
  coordinate?: { x: number; y: number };
  lat: number;
  lng: number;
}

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapMarker, { static: false }) marker: MapMarker;
  console = console;
  title = "My first AGM project";
  showmap = true;
  showimu = true;
  showcompass = true;
  imudegree = [0, 0, 0];
  compassdegree = 0;

  public latitude: number;
  public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public polyline: Array<any>;
  public polylines: Array<any>;
  options: google.maps.MapOptions = {
    mapTypeId: "hybrid",
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true
  };
  pushVariable = 0.002;

  elementToReadFrom = 0;

  constructor(private mapsAPILoader: MapsAPILoader, private http: HttpClient) {}

  ngOnInit() {
    if (this.showmap) {
      //set google maps defaults
      this.zoom = 3;
      this.maxSpeed = 40;
      this.latitude = 21.291;
      this.longitude = -122.214;

      this.polyline = [];
      this.polylines = this.rebuildPolylines();

      //set initial position (predetermined)
      this.setInitialCenterPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {});
    }
    if (this.showimu) {
    }
    setInterval(() => {
      this.checkForNewDataBaseContent();
    }, 500);
  }
  private checkForNewDataBaseContent() {
    //No entries exist on front-end
    if (this.polyline.length === 0) {
      this.http
        .get("http://localhost:3000/boatInitial")
        .subscribe((response: any) => {
          this.elementToReadFrom++;
          console.log("Initial point from database was found");
          this.addPositionToMaps(
            Number(response.data.gps.latitude),
            Number(response.data.gps.longitude)
          );
          this.imudegree = [
            this.map_range(response.data.imu.orientation.x, -1, 1, -180, 180),
            this.map_range(response.data.imu.orientation.y, -1, 1, -180, 180),
            this.map_range(response.data.imu.orientation.z, -1, 1, -180, 180)
          ];
          console.log(response.data);
          console.log(
            this.calculateHeading(
              response.data.mag.x,
              response.data.mag.y,
              response.data.mag.z
            ).heading
          );
        });
    } else {
      //Some entries exist on front-end
      this.http
        .get("http://localhost:3000/boatRecent/" + this.elementToReadFrom)
        .subscribe((response: any) => {
          this.elementToReadFrom = response.dbCount;
          response.data.forEach(element => {
            this.addPositionToMaps(
              Number(element.gps.latitude),
              Number(element.gps.longitude)
            );
          });
          if (!response.data) {
            console.log("No new points were found");
          } else if (response.data.length === 1) {
            console.log("1 new data point was found");
          } else if (response.data.length > 1) {
            console.log(response.data.length + " new data points were found");
          }
          //Remapping imu inputs [x,y,z] from -1 to 1 -> -180 to 180
          this.imudegree = [
            this.map_range(
              response.data[response.data.length - 1].imu.orientation.x,
              -1,
              1,
              -180,
              180
            ),
            this.map_range(
              response.data[response.data.length - 1].imu.orientation.y,
              -1,
              1,
              -180,
              180
            ),
            this.map_range(
              response.data[response.data.length - 1].imu.orientation.z,
              -1,
              1,
              -180,
              180
            )
          ];
          console.log(response.data[response.data.length - 1]);
          console.log(
            "Calculated heading: " +
              this.calculateHeading(
                response.data[response.data.length - 1].mag.x,
                response.data[response.data.length - 1].mag.y,
                response.data[response.data.length - 1].mag.z
              ).heading
          );
        });
    }
  }
  private calculateHeading(gaussX: number, gaussY: number, gaussZ) {
    //computing the real Gauss value for x and y axis
    //
    // const xGaussData = gaussX * 0.48828125;
    // const D = Math.atan2(gaussY, gaussX);
    let D = null;
    let heading = null;
    // const yGaussData = gaussY * 0.48828125;
    if (gaussY > 0) {
      D = 90 - (Math.atan2(gaussX, gaussY) * 180) / Math.PI;
    }
    if (gaussY < 0) {
      D = 270 - (Math.atan2(gaussX, gaussY) * 180) / Math.PI;
    }
    if (gaussY === 0 && gaussX < 0) {
      D = 180;
    }
    if (gaussY === 0 && gaussX > 0) {
      D = 0;
    }

    // const D = Math.atan(xGaussData / yGaussData) * (180 / Math.PI);
    if (D > 337.25 || D < 22.5) {
      heading = "North";
    }
    if (D > 292.5 && D <= 337.26) {
      heading = "North - West";
    }
    if (D > 247.5 && D <= 292.5) {
      heading = "West";
    }
    if (D > 202.5 && D <= 247.5) {
      heading = "South - West";
    }
    if (D > 157.5 && D <= 202.5) {
      heading = "South";
    }
    if (D > 112.5 && D <= 157.5) {
      heading = "South - East";
    }
    if (D > 67.5 && D <= 112.5) {
      heading = "East";
    }
    if (D > 22.5 && D <= 67.5) {
      heading = "North - East";
    }
    console.log("computed heading: " + heading);
    console.log("computed direction: " + D);
    return { heading: heading, degree: D };
  }
  private map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }
  private addPositionToMaps(lat: number, lng: number) {
    this.polyline.push({
      latitude: lat,
      longitude: lng,
      //random speed is added so each polyline has a different speed
      //if speed is the same, maps will draw the lines as a single line
      speed: Math.random() * 20
    });
    this.polylines = this.rebuildPolylines();
    this.latitude = lat;
    this.longitude = lng;
    this.zoom = 12;
  }
  private rebuildPolylines() {
    let polylines = [];
    let i = 0;
    let newPolyline = { path: [], color: "blue" };
    for (let point of this.polyline) {
      newPolyline.path.push(point);
      if (true) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: "blue" };
      }
      i++;
    }
    return polylines;
  }
  private setInitialCenterPosition() {
    this.latitude = 57.04852543641185;
    this.longitude = 9.93041723613863;
    this.zoom = 12;
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
    this.latitude = newPosition.lat;
    this.longitude = newPosition.lng;
    this.zoom = 12;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {});
  }
}
