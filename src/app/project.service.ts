import { Injectable } from '@angular/core';
import Project from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[];
  private projectTags: string[];

  constructor() {
    this.projects = [];
    this.projectTags = [];
  }

  setProjects(projects: any) {
    this.projects = projects;
    this.setProjectTags();
  }

  getProjects() {
    return this.projects;
  }

  setProjectTags() {
    for (let i = 0; i < this.projects.length; i++) {
      for (let j = 0; j < this.projects[i].tags.length; j++) {
        if (this.projectTags.indexOf(this.projects[i].tags[j]) === -1) {
          this.projectTags.push(this.projects[i].tags[j]);
        }
      }
    }
    this.projectTags.sort();
  }

  getProjectTags() {
    return this.projectTags;
  }

  getProjectById(projectId: number) {
    var projectsFiltered = this.projects.filter(project => project.id === projectId);
    if (projectsFiltered.length == 1) {
      return projectsFiltered[0];
    } else {
      return null;
    }
  }

  projectsLoaded() {
    return this.projects.length != 0;
  }
}