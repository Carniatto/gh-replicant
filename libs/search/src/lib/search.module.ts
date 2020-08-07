import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchInputComponent } from './components/search-input/search-input.component';
import { GithubService } from './github.service';
import { ResultsPageComponent } from './results-page/results-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SearchPageComponent },
      { path: 'results', pathMatch: 'full', component: ResultsPageComponent },
    ]),
  ],
  providers: [GithubService],
  declarations: [
    SearchInputComponent,
    SearchPageComponent,
    ResultsPageComponent,
  ],
})
export class SearchModule {}
