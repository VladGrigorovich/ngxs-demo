export namespace TodoActions {
  export class Add {
    static readonly type = '[Todo Component] Add';
    constructor(public content: string) {}
  }
}
