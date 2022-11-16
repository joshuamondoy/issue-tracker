import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/main/auth/auth.component';
import { ClosedIssuesComponent } from './components/main/closed-issues/closed-issues.component';
import { MainComponent } from './components/main/main.component';
import { OpenIssuesComponent } from './components/main/open-issues/open-issues.component';
import { ViewIssueComponent } from './components/main/open-issues/view-issue/view-issue.component';

const routes: Routes = [
  { path: '', redirectTo: 'issues/home', pathMatch: 'full' },
  {
    path: 'issues',
    component: MainComponent,
    children: [
      { path: 'home', component: AuthComponent },
      { path: 'open-issues', component: OpenIssuesComponent },
      { path: 'closed-issues', component: ClosedIssuesComponent },
    ],
  },

  { path: 'open-issue/:id', component: ViewIssueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
