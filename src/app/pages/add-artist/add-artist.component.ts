import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataService } from '../../service/data.service';
import { Artist } from '../../models/artist.models';
import { Router } from '@angular/router';
import { AdminOperationsService } from '../../service/admin.operations.service';

@Component({
  selector: 'app-add-artist',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css',
})
export class AddArtistComponent {
  constructor(
    private dataService: DataService,
    private router: Router,
    private adminOperations: AdminOperationsService
  ) {}

  newAdminArtists: Artist[] = [];

  artistForm = new FormGroup({
    name: new FormControl<string>(''),
    id: new FormControl<number | null>(null),
    bio: new FormControl<string>(''),
    image: new FormControl<string>(''),
  });

  sendArtist() {
    this.adminOperations.addNewArtist(this.newAdminArtists);
    this.router.navigate(['/admin-dashboard']);
  }

  onSubmit() {
    const artist: Artist = {
      id: this.artistForm.value.id!,
      name: this.artistForm.value.name!,
      bio: this.artistForm.value.bio!,
      image: '',
    };

    const stored = localStorage.getItem('artists');
    this.newAdminArtists =  stored? JSON.parse(stored): [];
    const checkId = this.newAdminArtists.some(x=>x.id===artist.id);
    if(checkId){
      alert(`${artist.id} is already exists....`);
    }else{
      this.newAdminArtists.push(artist);

      localStorage.setItem('artists', JSON.stringify(this.newAdminArtists));
  
      alert(`New Artist Added to the List....`);
    }

    this.artistForm.reset();
  }


  clear() {
    this.artistForm.reset({
      id: null,
      name: '',
      bio: '',
      image: null,
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.artistForm.get('image')?.setValue('');
    }
  }
}
