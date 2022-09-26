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
    this.band?.Members.push({
      MemberId: 0,
      MemberEmail: '',
      MemberName: '',
      MemberPhone: ''
    });
    const newRow = this.table?.value[this.table?.value.length - 1];
    this.table?.initRowEdit(newRow);
  }

  onKeyDown(event: KeyboardEvent, member: Member): void {
    const currentRow: Member = this.table?.value.find(row => row.MemberId === member.MemberId);

    if (event.key === 'Escape' && currentRow) {
      this.table?.cancelRowEdit(currentRow);
      
      if (member.MemberId === 0) {
        const memberIndex = this.band?.Members.indexOf(member);      
        this.band?.Members.splice(memberIndex, 1);
      }
    }
  }

  saveMember(member: any): void {
    this.bandsService.addMember(this.band.GroupId, member)
    .subscribe({
      next: (data) => console.log(`Success! ${data}`),
      error: (err) => console.log(err.message)
    });
  }
}
