import { Component, OnInit } from '@angular/core';
import {GetLayersService} from "../../services/get-layers.service";
import {Layer} from "../../interfaces/layer";

@Component({
  selector: 'app-layers-menu',
  templateUrl: './layers-menu.component.html',
  styleUrls: ['./layers-menu.component.css']
})
export class LayersMenuComponent implements OnInit {

  layers: Layer[] = [];
  chosenLayers: Layer[] = [];

  constructor(private layersService: GetLayersService) { }

  ngOnInit() {
    this.myInit()
    this.subscriptions()
  }

  subscriptions() {
    this.layersService.chosenLayers.subscribe(chosenLayers => {
      this.chosenLayers = chosenLayers
    })
  }

  async myInit() {
    try{
      const response = await this.layersService.getLayersNames()
      const layers = response.data['שכבות ממשלה ומוסדות ציבור'].layers
      for (const layer in layers){
        const currentLayer:Layer = {
          name: layers[layer].caption,
          id: layers[layer].layerID,
          minScale: layers[layer].minScale,
          maxScale: layers[layer].maxScale,
          layerIcon: layers[layer].layerIcon,
        }
        this.layers.push(currentLayer)
      }
    }catch (e) {
      console.log(e)
    }
  }

  choseLayer(layersIds: string[]): void {
    this.layersService.changeChosenLayers(layersIds, this.layers)
  }
}
