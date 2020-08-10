import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { SearchActions } from '../+state/search.actions';
import { Item, Pagination } from '../+state/search.model';
import { SearchQueries } from '../+state/search.queries';

@Component({
  selector: 'ghr-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent {
  @Select(SearchQueries.query) query$: Observable<string>;
  @Select(SearchQueries.pagination) pagination$: Observable<Pagination>;

  constructor(private store: Store) {}

  onSearch(query: string) {
    this.store.dispatch(new SearchActions.LoadResults(query));
  }

  onSetPage(pageNumber: number) {
    this.store.dispatch(new SearchActions.SetPage(pageNumber));
  }

  trackByFn(property: keyof Item) {
    return (item: Item) => item[property];
  }
}
