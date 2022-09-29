import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup;
  bands: Band[] = [];
  filteredBands: string[] = [];

  constructor(
    public router: Router,
    private bandsService: BandsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(): void {
  }

  filterBand(event: any) {
    this.filteredBands = this.bands
      .filter(band => band.GroupName.toLowerCase().indexOf(event.query.toLowerCase()) == 0)
      .map(band => band.GroupName);
  }

  onFocus() {
    if (this.bands.length == 0) this.bandsService.getAllBands().subscribe((bands: Band[]) => this.bands = bands);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.onSearch(this.searchForm.value);
  }

  onSearch(formValues: any) {
    this.router.navigate(['/results', { query: formValues.query }]);
    this.searchForm.get('query')?.reset();
  }
}
