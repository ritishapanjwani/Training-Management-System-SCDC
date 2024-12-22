import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../interfaces/programs.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = 'http://localhost:3000/api/programs'; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.apiUrl);
  }

  getProgramById(id: string): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrl}/${id}`);
  }

  createProgram(program: Omit<Program, '_id'>): Observable<Program> {
    return this.http.post<Program>(this.apiUrl, program);
  }

  updateProgram(id: string, program: Partial<Program>): Observable<Program> {
    return this.http.put<Program>(`${this.apiUrl}/${id}`, program);
  }

  deleteProgram(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}