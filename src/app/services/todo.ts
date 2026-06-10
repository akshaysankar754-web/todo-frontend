import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:5001/api/Todo';

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get(this.apiUrl);
  }

  addTodo(title: string) {
    return this.http.post(this.apiUrl, {
      title: title
    });
  }

  toggleTodo(id: number) {
    return this.http.put(`${this.apiUrl}/${id}`, {});
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}