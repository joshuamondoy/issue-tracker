import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/main/auth/auth.component';
import { ClosedIssuesComponent } from './components/main/closed-issues/closed-issues.component';
import { MainComponent } from './components/main/main.component';
import { OpenIssuesComponent } from './components/main/open-issues/open-issues.component';
import { ViewIssueComponent } from './components/main/open-issues/view-issue/view-issue.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouteGuard } from './services/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'issues/home', pathMatch: 'full' },
  {
    path: 'issues',
    component: MainComponent,
    children: [
      { path: 'home', component: AuthComponent },
      {
        path: 'open-issues',
        component: OpenIssuesComponent,
        canActivate: [RouteGuard],
      },
      {
        path: 'closed-issues',
        component: ClosedIssuesComponent,
        canActivate: [RouteGuard],
      },
    ],
  },

  {
    path: 'open-issue/:id',
    component: ViewIssueComponent,
    canActivate: [RouteGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
