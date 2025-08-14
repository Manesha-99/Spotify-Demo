import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Artist } from '../../models/artist.models';
import { Song } from '../../models/song.model';
import { Album } from '../../models/album.model';
import { DataService } from '../../service/data.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { playListSong } from '../../models/playListSong.model';
import { PlayListComponent } from '../play-list/play-list.component';
import { PlayerService } from '../../service/player.service';
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [FormsModule, NgIf, NgFor, PlayListComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  constructor(private auth: AuthService, private dataService: DataService, private playerService: PlayerService) {}

  currentUser: any = null;
  artists: Artist[] = [];
  songs: Song[] = [];
  albums: Album[] = [];
  playListSongs: playListSong[] = [];
  selectedSong: Song| null = null;

  // @ViewChild (PlayListComponent) playlistcomp !: PlayListComponent 

  ngOnInit(): void {
    this.dataService
      .getSongs()
      .subscribe((data) => (this.songs = data.songList));
    this.dataService.getArtists().subscribe((data) => (this.artists = data));
    this.dataService.getAlbums().subscribe((data) => (this.albums = data));
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user_t = JSON.parse(storedUser);
      this.currentUser = user_t;
    }
  }

  songSelect(song:Song){
    this.selectedSong = song;
    
  }

  playSongBtn(song:Song){
    this.playerService.SendSong(song);
  }


  addToQueueBtn(song:Song){
    this.playerService.AddToQueue(song);
  }

  // songSelect(song:Song){
  //   this.playlistcomp.addToPlayList(song);
  // }

  logout() {
    this.auth.logout();
  }
}
