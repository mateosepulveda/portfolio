import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
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
  currentFilter: string = '';
  projectsFadeIn: boolean = false;
  hoverEnabled: boolean = true;
  fadeInTime: number = 1000;

  constructor(private projectService: ProjectService) {
  }

  async ngOnInit(): Promise<void> {
    await this.projectService.dataReady();
    this.projects = this.projectService.getProjects();
    this.projectsFiltered = [...this.projects];
    this.projectTags = this.projectService.getProjectTags();
    this.currentFilter = '';
    if (this.hasTouch() === true) {
      this.hoverEnabled = false;
    }
  }

  unfilterProjects(): void {
    if ((this.projects !== null) && (this.projectsFadeIn === false)) {
      if (this.hoverEnabled === true) {
        this.projectsFadeIn = true;
      }
      this.projectsFiltered = [...this.projects];
      this.currentFilter = '';
      if (this.hoverEnabled === true) {
        setTimeout(() => {
          this.projectsFadeIn = false;
        }, this.fadeInTime);
      }
    }
  }

  filterProjects(projectTag: string): void {
    if ((this.projects !== null) && (this.projectsFadeIn === false)) {
      if (this.hoverEnabled === true) {
        this.projectsFadeIn = true;
      }
      this.projectsFiltered = this.projects.filter(project => project.tags.includes(projectTag));
      this.currentFilter = projectTag;
      if (this.hoverEnabled === true) {
        setTimeout(() => {
          this.projectsFadeIn = false;
        }, this.fadeInTime);
      }
    }
  }

  hasTouch(): boolean {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
