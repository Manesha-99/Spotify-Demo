import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [];

  constructor(private router: Router) {}

  currentUser: User | null = null;

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  register(user: any) {
    this.users.push(user);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getRole(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : '';
  }
}
