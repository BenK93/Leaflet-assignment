export interface Layer {
  name: string;
  id:number;
  minScale:number;
  maxScale:number;
  layerIcon: LayerIcon;
}

export interface LayerIcon{
  bars: any;
  css: any;
  outline: any;
  type: any;
}
