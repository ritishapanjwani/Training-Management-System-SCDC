import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment.service';
import { jwtDecode } from 'jwt-decode'; // Correct named import

interface DecodedToken {
  role: string;
  exp: number;
  username: string;
  // Add other fields you expect in the JWT
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/login', { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) {
      return ''; // No role if no token exists
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token); // Use the named import correctly
      return decodedToken?.role || ''; // Decoding JWT to extract role
    } catch (error) {
      console.error('Invalid token', error);
      return ''; // Return an empty string if the token is invalid
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
