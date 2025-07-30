import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Artist } from '../../models/artist.models';
import { Song } from '../../models/song.model';
import { Album } from '../../models/album.model';
import { DataService } from '../../service/data.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SongResponse } from '../../models/song.response.model';
import { playListSongs } from '../../models/playlist.model';

@Component({
  selector: 'app-user-dashboard',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  constructor(private auth: AuthService, private dataService: DataService) {}

  artists: Artist[] = [];
  songs: Song[] = [];
  albums: Album[] = [];
  playListSongs: playListSongs[] = [];

  shownPlaylistIndex: number | null = null;

  ngOnInit(): void {
    this.dataService.getSongs().subscribe((data) => (this.songs = data));
    this.dataService.getArtists().subscribe((data) => (this.artists = data));
    this.dataService.getAlbums().subscribe((data) => (this.albums = data));
    this.dataService
      .getPlayList()
      .subscribe((data) => (this.playListSongs = data));
  }

  logout() {
    this.auth.logout();
  }

  removeSong(i: number) {
    this.playListSongs.splice(i, 1);
  }

  addToPlayList(song: SongResponse) {
    const entrySong: playListSongs = {
      id: song.id,
      songName: song.name,
      songArtist: song.artist,
    };

    const alreadyAdded = this.playListSongs.some((x) => x.id === song.id);
    if (!alreadyAdded) {
      this.playListSongs.push(entrySong);
      alert(`Song has been added to the playList....`);
    } else {
      alert('Song has already added to the playList....');
    }
  }

  savePlaylist() {
    localStorage.setItem('MyPlayList', JSON.stringify(this.playListSongs));
    alert('MyPlayList has been saved....');
  }

  deletePlayList() {
    this.playListSongs = [];
    localStorage.removeItem('MyPlayList');
    alert('Playlist has been deleted....');
  }
}
