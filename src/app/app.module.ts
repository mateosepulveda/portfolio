import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { environment } from '../environments/environment';
import { ProjectService } from './project.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export function getBaseHref(): string {
  return environment.baseHref;
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    ProjectComponent,
    ProjectsListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProjectService, { provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation] }],
  bootstrap: [AppComponent]
})
export class AppModule { }