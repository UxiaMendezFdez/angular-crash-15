import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];
  loading: boolean = true;
  error: string = '';
  showAddTask: boolean;
  subscription: Subscription;

  reloadIcon = faRedo;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((v) => (this.showAddTask = v));
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = [];
    this.loading = true;
    this.error = '';
    this.taskService
      .getTasks()
      .subscribe({
        next: (t) => {
          this.tasks = t;
        },
        error: (e) => {
          this.error = 'There was an error retrieving the tasks';
        },
        complete: () => {
          //do nothing, this is an example
        },
      })
      .add(() => {
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
    task.reminder = !task.reminder;
    //do the db update in the background so it doesnt affect ux
    this.taskService.updateTask(task).subscribe({
      next: () => {
        //success
      },
      error: (e) => {
        console.log('There was an error', e);
      },
    });
  }

  handleAddTask(task: Task): void {
    this.loading = true;
    this.uiService.toggleAddTask();
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (e) => {
        console.log('There was an error', e);
      },
    });
  }
}
