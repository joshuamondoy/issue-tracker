import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewIssuesComponent } from './components/main/issues/view-issues/view-issues.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'issues/:id', component: ViewIssuesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
