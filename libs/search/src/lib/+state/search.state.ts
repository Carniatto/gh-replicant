import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

import { GithubService } from '../github.service';
import { SearchActions } from './search.actions';
import { SearchStateModel, UserSearchResultsWithDetails } from './search.model';

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    currentPage: 1,
    query: '',
    results: null,
  },
})
@Injectable()
export class SearchState {
  constructor(private github: GithubService, private router: Router) {}

  @Action(SearchActions.LoadResults, { cancelUncompleted: true })
  loadResults(
    { setState }: StateContext<any>,
    { query, navigate }: SearchActions.LoadResults
  ) {
    return this.github.searchUser(query).pipe(
      switchMap((results: UserSearchResultsWithDetails) => {
        setState(
          patch({
            results,
            query,
          })
        );

        return navigate ? this.router.navigate(['results']) : of(true);
      })
    );
  }

  @Action(SearchActions.SetPage)
  setPage(
    { setState, getState }: StateContext<any>,
    { pageNumber }: SearchActions.SetPage
  ) {
    const { query } = getState();
    return this.github.searchUser(query, pageNumber).pipe(
      map((results: UserSearchResultsWithDetails) => {
        setState(
          patch({
            results,
            currentPage: pageNumber,
          })
        );
      })
    );
  }
}
