import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { SearchActions } from '../+state/search.actions';

@Component({
  selector: 'ghr-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  constructor(private store: Store) {}

  onClick(query: string) {
    this.store.dispatch(new SearchActions.LoadResults(query, true));
  }
}
