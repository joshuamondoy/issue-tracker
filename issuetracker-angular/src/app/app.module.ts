import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { IssuesComponent } from './components/main/issues/issues.component';
import { NavBarComponent } from './components/main/nav-bar/nav-bar.component';
import { ViewIssuesComponent } from './components/main/issues/view-issues/view-issues.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IssuesComponent,
    NavBarComponent,
    ViewIssuesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
