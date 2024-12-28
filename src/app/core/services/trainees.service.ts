import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trainee } from '../interfaces/trainees.interface';
import { AuthService } from 'src/app/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  private apiUrl = 'http://localhost:3000/api/trainees'; // Your API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get the Authorization header with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all trainees with authentication
  getAllTrainees(): Observable<Trainee[]> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Trainee[]>(this.apiUrl, { headers });
  }

  // Get trainee by ID with authentication
  getTraineeById(id: string): Observable<Trainee> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Trainee>(`${this.apiUrl}/${id}`, { headers });
  }

  // Get trainee names with authentication
  getTraineeNames(): Observable<string[]> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Trainee[]>(this.apiUrl, { headers }).pipe(
      map((trainees: any[]) => trainees.map(trainee => trainee.name))
    );
  }

  // Create a new trainee with authentication
  createTrainee(trainee: Omit<Trainee, '_id'>): Observable<Trainee> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post<Trainee>(this.apiUrl, trainee, { headers });
  }

  // Update a trainee with authentication
  updateTrainee(id: string, trainee: Partial<Trainee>): Observable<Trainee> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.put<Trainee>(`${this.apiUrl}/${id}`, trainee, { headers });
  }

  // Delete a trainee with authentication
  deleteTrainee(id: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // Get grouped trainees with authentication
  getGroupedTrainees(): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<any>(`${this.apiUrl}/traineeGroup`, { headers });
  }
}
