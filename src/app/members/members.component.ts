import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Band } from '../models/band';
import { Member } from '../models/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] = [];
  maxMembers: number = 1;

  @Input() band!: Band;
  @ViewChild('membersTable') table: Table | undefined;

  constructor() {
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

  saveMember(member: any): void {
    
  }

}
