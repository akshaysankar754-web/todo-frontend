import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {

    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(data)
      .subscribe({
        next: (response) => {

          console.log('Success:', response);

          alert(response);

          this.router.navigate(['/']);
        },

        error: (err) => {

          console.error('Register Error:', err);

          if (err.error) {
            alert(err.error);
          } else {
            alert('Registration Failed');
          }
        }
      });
  }
}