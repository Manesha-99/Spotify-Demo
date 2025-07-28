import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  username = '';
  password = '';
  role = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register({ username: this.username, password: this.password, role: this.role });
    alert('Registered successfully! Please login.');
    this.router.navigate(['/login']);

    }

}

