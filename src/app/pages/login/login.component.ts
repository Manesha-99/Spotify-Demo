import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { NgIf } from '@angular/common';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  users: User[] = [];
  isLoadingUsers: boolean = true;
  isLoggingIn = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private dataservice: DataService
  ) {}

  ngOnInit(): void {
    this.dataservice.getUsers().subscribe((data) => (this.users = data));
    this.isLoadingUsers = false;
  }

  onLogin() {
    const found = this.users.find(
      (u) => u.username === this.username && u.password === this.password
    );
    if (found) {
      this.auth.setCurrentUser(found);
      localStorage.setItem('user', JSON.stringify(found));

      this.isLoggingIn = true;

      setTimeout(() => {
        const role = found.role;
        this.isLoggingIn = false;
        this.router.navigate([
          role === 'admin' ? '/admin-dashboard' : '/user-dashboard',
        ]);
      }, 2000);
    } else {
      alert('Invalid credentials!');
    }
  }
}
