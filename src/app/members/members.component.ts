import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Band } from '../models/band';
import { Member } from '../models/member';
import { Table } from 'primeng/table';

import { BandsService } from '../services/bands.service';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {

  @Input() band!: Band;
  @Input() formControlName!: string;
  @ViewChild('membersTable') table: Table | undefined;

  members: Member[] = [];
  maxMembers: number = 1;

  constructor(
    private bandsService: BandsService, 
    private confirmationService: ConfirmationService,
    private toastMessageService: ToastMessageService
  ) { }

  ngOnInit(): void {
  }

  addMember(): void {
    if (!this.membersAtCapacity()) {
      const newMember: Member = new Member();
      this.band?.Members.push(newMember);
      const newRow = this.getCurrentMemberRow(newMember);
      this.table?.initRowEdit(newRow);
    }
  }

  membersAtCapacity(): boolean {
    return this.band?.MaxGroupSize <= this.band?.Members.length;
  }

  onKeyDown(event: KeyboardEvent, member: Member): void {
    const currentRow = this.getCurrentMemberRow(member);
    if (event.key === 'Escape' && currentRow) {
      this.table?.cancelRowEdit(currentRow);
      if (member.MemberId === 0) this.removeMember(member);
    }
  }

  onMemberDelete(member: Member): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to remove '${member.MemberName}' from the band?`,
      accept: () => {
        this.bandsService.deleteMember(this.band.GroupId, member.MemberId).subscribe({
          next: (value) => {
            this.removeMember(member);
            this.toastMessageService.successMessage('Member successfully removed.');
          },
          error: (err) => this.toastMessageService.errorMessage('Error Removing Member', err.message)
        });
      },
      key: 'removeMember'
    })
  }

  onMemberEdit(member: Member): void {
    const currentRow = this.getCurrentMemberRow(member);
    if (currentRow) this.table?.initRowEdit(currentRow);
  }

  onMemberEditCancel(member: Member): void {
    if (member.MemberId === 0) this.removeMember(member);
  }

  saveMember(member: any): void {
    if (member.MemberId < 1) {
      this.bandsService.addMember(this.band.GroupId, member).subscribe({
        next: (newMember: Member) => {
          const currentMember = this.band.Members.find(findMember => findMember.MemberId === 0);
          if (currentMember) currentMember.MemberId = newMember.MemberId;
          this.toastMessageService.successMessage('Member successfully added.');
        },
        error: (err) => this.toastMessageService.errorMessage('Error Adding Member', err.message)
      });
    } else {
      this.bandsService.updateMember(this.band.GroupId, member).subscribe({
        next: (value) => {
          const currentMember = this.band.Members.find(findMember => findMember.MemberId === member.MemberId);
          if (currentMember) {
            currentMember.MemberName = member.MemberName;
            currentMember.MemberEmail = member.MemberEmail;
            currentMember.MemberPhone = member.MemberPhone;
          }
          this.toastMessageService.successMessage('Member successfully updated.')
        },
        error: (err) => this.toastMessageService.errorMessage('Error Editing Member', err.message)
      });
    }
  }

  private getCurrentMemberRow(member: Member): Member | null {
    return this.table?.value.find(row => row.MemberId === member.MemberId);
  }

  private removeMember(member: Member) {
    const memberIndex = this.band?.Members.indexOf(member);      
    if (memberIndex > -1) this.band?.Members.splice(memberIndex, 1);
  }
}
