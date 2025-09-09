import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOperationsService {

  constructor() { }

  addNewArtist(artist:Artist[]){
    this.addArtists.next(artist);
  }


  private addArtists = new BehaviorSubject<Artist[]>([]);
  addedArtist$ = this.addArtists.asObservable();

}
