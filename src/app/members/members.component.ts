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

  editForm!: FormGroup;
  members: Member[] = [];
  maxMembers: number = 1;

  @Input() band!: Band;
  @ViewChild('membersTable') table: Table | undefined;

  constructor(fb: FormBuilder) { 
    this.editForm = fb.group({
      memberName: ['', Validators.required],
      memberEmail: [''],
      memberPhone: ['']
    });
  }

  ngOnInit(): void {
    this.band?.Members.push({
      MemberId: 1,
      MemberEmail: 'test@gmail.com',
      MemberName: 'Test Smith',
      MemberPhone: '501-654-5555'
    });
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

  saveMember(): void {
    
  }

}
