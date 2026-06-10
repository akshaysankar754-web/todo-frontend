import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.login(data)
      .subscribe({
        next: (res) => {

          localStorage.setItem(
            'token',
            res.token
          );

          this.router.navigate(['/dashboard']);
        },

        error: (err) => {

          alert('Invalid Email or Password');

          console.log(err);
        }
      });
  }
}