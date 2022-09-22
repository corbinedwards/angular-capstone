import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] = [];
  maxMembers: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.members.push({
      MemberId: 0,
      MemberEmail: 'test@gmail.com',
      MemberName: 'Test Smith',
      MemberPhone: '501-654-5555'
    });
  }

}
