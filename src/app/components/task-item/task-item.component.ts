import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes, faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() deleteTask: EventEmitter<number> = new EventEmitter();
  @Output() toggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faLightbulb = faLightbulb;

  onDelete(id?: number) {
    this.deleteTask.emit(id);
  }
  onReminder(task: Task) {
    this.toggleReminder.emit(task);
  }
}
