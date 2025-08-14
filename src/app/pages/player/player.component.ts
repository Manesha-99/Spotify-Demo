import { Component, effect, OnInit, signal } from '@angular/core';
import { SongPlay } from '../../models/song.play.model';
import { PlayerService } from '../../service/player.service';
import {DecimalPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-player',
  imports: [NgIf, FormsModule, DecimalPipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {

  songListQueue: SongPlay[] = [];
  now_playSong!: SongPlay;
  songFromUser!: SongPlay

  constructor(private playerService: PlayerService){

    effect(()=>{
      if(this.now_playSong){
        this.duration.set(this.now_playSong.duration || 0);
        this.currentTime.set(0);
        
      }
    })
      
  }

  ngOnInit(): void {
    this.playerService.currentSong$.subscribe((song)=>{
        if(song){
          this.playSong(song)
        }     
    });
  }


  duration = signal(0) // 1-minute simulation
  currentTime = signal(0);
  isPlaying = signal(false);
  timer: any;

  togglePlay() {
    this.isPlaying.update(p=>!p);
    if (this.isPlaying()) {
      this.startTimer();
    } else {
      clearInterval(this.timer);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.currentTime() < this.duration()) {
        this.currentTime.update(v=>v+1);
      } else {
        this.isPlaying.update(p=>!p);
        clearInterval(this.timer);
      }
    }, 1000);
  }

  seekTo(event: any) {
    this.currentTime.set = event.target.value;
  }
  

  playSong(currentSong:SongPlay){
      this.now_playSong = currentSong;
      console.log(this.now_playSong.name);
  }

  pauseSong(){

  }

  nextSong(){
    
  }

  previousSong(){

  }


}
