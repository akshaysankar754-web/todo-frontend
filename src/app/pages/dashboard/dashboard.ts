import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  todos: any[] = [];
  newTodo = '';

  apiUrl = 'http://localhost:5001/api/Todo';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  loadTodos() {

    this.http.get<any[]>(
      this.apiUrl,
      this.getHeaders()
    ).subscribe({
      next: (data) => {
        this.todos = data;
      },
      error: (err) => {
        console.error(err);

        if (err.status === 401) {
          this.logout();
        }
      }
    });
  }

  addTodo() {

    if (!this.newTodo.trim()) {
      return;
    }

    const todo = {
      title: this.newTodo,
      isCompleted: false
    };

    this.http.post(
      this.apiUrl,
      todo,
      this.getHeaders()
    ).subscribe({
      next: () => {

        this.newTodo = '';

        this.loadTodos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleTodo(id: number) {

    this.http.put(
      `${this.apiUrl}/${id}`,
      {},
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteTodo(id: number) {

    this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }
}