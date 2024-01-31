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
  projectFile = 'assets/projects.json';
  projects: Project[];
  projectsFiltered: Project[];
  projectTags: string[];
  currentFilter: string;

  constructor(private router: Router, private projectService: ProjectService) {
    if (this.projectService.projectsLoaded() == false) {
      fetch(this.projectFile).then(res => res.json())
      .then(json => {
        this.projectService.setProjects(json);
        this.projects = json;
        this.projectsFiltered = [...this.projects];
        this.projectTags = this.projectService.getProjectTags();
        this.currentFilter = '';
        return;
      });
    }
    this.projects = this.projectService.getProjects();
    this.projectsFiltered = [...this.projects];
    this.projectTags = this.projectService.getProjectTags();
    this.currentFilter = '';
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
