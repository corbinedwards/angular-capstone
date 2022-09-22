import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder, 
    private bandsService: BandsService
  ) { 
    this.registerForm = fb.group({
      bandName: ['', Validators.required],
      label: ['', Validators.required],
      sponsorName: ['', Validators.required],
      sponsorPhone: ['', Validators.required],
      sponsorEmail: ['', Validators.email],
      maxMembers: [1, Validators.min(1)]
    });
    
    bandsService.getLabels().subscribe((labels: Label[]) => this.labels = labels);    
  }

  ngOnInit(): void {
  }

}
