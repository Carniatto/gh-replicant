import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@ghr/search').then((m) => m.SearchModule),
  },
];
