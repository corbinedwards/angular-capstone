import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Band } from '../models/band';
import { Member } from '../models/member';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  @Input() band!: Band;
  @Input() formControlName!: string;
  @ViewChild('membersTable') table: Table | undefined;

  members: Member[] = [];
  maxMembers: number = 1;

  constructor(private bandsService: BandsService) {
  }

  ngOnInit(): void {
  }

  addMember(): void {
    const newMember: Member = new Member();
    this.band?.Members.push(newMember);
    const newRow = this.getCurrentMemberRow(newMember);
    this.table?.initRowEdit(newRow);
  }

  onKeyDown(event: KeyboardEvent, member: Member): void {
    const currentRow = this.getCurrentMemberRow(member);
    if (event.key === 'Escape' && currentRow) {
      this.table?.cancelRowEdit(currentRow);
      if (member.MemberId === 0) this.removeMember(member);
    }
  }

  onMemberDelete(member: Member): void {
    this.bandsService.deleteMember(this.band.GroupId, member.MemberId).subscribe({
      next: (value) => this.removeMember(member),
      error: (err) => console.log(err.message)
    });
  }

  onMemberEdit(member: Member): void {
    const currentRow = this.getCurrentMemberRow(member);
    if (currentRow) this.table?.initRowEdit(currentRow);
  }

  saveMember(member: any): void {
    if (member.MemberId < 1) {
      this.bandsService.addMember(this.band.GroupId, member)
      .subscribe({
        next: (data: Member) => {
          const currentMember = this.band.Members.find(member => member.MemberId === 0);
          if (currentMember) currentMember.MemberId = data.MemberId;
        },
        error: (err) => console.log(err.message)
        // TODO: complete with toast
      });
    } else {
      console.log(member);
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
