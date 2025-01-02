import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  private apiUrl = 'http://localhost:3000/api/scores';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get the Authorization header with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all scorecards with authentication
  getScoreCard(): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Get scorecard by ID with authentication
  getScoreCardById(id: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Create a new scorecard with authentication
  createScoreCard(scorecard: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post<any>(this.apiUrl, scorecard, { headers });
  }

  // Update a scorecard with authentication
  updateScoreCard(id: string, scorecard: any): Observable<void> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.put<void>(`${this.apiUrl}/${id}`, scorecard, { headers });
  }

  // Delete a scorecard with authentication
  deleteScoreCard(id: string): Observable<void> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
