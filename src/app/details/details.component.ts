import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  band: Band = new Band();

  constructor(
    public route: ActivatedRoute,
    private bandsService: BandsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bandId = params['id'] ?? '';
      this.bandsService.getBandById(bandId)
      .subscribe({
        next: (band) => this.band = band,
        error: (err) => console.log(err.message)
      });
    })
    
  }

}
