import { Selector } from '@ngxs/store';

import { ItemDetail, SearchStateModel, UserSearchResults } from './search.model';
import { SearchState } from './search.state';

export class SearchQueries {
  @Selector([SearchState])
  static results(state: SearchStateModel) {
    return state.results || {};
  }

  @Selector([SearchState])
  static query(state: SearchStateModel) {
    return state.query;
  }

  @Selector([SearchState])
  static currentPage(state: SearchStateModel) {
    return state.currentPage;
  }

  @Selector([SearchQueries.results])
  static items(results: UserSearchResults) {
    return results.items;
  }

  @Selector([SearchQueries.results])
  static totalCount(results: UserSearchResults) {
    return results.total_count;
  }

  @Selector([
    SearchQueries.items,
    SearchQueries.totalCount,
    SearchQueries.currentPage,
  ])
  static pagination(
    items: ItemDetail[],
    totalCount: number,
    currentPage: number
  ) {
    if (!items?.length) {
      return null;
    }

    const totalPages = Math.ceil(totalCount / 10);
    // The open GH API limits to 1000 results (1000 / 10 per_page = 100 pages max)
    const lastPage = totalPages > 100 ? 100 : totalPages;

    return {
      items,
      currentPage,
      lastPage,
      totalCount,
    };
  }
}
