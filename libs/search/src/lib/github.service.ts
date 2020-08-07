import { forkJoin, Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ItemDetail, UserSearchResults, UserSearchResultsWithDetails } from './+state/search.model';

@Injectable()
export class GithubService {
  baseUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  searchUser(
    query: string,
    page = 1,
    perPage = 10
  ): Observable<UserSearchResultsWithDetails> {
    const params = new HttpParams({
      fromObject: {
        q: query.split(' ').join('+'),
        page: page.toString(),
        per_page: perPage.toString(),
      },
    });

    return this.http
      .get<UserSearchResults>(`${this.baseUrl}/users`, {
        params,
      })
      .pipe(
        switchMap((results) => {
          const userUrls = results.items.map((item) => item.url);
          const userDetails$ = userUrls.map((url) =>
            this.http.get<ItemDetail>(url)
          );
          return forkJoin(userDetails$).pipe(
            map((items) => ({ ...results, items: items }))
          );
        })
      );
  }
}
