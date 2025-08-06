import { Component, Input, input, OnInit, SimpleChanges } from '@angular/core';
import { playListSong } from '../../models/playListSong.model';
import { DataService } from '../../service/data.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-play-list',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './play-list.component.html',
  styleUrl: './play-list.component.css',
})
export class PlayListComponent implements OnInit {
  playListSongs: playListSong[] = [];
  @Input() songFromParent: Song | null = null;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const storedPlayList = localStorage.getItem('MyPlayList');

    if (storedPlayList) {
      this.playListSongs = JSON.parse(storedPlayList);
    } else {
      this.dataService
        .getPlayList()
        .subscribe((data) => (this.playListSongs = data));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes[`songFromParent`] && this.songFromParent) {
      this.addToPlayList(this.songFromParent);
    }
  }

  addToPlayList(song: Song) {
    const entrySong: playListSong = {
      id: song.id,
      songName: song.name,
      songArtist: song.artist,
    };

    const alreadyAdded = this.playListSongs.find((x) => x.id === song.id);
    if (!alreadyAdded) {
      this.playListSongs.push(entrySong);
      alert(`Song has been added to the playList....`);
    } else {
      alert('Song has already added to the playList....');
    }
  }

  removeSong(i: number) {
    this.playListSongs.splice(i, 1);
  }

  savePlayList() {
    localStorage.setItem('MyPlayList', JSON.stringify(this.playListSongs));
    alert(`MyPlayList has been saved....`);
  }

  deletePlayList() {
    this.playListSongs = [];
    localStorage.removeItem(`MyPlayList`);
    alert(`MyPlayList has been Deleted....`);
  }
}
