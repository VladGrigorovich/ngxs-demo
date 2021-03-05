import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { TodoActions } from './todo.actions';

export interface TodoStateModel {
  list: string[];
}

export const TODO_STATE_TOKEN = new StateToken<TodoStateModel>('todo');

@State<TodoStateModel>({
  name: TODO_STATE_TOKEN,
  defaults: {
    list: [],
  },
})
@Injectable()
export class TodoState {
  @Action(TodoActions.Add)
  addTodo(ctx: StateContext<TodoStateModel>, action: TodoActions.Add) {
    ctx.setState(state => ({
      list: [...state.list, action.content],
    }));
  }

  @Selector()
  static todosList(state: TodoStateModel): string[] {
    return state.list;
  }
}
