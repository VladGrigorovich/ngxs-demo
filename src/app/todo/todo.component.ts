import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoActions } from './todo.actions';
import { TodoState } from './todo.state';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.css'],
})
export class TodoComponent {
  @Select(TodoState.todosList) todos$: Observable<string[]>;
  newTodoControl = this.fb.control('', Validators.required);

  constructor(private readonly store: Store, private readonly fb: FormBuilder) {}

  @HostListener('keyup.enter', ['$event'])
  handleEnterClick() {
    if (this.newTodoControl.invalid) {
      return;
    }
    this.addTodo();
  }

  addTodo() {
    const content = this.newTodoControl.value;
    const addTodoAction = new TodoActions.Add(content);
    this.store.dispatch(addTodoAction).subscribe(() => this.newTodoControl.reset());
  }
}
