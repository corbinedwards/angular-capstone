import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { LeaveDetailGuardService } from './details/leave-detail-guard.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LeaveRegisterGuardService } from './register/leave-register-guard.service';
import { RegisterComponent } from './register/register.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results', component: SearchResultsComponent },
  { path: 'register', component: RegisterComponent, canDeactivate: [ LeaveRegisterGuardService ] },
  { path: 'details/:id', component: DetailsComponent, canDeactivate: [ LeaveDetailGuardService ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
