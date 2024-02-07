import { Injectable } from '@angular/core';
import Project from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectFile = 'assets/projects/projects.json';
  private projects: Project[] = [];
  private projectTags: string[] = [];
  private dataPromise: Promise<void>;

  constructor() {
    this.dataPromise = this.fetchProjects();
  }

  private async fetchProjects(): Promise<void> {
    const response = await fetch(this.projectFile);
    const json = await response.json();
    this.projects = json;
    this.setProjectTags();
  }

  async dataReady(): Promise<void> {
    return this.dataPromise;
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

  getProjects() {
    return this.projects;
  }

  getProjectTags() {
    return this.projectTags;
  }

  getProjectById(projectId: number) {
    const projectsFiltered = this.projects.filter(project => project.id === projectId);
    if (projectsFiltered.length == 1) {
      return projectsFiltered[0];
    } else {
      return null;
    }
  }
}