import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { routes } from './routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
