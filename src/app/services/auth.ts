import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5171/api/Auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(
      `${this.apiUrl}/register`,
      data,
      { responseType: 'text' }
    );
  }

  login(data: any) {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      data
    );
  }
}