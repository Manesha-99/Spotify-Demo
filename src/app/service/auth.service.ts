import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  currentUser: any = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const found = this.users.find(u => u.username === username && u.password === password);
    if (found) {
      this.currentUser = found;
      localStorage.setItem('user', JSON.stringify(found));
      return true;
    }
    return false;
  }

  register(user: any){
    this.users.push(user);
  }

  logout():void{
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

