import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Band } from '../models/band';
import { Label } from '../models/label';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ MessageService ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  labels: Label[] =[];
  selectedLabel!: Label;
  band: Band = new Band();

  constructor(
    private bandsService: BandsService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title
  ) {
    this.registerForm = fb.group({
      bandName: ['', [ Validators.required ] ],
      label: [null, [ Validators.required ] ],
      sponsorName: ['', [ Validators.required ] ],
      sponsorPhone: ['', [ Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}') ] ],
      sponsorEmail: ['', [ Validators.email ] ],
      maxMembers: [1, [ Validators.min(1) ] ]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Register Band - Battle of the Bands');
    
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
      next: (band) => {
        this.router.navigate(['details', band.GroupId]);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error', 
          summary: 'Error', 
          detail: err.message,
          life: 10000
        });
      }
    })
  }
}
