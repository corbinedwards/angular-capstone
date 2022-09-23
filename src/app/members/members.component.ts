import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Band } from '../models/band';
import { Member } from '../models/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MembersComponent),
      multi: true
    }
  ],
})
export class MembersComponent implements OnInit, ControlValueAccessor {

  @Input() band!: Band;
  @Input() formControlName!: string;
  @ViewChild('membersTable') table: Table | undefined;

  control!: AbstractControl | null;
  members: Member[] = [];
  maxMembers: number = 1;
  touched: boolean = false;
  onChange = (member: any) => {};
  onTouched = () => {};

  constructor( private controlContainer: ControlContainer ) {
  }

  ngOnInit(): void {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control?.get(this.formControlName) ?? null;
    }
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
    this.markAsTouched();
    this.members.push(member);
    this.onChange(this.members);
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouched = fn;
  }
  writeValue(members: any){
    this.members = members;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
