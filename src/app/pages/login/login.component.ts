import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    const success = this.auth.login(this.username, this.password);
    if (success) {
      const role = this.auth.getRole();
      this.router.navigate([role === 'admin' ? '/admin-dashboard' : '/user-dashboard']);
      // alert("Login Successfully....");
    } else {
      alert('Invalid credentials!');
    }

    
}
}