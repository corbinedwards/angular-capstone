import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private bandsService: BandsService) { 
    this.registerForm = new FormGroup({
      bandName: new FormControl(null, { validators: Validators.required }),
      label: new FormControl(null, { validators: Validators.required }),
      sponsorName: new FormControl(null, { validators: Validators.required }),
      sponsorPhone: new FormControl(null, { validators: Validators.required }),
      sponsorEmail: new FormControl(null, { validators: Validators.email }),
      maxMembers: new FormControl(1, { validators: Validators.min(1) })
    });
  }

  ngOnInit(): void {
    this.bandsService.getLabels().subscribe({
      next: (labels: Label[]) => this.labels = labels,
      error: (err) => console.log(err.message)
    });
  }

  onSubmit(formValues: any): void {
    
  }
}
