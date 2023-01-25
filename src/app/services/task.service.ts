import { Injectable } from '@angular/core';
// import { TASKS } from '../mock-tasks';
import { Task } from '../Task';
import { Observable } from 'rxjs'; //of, delay
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // return of(TASKS).pipe(delay(500));
    return this.http.get<Task[]>(config.apiUrl + '/tasks');
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(config.apiUrl + '/tasks/' + id);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(
      config.apiUrl + '/tasks/' + task.id,
      task,
      httpOptions
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(config.apiUrl + '/tasks', task, httpOptions);
  }
}
