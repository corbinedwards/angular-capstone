import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterComponent } from './register.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveRegisterGuardService implements CanDeactivate<RegisterComponent> {

  constructor() { }

  canDeactivate(component: RegisterComponent): Observable<boolean> | boolean {
    return component.canDeactivate() || window.confirm('Are you sure you want to leave registration? All progress will be lost.');
  }
}
