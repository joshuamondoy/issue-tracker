import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavBarComponent } from './components/main/nav-bar/nav-bar.component';
import { OpenIssuesComponent } from './components/main/open-issues/open-issues.component';
import { ClosedIssuesComponent } from './components/main/closed-issues/closed-issues.component';
import { ViewIssueComponent } from './components/main/open-issues/view-issue/view-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    OpenIssuesComponent,
    ClosedIssuesComponent,
    ViewIssueComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
