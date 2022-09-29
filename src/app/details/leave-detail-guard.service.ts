import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { DetailsComponent } from './details.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveDetailGuardService implements CanDeactivate<DetailsComponent> {

  constructor() { }

  canDeactivate(component: DetailsComponent): boolean {
      return component.canDeactivate() || window.confirm('Are you sure you want to leave this page? All progress will be lost.');
  }
}
