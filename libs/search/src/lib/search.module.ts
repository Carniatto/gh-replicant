import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { SearchState } from './+state/search.state';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { GithubService } from './github.service';
import { ResultsPageComponent } from './results-page/results-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SearchPageComponent },
      { path: 'results', pathMatch: 'full', component: ResultsPageComponent },
    ]),
    NgxsModule.forFeature([SearchState]),
  ],
  providers: [GithubService],
  declarations: [
    SearchInputComponent,
    SearchPageComponent,
    ResultsPageComponent,
    PaginatorComponent,
  ],
})
export class SearchModule {}
