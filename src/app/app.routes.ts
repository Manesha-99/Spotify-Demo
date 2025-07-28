import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { AddAlbumComponent } from './pages/add-album/add-album.component';
import { AddSongComponent } from './pages/add-song/add-song.component';
import { AddArtistComponent } from './pages/add-artist/add-artist.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard, authGuard]},
    { path: 'user-dashboard', component:UserDashboardComponent, canActivate: [authGuard]},
    { path: 'admin/add-album', component: AddAlbumComponent, canActivate: [adminGuard, authGuard]},
    { path: 'admin/add-song', component: AddSongComponent, canActivate: [adminGuard, authGuard]},
    { path: 'admin/add-artist', component: AddArtistComponent, canActivate: [adminGuard, authGuard]},
];
