import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';

import { SearchQueries } from './+state/search.queries';

@Injectable({
  providedIn: 'root',
})
export class QueryGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.selectSnapshot(SearchQueries.query) === ''
      ? this.router.createUrlTree([''])
      : true;
  }
}
