import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

export interface SearchOption extends SelectItem {
  label: string,
  value: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchOptions: SearchOption[] = [];

  constructor() { }

  ngOnInit(): void {
    this.searchOptions = [
      { label: 'Genres', value: 'Genres' },
      { label: 'Bands', value: 'Bands' }
    ]
  }

}
