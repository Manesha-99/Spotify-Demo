import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../service/data.service';
import { Artist } from '../../models/artist.models';
import { Song } from '../../models/song.model';
import { Album } from '../../models/album.model';
import { Router } from '@angular/router';
import { AdminOperationsService } from '../../service/admin.operations.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, NgIf, NgFor, ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private auth: AuthService, private dataService : DataService, private router:Router, private adminOperations: AdminOperationsService){

  }

  artists: Artist[] = [];
  songs: Song[]=[];
  albums: Album[] = [];
  newArtists : Artist[] = [];

  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {
    this.dataService.getSongs().subscribe(data=>this.songs=data.songList);

    this.dataService.getArtists().subscribe(data => {
      this.artists = data;
    
      const stored = localStorage.getItem('artists');
      if(stored){
        const localartists: Artist[] = JSON.parse(stored);
        this.artists = [...this.artists, ...localartists];
        console.log(this.artists);
      }

    })
    
    this.dataService.getAlbums().subscribe(data=>this.albums=data);
  }

  

  //-------Artist Area---------


  goToAddArtist(){
    this.router.navigate(["./admin/add-artist"])
    //this.dataService.addArtist();
  }

  editArtist(artist:Artist){
    
  }

  deleteArtist(artist:Artist){

  }


  //-------Song Area-------

  goToAddSong(){
    this.router.navigate(["./admin/add-song"]);
  }


  editSong(song:Song){

  }

  deleteSong(song:Song){

  }


  //--------Album Area------

  goToAddAlbum(){

  }


  editAlbum(album:Album){

  }

  deleteAlbum(album:Album){

  }


}




