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
  winddegree = 0;
  viewType: any = "satellite"; //for default 'hybrid'

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
      console.log("looking for initial point");
      this.http
        .get("http://localhost:3001/boatInitial/" + this.elementToReadFrom)
        .subscribe((response: any) => {
          this.elementToReadFrom++;
          console.log("Initial point from database was found");
          console.log(response);
          if (
            Number(response.data.gps.latitude) > 55 &&
            Number(response.data.gps.latitude < 59) &&
            Number(response.data.gps.longitude > 6)
          ) {
            this.addPositionToMaps(
              Number(response.data.gps.latitude),
              Number(response.data.gps.longitude)
            );
            this.imudegree = [
              this.map_range(response.data.imu.orientation.x, -1, 1, -180, 180),
              this.map_range(response.data.imu.orientation.y, -1, 1, -180, 180),
              this.map_range(response.data.imu.orientation.z, -1, 1, -180, 180)
            ];
          }
        });
    } else {
      //Some entries exist on front-end
      this.http
        .get(
          "http://localhost:3001/boatRecent/" +
            this.elementToReadFrom.toString()
        )
        .subscribe((response: any) => {
          this.elementToReadFrom = response.dbCount;
          response.data.forEach(element => {
            if (
              Number(element.gps.latitude) > 55 &&
              Number(element.gps.latitude < 59) &&
              Number(element.gps.longitude > 6)
            ) {
              this.addPositionToMaps(
                Number(element.gps.latitude),
                Number(element.gps.longitude)
              );
            }
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
        });
    }
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
}
