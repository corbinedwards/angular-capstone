import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { MembersComponent } from '../members/members.component';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @ViewChild('maxMembers') maxMembersDropdown: Dropdown | undefined;
  @ViewChild('membersComponent') membersComponent: MembersComponent | undefined;

  band: Band = new Band();
  labels: string[] = [];
  editingDetails: boolean = false;
  editingSponsor: boolean = false;
  formDetails: FormGroup;
  formSponsor: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private bandsService: BandsService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private toastMessageService: ToastMessageService,
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

  canDeactivate(): boolean {
    let deactivate = this.formDetails.pristine && this.formSponsor.pristine;
    if (this.membersComponent) {
      deactivate = (deactivate && Object.entries(this.membersComponent?.membersEditing).length === 0);
    }
    return deactivate;
  }

  deleteBand(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to permanently delete this band? All member data will also be lost.`,
      accept: () => {
        this.bandsService.deleteBand(this.band.GroupId).subscribe({
          next: () => this.router.navigate(['results']),
          error: (err) => this.toastMessageService.errorMessage('Error Deleteing Band', err.message)
        })
      },
      key: 'deleteBand'
    })
  }

  editBandDetails(): void {
    if (this.editingDetails) return;

    this.formDetails.get('bandName')?.setValue(this.band.GroupName);
    this.formDetails.get('label')?.setValue(this.band.OrganizationName);
    this.formDetails.get('maxMembers')?.setValue(this.band.MaxGroupSize);
    this.editingDetails = true;
  }

  editBandDetailsCancel(): void {
    this.editingDetails = false;
    this.formDetails.markAsPristine();
  }

  editSponsorDetails(): void {
    if (this.editingSponsor) return;

    this.formSponsor.get('sponsorName')?.setValue(this.band.SponsorName);
    this.formSponsor.get('sponsorEmail')?.setValue(this.band.SponsorEmail);
    this.formSponsor.get('sponsorPhone')?.setValue(this.band.SponsorPhone);
    this.editingSponsor = true;
  }

  editSponsorDetailsCancel(): void {
    this.editingSponsor = false;
    this.formSponsor.markAsPristine();
  }

  onSubmitDetails(): void {
    if (!this.formDetails.dirty || !this.formDetails.valid) return;

    this.band.GroupName = this.formDetails.value.bandName;
    this.band.OrganizationName = this.formDetails.value.label;
    this.band.MaxGroupSize = this.formDetails.value.maxMembers;
    this.editingDetails = false;
    this.updateBand();
  }

  onSubmitSponsor(): void {
    if (!this.formSponsor.dirty || !this.formSponsor.valid) return;

    this.band.SponsorName = this.formSponsor.value.sponsorName;
    this.band.SponsorEmail = this.formSponsor.value.sponsorEmail;
    this.band.SponsorPhone = this.formSponsor.value.sponsorPhone;
    this.editingSponsor = false;
    this.updateBand();
  }

  updateBand(): void {
    this.bandsService.updateBand(this.band).subscribe({
      next: (value) => this.toastMessageService.successMessage('Band successfully updated.'),
      error: (err) => this.toastMessageService.errorMessage('Error Updating Band', err.message) 
    });
  }

}
