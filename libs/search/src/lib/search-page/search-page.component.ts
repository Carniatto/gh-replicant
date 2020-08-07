import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { GithubService } from '../github.service';

@Component({
  selector: 'ghr-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  constructor(private github: GithubService) {}

  onClick(query: string) {
    this.github.searchUser(query).subscribe(console.log);
  }
}
