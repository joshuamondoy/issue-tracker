import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosedIssuesComponent } from './components/main/closed-issues/closed-issues.component';
import { MainComponent } from './components/main/main.component';
import { OpenIssuesComponent } from './components/main/open-issues/open-issues.component';
import { ViewIssueComponent } from './components/main/open-issues/view-issue/view-issue.component';

const routes: Routes = [
  { path: '', redirectTo: 'issues/open-issues', pathMatch: 'full' },
  {
    path: 'issues',
    component: MainComponent,
    children: [
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
