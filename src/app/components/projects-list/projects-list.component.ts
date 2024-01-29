import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './../../project.service';
import Project from './../../project.interface';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  projects: Project[];
  projectsFiltered: Project[];
  projectTags: string[];
  currentFilter: string;

  constructor(private router: Router, private projectDataService: ProjectService) {
    this.projects = this.projectDataService.getProjects();
    this.projectsFiltered = [...this.projects];
    this.projectTags = this.projectDataService.getProjectTags();
    this.currentFilter = "";
  }

  navigateToProject(projectId: number): void {
    this.router.navigate(['/project/', projectId]);
  }

  unfilterProjects(): void {
    this.projectsFiltered = [...this.projects];
    this.currentFilter = "";
  }

  filterProjects(projectTag: string): void {
    this.projectsFiltered = this.projects.filter(project => project.tags.includes(projectTag));
    this.currentFilter = projectTag;
  }
}
