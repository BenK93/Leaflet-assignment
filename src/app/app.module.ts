import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { LayersMenuComponent } from './components/layers-menu/layers-menu.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    LayersMenuComponent,
  ],
  imports: [
    HttpClientModule,
    LeafletModule,
    BrowserModule,
    NzCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
