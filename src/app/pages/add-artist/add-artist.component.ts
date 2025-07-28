import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { NgFor, NgIf } from '@angular/common';
import { Artist } from '../../models/artist.models';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-artist',
  imports: [FormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css'
})
export class AddArtistComponent {


  artist: Artist = {

    id: 0,
    name : '',
    bio : '',
    image : '',


  }

  constructor(private dataService: DataService, private router: Router) {}


  onImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      this.artist.image = reader.result as string;
      // optional preview
      // this.imagePreview = this.artist.image;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
//   addArtist() {
//     this.dataService.addArtist({
//        name: this.artist.name,
//        bio: this.artist.bio,
//        image: this.artist.image
//      });
     
//      //Clear the Form

//      this.artist = {
//      id : 0,
//      name :'',
//      bio : '',
//      image : ''
//   }
//   this.router.navigate(["./admin-dashboard"]);
// }
}
