import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { Label } from '../models/label';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  labels: Label[] =[];
  selectedLabel!: Label;
  band: Band = {
    GroupId: 0,
    GroupName: '',
    OrganizationName: '',
    SponsorName: '',
    SponsorPhone: '',
    SponsorEmail: '',
    MaxGroupSize: 1,
    Members: []
  }

  constructor(private bandsService: BandsService, private router: Router) { 
    this.registerForm = new FormGroup({
      bandName: new FormControl('', { validators: Validators.required }),
      label: new FormControl(null, { validators: Validators.required }),
      sponsorName: new FormControl('', { validators: Validators.required }),
      sponsorPhone: new FormControl('', { validators: Validators.required }),
      sponsorEmail: new FormControl('', { validators: Validators.email }),
      maxMembers: new FormControl(1, { validators: Validators.min(1) })
    }, 
    { updateOn: 'blur' });
  }

  ngOnInit(): void {
    this.bandsService.getLabels().subscribe({
      next: (labels: Label[]) => this.labels = labels,
      error: (err) => console.log(err.message)
    });
    
    this.registerForm.valueChanges.subscribe(value => {
      this.band.GroupName = value.bandName;
      this.band.OrganizationName = value.label?.OrganizationName;
      this.band.SponsorName = value.sponsorName;
      this.band.SponsorPhone = value.sponsorPhone;
      this.band.SponsorEmail = value.sponsorEmail;
      this.band.MaxGroupSize = value.maxMembers;
    });
  }

  onSubmit(formValues: any): void {
    this.bandsService.createNewBand(this.band).subscribe({
      next: (band) => this.router.navigate(['results', { query: band.GroupName }]),
      error: (err) => console.log(err.message)
    })
  }
}
