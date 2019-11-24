import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";
import { GoogleMapsModule } from "@angular/google-maps";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ""
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
