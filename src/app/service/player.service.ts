import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../models/song.model';
import { SongPlay } from '../models/song.play.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  private currentSongSource = new BehaviorSubject<SongPlay | null>(null);
  currentSong$ = this.currentSongSource.asObservable();


  private queue: Song[] = [];

  SendSong(song:Song){
    const songFromUser: SongPlay ={
          id : song.id,
          name : song.name,
          artist : song.artist,
          length : song.length,
          duration : song.duration
    }
    this.currentSongSource.next(songFromUser);
  }

  AddToQueue(song:Song){
    this.queue.push(song);
  }

  getQueue() :Song[] {
      return this.queue;
  }

  playNext(){
    // const nextSong = this.queue.shift();
    // if(nextSong){
    //   this.playSong(nextSong);
    // }
  }

}
