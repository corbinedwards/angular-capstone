import { Component, OnInit } from '@angular/core';
import { Band } from '../models/band';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  band: Band = new Band();

  constructor() { }

  ngOnInit(): void {
    this.band.GroupName = 'The Awesome Band';
    this.band.MaxGroupSize = 5;
    this.band.OrganizationName = 'Brainfeeder';
    this.band.SponsorEmail = 'susan@gmail.com';
    this.band.SponsorName = 'Susan Johnson';
    this.band.SponsorPhone = '555-555-5555';
  }

}
