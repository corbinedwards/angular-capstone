import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(): void {
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.onSearch(this.searchForm.value);
  }

  onSearch(formValues: any) {
    this.router.navigate(['/results', { query: formValues.query }]);
  }
}
