import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectNeuroneComponent } from './components/project-neurone/project-neurone.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    ProjectNeuroneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
