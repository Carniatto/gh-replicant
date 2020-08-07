import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserSearchResults } from './search.model';

@Injectable()
export class GithubService {
  baseUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  searchUser(query: string, page = 1, perPage = 10) {
    const params = new HttpParams({
      fromObject: {
        q: query.split(' ').join('+'),
        page: page.toString(),
        per_page: perPage.toString(),
      },
    });

    return this.http.get<UserSearchResults>(`${this.baseUrl}/users`, {
      params,
    });
  }
}
