import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  bands: Band[] = [];
  headerText: string = 'Searching...';
  isLoading: boolean = true;

  private searchQuery: string = '';
  private labelId: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private bandsService: BandsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['query']?.toLowerCase() ?? '';
      this.labelId = params['label']?.toLowerCase() ?? '';
      (this.labelId) ? this.getBandsByLabel(): this.getAllBands();
    });
  }

  getAllBands(): void {
    this.isLoading = true;
    this.bands = [];
    this.bandsService.getAllBands().subscribe(
      {
        next: (data: Band[]) =>  { 
          this.bands = data;
          if (this.searchQuery) this.bands = this.bands.filter(band => band.GroupName.toLowerCase() === this.searchQuery);
        },
        error: (err) => console.log(err.message),
        complete: () => {
          this.isLoading = false;
          this.headerText = (this.searchQuery) ? `Search Results - '${this.searchQuery}'` : `All Bands`;
        }
      }
    );
  }

  getBandsByLabel(): void {
    this.isLoading = true;
    this.bands = [];
    this.bandsService.getBandsByOrg(this.labelId).subscribe(
      {
        next: (data: Band[]) => this.bands = data,
        error: (err) => console.log(err.message),
        complete: () => {
          this.isLoading = false
          if (this.bands) {
            this.headerText = `Search Results - '${this.bands[0].OrganizationName}'`;
          }
        }
      }
    )
  }

  navigateToDetails(band: Band): void {
    this.router.navigate(['/details', band.GroupId]);
  }

  viewAllBands(): void {
    this.router.navigate(['/results']);
  }

}
