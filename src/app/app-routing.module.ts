import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectComponent } from './components/project/project.component';
import { LinksComponent } from './components/links/links.component';
import { CreditsComponent } from './components/credits/credits.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'projects-list', component: ProjectsListComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'links', component: LinksComponent },
  { path: 'credits', component: CreditsComponent },
  { path: '', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
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
