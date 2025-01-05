import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please enter both email and password');
      return;
    }

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      //console.log(this.loginForm.value);
      this.authService.login(email, password).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']); // Redirect to the dashboard after successful login
        },
        (error) => {
          console.error('Login failed:', error);
          alert("Invalid Email or Password")
        }
      );
    }
  }
}
