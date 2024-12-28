import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trainer } from '../interfaces/trainers.interface';
import { AuthService } from 'src/app/auth.service';
// Import AuthService to get the token

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = 'http://localhost:3000/api/trainers'; // Your API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get the Authorization header with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all trainers with authentication
  getAllTrainers(): Observable<Trainer[]> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Trainer[]>(this.apiUrl, { headers });
  }

  // Get trainer by ID with authentication
  getTrainerById(id: string): Observable<Trainer> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Trainer>(`${this.apiUrl}/${id}`, { headers });
  }

  // Get trainer names with authentication
  getTrainerNames(): Observable<string[]> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Trainer[]>(this.apiUrl, { headers }).pipe(
      map((trainers: any[]) => trainers.map(trainer => trainer.name))
    );
  }

  // Create a new trainer with authentication
  createTrainer(trainer: Omit<Trainer, '_id'>): Observable<Trainer> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post<Trainer>(this.apiUrl, trainer, { headers });
  }

  // Update a trainer with authentication
  updateTrainer(id: string, trainer: Partial<Trainer>): Observable<Trainer> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.put<Trainer>(`${this.apiUrl}/${id}`, trainer, { headers });
  }

  // Delete a trainer with authentication
  deleteTrainer(id: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
