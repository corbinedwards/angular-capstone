import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
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

  membersEditing: { [s: number]: Member } = {};
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
      const newRow = this.table?.value.find(row => row.MemberId === 0);
      
      if (newRow) {
        this.membersEditing[newRow.MemberId] = { ...newRow };
        this.table?.initRowEdit(newRow);
      }
    }
  }

  membersAtCapacity(): boolean {
    return this.band?.MaxGroupSize <= this.band?.Members.length;
  }

  onKeyDown(event: KeyboardEvent, member: Member, rowIndex: number): void {
    if (event.key === 'Escape') {
      this.table?.cancelRowEdit(this.table?.value[rowIndex]);
      this.onMemberEditCancel(member, rowIndex);
    }
  }

  onMemberDelete(member: Member, rowIndex: number): void {
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

  onMemberEdit(member: Member, rowIndex: number): void {
    const currentRow = this.table?.value[rowIndex];
    if (currentRow) {
      this.membersEditing[member.MemberId] = { ...member };
      this.table?.initRowEdit(currentRow);
    }
  }

  onMemberEditCancel(member: Member, rowIndex: number): void {
    const memberEditing = this.membersEditing[member.MemberId];
    (member.MemberId === 0) ? this.removeMember(member) : this.band.Members[rowIndex] = memberEditing;
    delete this.membersEditing[memberEditing.MemberId];
  }

  saveMember(member: any): void {
    if (!this.validateMember(member)) return

    if (member.MemberId === 0) {
      this.bandsService.addMember(this.band.GroupId, member).subscribe({
        next: (newMember: Member) => {
          const currentMember = this.band.Members.find(findMember => findMember.MemberId === 0);
          if (currentMember) currentMember.MemberId = newMember.MemberId;
          delete this.membersEditing[0];
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
          delete this.membersEditing[member.MemberId];
          this.toastMessageService.successMessage('Member successfully updated.');
        },
        error: (err) => this.toastMessageService.errorMessage('Error Editing Member', err.message)
      });
    }
  }

  private removeMember(member: Member) {
    const memberIndex = this.band?.Members.indexOf(member);      
    if (memberIndex > -1) this.band?.Members.splice(memberIndex, 1);
  }

  private validateMember(member: Member): boolean {
    let invalid = (member.MemberName == undefined || member.MemberName.trim() === "");
    invalid = (invalid || member.MemberEmail === undefined || member.MemberEmail.trim() === "" 
              || !member.MemberEmail.match('.+@.+'));
    invalid = (invalid || member.MemberPhone === undefined || member.MemberPhone.trim() === "" 
              || !member.MemberPhone.match('[0-9]{3}-[0-9]{3}-[0-9]{4}'));
    return !invalid;
  }
}
