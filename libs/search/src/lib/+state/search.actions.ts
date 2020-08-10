export namespace SearchActions {
  export class LoadResults {
    static readonly type = '[Search] load results';
    constructor(public query: string, public navigate?: boolean) {}
  }

  export class SetPage {
    static readonly type = '[Search] set page';
    constructor(public pageNumber: number) {}
  }
}
