import { Component, OnInit } from '@angular/core';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  bands: Band[] = [];

  constructor(private bandsService: BandsService) { }

  ngOnInit(): void {
    this.bandsService.getAllBands().subscribe((data: Band[]) => this.bands = data);
  }

}
