import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  passwordMatchStatus: string = '';
  passwordMatchColor: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      employeeID: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      role: ['Trainee', [Validators.required]] // Default role or select input
    }, {
      validator: this.passwordMatcher // Custom validator for matching password and confirmPassword
    });
  }

  // Custom validator to check if passwords match
  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const userData = this.registerForm.value;
    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration Successful!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
