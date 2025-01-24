import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../interfaces/programs.interface';
import { AuthService } from 'src/app/auth.service';


@Injectable({
  providedIn: 'root',
})
export class ProgramService {

  private baseUrl = 'http://localhost:3000/api/programs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get the Authorization header with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all programs with authentication
  getPrograms(): Observable<Program[]> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<Program[]>(this.baseUrl, { headers });
  }

  // Add a new program with authentication
  addProgram(program: Program): Observable<Program> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post<Program>(this.baseUrl, program, { headers });
  }

  // Update an existing program with authentication
  updateProgram(id: string, program: Program): Observable<Program> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.put<Program>(`${this.baseUrl}/${id}`, program, { headers });
  }

  // Delete a program with authentication
  deleteProgram(id: string): Observable<void> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  // Get grouped trainers with authentication
  getGroupedTrainers(): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<any>(`${this.baseUrl}/trainerGroup`, { headers });
  }
}
