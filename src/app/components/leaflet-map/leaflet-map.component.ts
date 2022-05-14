import { Component, OnInit } from '@angular/core';

// @ts-ignore
import {Map, Control, DomUtil, ZoomAnimEvent, Layer, MapOptions, tileLayer, latLng, LeafletEvent} from 'leaflet';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  options: MapOptions= {
    layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.9,
      maxZoom: 18,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom:14,
    center:latLng(32.08,34.78)
  };
  public map: any;
  public zoom: any;
  constructor() { }

  ngOnInit(): void {
    // this.map =  L.map('map').setView([51.505, -0.09], 13);
  }
  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.zoom = map.getZoom();
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
  }

}
