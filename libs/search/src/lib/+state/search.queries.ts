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

    return {
      items,
      currentPage,
      totalCount,
    };
  }
}
