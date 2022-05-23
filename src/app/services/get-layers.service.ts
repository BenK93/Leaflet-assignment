import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Layer} from "../interfaces/layer";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetLayersService {
  private baseUrl: string = "https://ags.govmap.gov.il/Layers"
  public chosenLayers: BehaviorSubject<Layer[]>  = new BehaviorSubject<Layer[]>([]);
  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   this.chosenLayers.next([])
  // }

  public async getLayersNames() {
    return await this.http.post<any>(this.baseUrl+'/GetTocLayers', {
    layers:["ATRACTIONS","BUS_STOPS"]},
      ).toPromise();
  }

  public changeChosenLayers(chosenLayersIDS:string[], allLayers: Layer[]){
    const updateChosen = allLayers.filter((l) => chosenLayersIDS.includes(String(l.id)))
    this.chosenLayers.next(updateChosen)
  }
}
