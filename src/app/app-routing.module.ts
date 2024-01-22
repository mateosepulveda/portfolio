import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectNeuroneComponent } from './components/project-neurone/project-neurone.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project-neurone', component: ProjectNeuroneComponent },
  { path: '**', component: AboutComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
