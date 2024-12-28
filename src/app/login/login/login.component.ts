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
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please enter both email and password');
      return;
    }
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['']); // Redirect to the dashboard after successful login
        },
        (error) => {
          console.error('Login failed:', error);
          alert("Login Failed")
        }
      );
    }
  }



  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.authService.login(email, password).subscribe(
  //       (response) => {
  //         this.authService.setToken(response.token);
  //         this.router.navigate(['/']);
  //       },
  //       (error) => {
  //         console.error('Login failed:', error);
  //       }
  //     );
  //   }
  // }
  // loginForm!: FormGroup; // Define a FormGroup for the login form

  // constructor(
  //   private formBuilder: FormBuilder,  // Inject FormBuilder
  //   private authService: AuthService,
  //   private router: Router
  // ) { }

  // ngOnInit(): void {
  //   // Initialize the login form
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],  // Email field with validation
  //     password: ['', [Validators.required]]                   // Password field with validation
  //   });
  // }

  // // Submit handler
  // onSubmit() {
  //   if (this.loginForm.invalid) {
  //     return;  // If the form is invalid, do nothing
  //   }

  //   const { email, password } = this.loginForm.value;
  //   this.authService.login(email, password).subscribe(
  //     (response) => {
  //       this.router.navigate(['/dashboard']);  // Navigate to dashboard if login is successful
  //     },
  //     (error) => {
  //       alert('Invalid credentials or error occurred.');
  //     }
  //   );
  // }
}
