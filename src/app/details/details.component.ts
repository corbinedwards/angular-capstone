import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { Band } from '../models/band';
import { Label } from '../models/label';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @ViewChild('maxMembers') maxMembersDropdown: Dropdown | undefined;

  band: Band = new Band();
  labels: string[] = [];
  editingDetails: boolean = false;
  editingSponsor: boolean = false;
  formDetails: FormGroup;
  formSponsor: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private bandsService: BandsService,
    private fb: FormBuilder,
    private titleService: Title
  ) {
    this.formDetails = fb.group({
      bandName: ['', Validators.required],
      label: ['', Validators.required],
      maxMembers: [1, Validators.min(1)]
    });
    this.formSponsor = fb.group({
      sponsorName: ['', Validators.required],
      sponsorEmail: ['', Validators.email],
      sponsorPhone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bandId = params['id'] ?? '';
      this.bandsService.getBandById(bandId).subscribe({
        next: (band) => this.band = band,
        error: (err) => console.log(err.message),
        complete: () => this.titleService.setTitle(`${this.band.GroupName} - Battle of the Bands`)
      });
    });
    this.bandsService.getLabels().subscribe(labels => this.labels = labels.map(label => label.OrganizationName));
  }

  editBandDetails(): void {
    if (this.editingDetails) return;

    this.formDetails.get('bandName')?.setValue(this.band.GroupName);
    this.formDetails.get('label')?.setValue(this.band.OrganizationName);
    this.formDetails.get('maxMembers')?.setValue(this.band.MaxGroupSize);
    this.editingDetails = true;
  }

  editSponsorDetails(): void {
    if (this.editingSponsor) return;

    this.formSponsor.get('sponsorName')?.setValue(this.band.SponsorName);
    this.formSponsor.get('sponsorEmail')?.setValue(this.band.SponsorEmail);
    this.formSponsor.get('sponsorPhone')?.setValue(this.band.SponsorPhone);
    this.editingSponsor = true;
  }

  onSubmitDetails(): void {
    if (!this.formDetails.dirty) return;

    this.band.GroupName = this.formDetails.value.bandName;
    this.band.OrganizationName = this.formDetails.value.label;
    this.band.MaxGroupSize = this.formDetails.value.maxMembers;
    this.editingDetails = false;
    this.updateBand();
  }

  onSubmitSponsor(): void {
    if (!this.formDetails.dirty) return;

    this.band.SponsorName = this.formSponsor.value.sponsorName;
    this.band.SponsorEmail = this.formDetails.value.sponsorEmail;
    this.band.SponsorPhone = this.formDetails.value.SponsorPhone;
    this.editingSponsor = false;
    this.updateBand();
  }

  updateBand(): void {
    console.log(this.formDetails.value);
    console.log(this.formSponsor.value);
    this.bandsService.updateBand(this.band).subscribe({
      error: (err) => console.log(err.message)
    });
  }

}
