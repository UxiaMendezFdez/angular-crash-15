import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Input() open: boolean;
  @Output() addTask: EventEmitter<any> = new EventEmitter();

  text: string;
  day: string;
  reminder: boolean = false;

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }
    if (!this.day) {
      alert('Please add a day!');
      return;
    }

    let newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.addTask.emit(newTask);
  }
}
