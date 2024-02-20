import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import Project from './../../interfaces/project.interface';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] | null = null;
  projectsFiltered: Project[] = [];
  projectTags: string[] = [];
  projectsFadeIn: boolean = false;
  currentFilter: string = '';

  constructor(private router: Router, private projectService: ProjectService) {
  }

  async ngOnInit(): Promise<void> {
    await this.projectService.dataReady();
    this.projects = this.projectService.getProjects();
    this.projectsFiltered = [...this.projects];
    this.projectTags = this.projectService.getProjectTags();
    this.currentFilter = '';
  }

  unfilterProjects(): void {
    if ((this.projects !== null) && (this.projectsFadeIn === false)) {
      this.projectsFadeIn = true;
      this.projectsFiltered = [...this.projects];
      this.currentFilter = '';
      setTimeout(() => {
        this.projectsFadeIn = false;
      }, 1000);
    }
  }

  filterProjects(projectTag: string): void {
    if ((this.projects !== null) && (this.projectsFadeIn === false)) {
      this.projectsFadeIn = true;
      this.projectsFiltered = this.projects.filter(project => project.tags.includes(projectTag));
      this.currentFilter = projectTag;
      setTimeout(() => {
        this.projectsFadeIn = false;
      }, 1000);
    }
  }
}
