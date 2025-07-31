import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';
import { Artist } from '../models/artist.models';
import { Album } from '../models/album.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongResponse } from '../models/song.response.model';
import { AlbumResponse } from '../models/album.response.model';
import { ArtistResponse } from '../models/artist.response.model';
import { playListSong } from '../models/playListSong.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  //   private songs: Song[]=[
  //     {
  //       id: 1,
  //       name: "Apocalypse",
  //       artist: "Cigarettes After Sex",
  //       genre:"Alternative/Indie",
  //       album: "Cigarettes After Sex",
  //       coverImage: "",
  //       audioPath: ""
  //     },
  //     {
  //       id: 2,
  //       name: "Waka Waka",
  //       artist: "Shakira",
  //       genre:"Soca music,",
  //       album: "Sale el Sol",
  //       coverImage: "",
  //       audioPath: ""
  //     }
  //   ]
  //   private artists: Artist[]=[
  //     {
  //       id:1,
  //       name: "Cigarettes After Sex",
  //       bio: "",
  //       image: "",
  //     },
  //     {
  //       id:2,
  //       name: "Shakira",
  //       bio: "",
  //       image: "",
  //     }
  //   ];
  //   private albums: Album[]=[
  //     {
  //       id:1,
  //       name: "Cigarettes After Sex",
  //       artist: "Cigarettes After Sex",
  //       coverImage: ""
  //     },
  //     {
  //       id:2,
  //       name: "Sale el Sol",
  //       artist: "Shakira",
  //       coverImage: ""
  //     }
  //   ];

  // //Songs Functions------------------------

  //   getSongs(): Song[]{
  //     return this.songs;
  //   }

  //   addSongs(song: Song){
  //     song.id = this.songs.length+1;
  //     this.songs.push(song);
  //   }

  //   removeSongs(song:Song){
  //     this.songs =  this.songs.filter(s=> s.id!==song.id);
  //       alert(`Song has been removed....`)

  //   }

  //   updateSong(current_song:Song, update_song:Song){
  //     const update_song_index: number = this.songs.indexOf(current_song);
  //     if(update_song_index !== -1){
  //       this.songs[update_song_index] = update_song;
  //       alert(`Song's details has been changed....`)
  //     }else{
  //       alert(`Song Not Found.....`)
  //     }
  //   }

  //   //Artist Functions--------------------

  //   addArtist(artist: Omit<Artist, 'id'>){
  //     const newId = this.artists.length > 0
  //     ? Math.max(...this.artists.map(a => a.id)) + 1
  //     : 1;

  //     const newArtist: Artist = {
  //     id: newId,
  //     ...artist
  //     };

  //    this.artists.push(newArtist);
  //    alert('Artist Added Successfully....');
  //   }

  //   getArtist(): Artist[]{
  //     return this.artists;
  //   }

  //   removeArtist(artist:Artist){
  //     const index_artist: number = this.artists.indexOf(artist);
  //     if(index_artist>-1){
  //       this.artists = this.artists.filter(a=>a.id !== artist.id);
  //       alert(`${this.artists[index_artist]} artist has been deleted....`);
  //     }
  //   }

  //   updateArtist(current_artist:Artist, update_artist: Artist){
  //     const update_artist_index: number = this.artists.indexOf(current_artist);
  //     if(update_artist_index !==-1){
  //       this.artists[update_artist_index] = update_artist;
  //       alert(`Artist's details has been changed....`);
  //     }else{
  //       alert(`Artist Not Found....`);
  //     }
  //   }

  //   //Album Functions-----------------

  //   getAlbum(): Album[]{
  //     return this.albums;
  //   }

  //   addAlbum(album: Album){
  //     album.id = this.albums.length+1;
  //     this.albums.push(album);
  //     alert(`Album has been added.....`);
  //   }

  //   removeAlbum(album:Album){
  //     const album_index: number= this.albums.indexOf(album);
  //     if(album_index>-1){
  //       this.albums = this.albums.filter(a=>a.id !== album_index);
  //       alert(`${this.albums[album_index]} album has been removed....`)
  //     }
  //   }

  //   updateAlbum(curent_album: Album, update_album: Album){
  //     const update_album_index: number = this.albums.indexOf(curent_album);

  //     if(update_album_index>= -1){
  //       this.albums[update_album_index] = update_album;
  //       alert(`Album has been updated....`);
  //     }
  //   }

  //---------------------Updated to retrieve from JSON-----------------------------

  getSongs(): Observable<SongResponse> {
    return this.http.get<SongResponse>('assets/response/song.response.json');
  }

  getArtists(): Observable<ArtistResponse[]> {
    return this.http.get<ArtistResponse[]>(
      'assets/response/artist.response.json'
    );
  }

  getAlbums(): Observable<AlbumResponse[]> {
    return this.http.get<AlbumResponse[]>(
      'assets/response/album.response.json'
    );
  }

  getPlayList(): Observable<playListSong[]> {
    return this.http.get<playListSong[]>(
      'assets/response/playList.response.json'
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/response/user.details.json');
  }
}
