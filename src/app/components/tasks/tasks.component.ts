import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];
  loading: boolean = true;

  reloadIcon = faRedo;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = [];
    this.loading = true;
    this.taskService.getTasks().subscribe((t) => {
      this.tasks = t;
      this.loading = false;
    });
  }

  handleDeleteTask(id: number): void {
    this.loading = true;
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  handleReminder(task: Task): void {
    this.loading = true;
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (e) => {
        console.log('There was an error', e);
      },
    });
  }
}
