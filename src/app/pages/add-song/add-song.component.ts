import { Component } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-song',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.css'
})
export class AddSongComponent {

  id = new FormControl();
  name = new FormControl();
  genre = new FormControl();
  artist = new FormControl();
  album = new FormControl();

  onSubmit(){
    console.log(this.id.value);
    console.log(this.name.value);
    console.log(this.genre.value);
    console.log(this.artist.value);
  }

}
