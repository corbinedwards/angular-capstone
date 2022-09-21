import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  bands: Band[] = [];

  private isLoading: boolean = true;

  constructor(
    public router: Router,
    private bandsService: BandsService
  ) { }

  ngOnInit(): void {
  }

  getAllBands(): void {
    this.isLoading = false;
    this.bands = [];
    this.bandsService.getAllBands().subscribe(
      {
        next: (data: Band[]) => this.bands = data,
        error: (err) => console.log(err.message),
        complete: () => this.isLoading = false
      }
    );
  }

}
