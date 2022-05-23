import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
// @ts-ignore
import {JSITM} from '../../utils/js-itm.js'
// @ts-ignore
import {Map, Control, DomUtil, ZoomAnimEvent, MapOptions, tileLayer, latLng, LeafletEvent} from 'leaflet';
import {GetLayersService} from "../../services/get-layers.service";
import {Layer} from "../../interfaces/layer";


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  mapsStyle = {
    Default: tileLayer('https://api.mapbox.com/styles/v1/yemimatamir/cl2mwrnt3004s14l4kyk7h6iw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWVtaW1hdGFtaXIiLCJhIjoiY2wxNTE0OWxuMHdvMjNkczBveDJqMXFhYiJ9.8gQoryAW-JiF4JsRmZiVUw', {
      id: 'ud-baselayer-default',
      maxZoom: 22,
    }),
  };
  options: MapOptions = {
    layers: [
      this.mapsStyle.Default
    ],
    zoom: 14,
    center: latLng(32.04, 34.80)
  };
  public map: any;
  chosenLayers: Layer[] = [];
  layersOnMap :any;
  public width?: number;
  public height?: number;
  public zoom: any;

  constructor(private layersServices: GetLayersService) {
  }

  ngOnInit(): void {

    this.subscription()
  }

  subscription() {
    this.layersServices.chosenLayers.subscribe(chosenLayers => {
      this.chosenLayers = chosenLayers
      this.addLayersToMap()
    })
  }

  addLayersToMap() {
    const layersArrayString = this.concatenateLayers()
    const bbox = this.calculateBBox()
    console.log(bbox)
    if(layersArrayString){
      if(this.layersOnMap){
        this.map.removeLayer(this.layersOnMap)
      }
      // this.layersOnMap = this.map.addLayer()
      const southEast = this.map.getBounds().getSouthEast()
      const northWest = this.map.getBounds().getNorthWest()
      this.layersOnMap = L.imageOverlay(
        `https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=${layersArrayString}&dpi=96&transparent=true&format=png32&layers=show%3A39&` +
        `bbox=${bbox}&bboxSR=2039&imageSR=2039&` +
        `size=${this.width},${this.height}&f=image`,
        [southEast, northWest],).addTo(this.map)
    }
  }

  calculateBBox(): string{
    const bbox = this.map.getBounds().toBBoxString().split(',')
    const itm1 = JSITM.gpsRef2itmRef(bbox[1] + " " + bbox[0]).split(' ')
    const itm2 = JSITM.gpsRef2itmRef(bbox[3] + " " + bbox[2]).split(' ')
    return itm1.concat(itm2).join(',');
  }

  concatenateLayers(): string {
    let stringLayers = []
    for(const layer of this.chosenLayers){
      const tempObject = {
        id: layer.id,
        name: layer.name,
        source: {
          type: 'mapLayer',
          mapLayerId:layer.id,
        },
        minScale: layer.minScale,
        maxScale: layer.maxScale,
      }
      stringLayers.push(tempObject)
    }
    return JSON.stringify(stringLayers)
  }

  ngOnDestroy() {
    // this.map.clearAllEventListeners;
    // this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    // @ts-ignore
    this.width = map.getSize().x
    // @ts-ignore
    this.height = map.getSize().y;
    this.zoom = map.getZoom();
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    const mapSize = this.map.getSize()
    // @ts-ignore
    this.width = mapSize.x
    // @ts-ignore
    this.height = mapSize.y;
    console.log(this.map.getBounds().getNorthEast())
    console.log(this.map.getBounds().getSouth())
    console.log(this.map.getBounds().getNorth())
  }

}
