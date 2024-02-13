import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

import { AboutComponent } from './components/about/about.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectComponent } from './components/project/project.component';
import { LinksComponent } from './components/links/links.component';
import { CreditsComponent } from './components/credits/credits.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectService } from './project.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsListComponent,
    ProjectComponent,
    LinksComponent,
    CreditsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }