import { Injectable } from '@angular/core';
import Project from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectFile: string = 'assets/projects/projects.json';
  private projects: Project[] = [];
  private projectTags: string[] = [];
  private dataPromise: Promise<void>;

  private monthsDictionary: { [key: number]: string } = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
  }

  constructor() {
    this.dataPromise = this.fetchProjects();
  }

  private async fetchProjects(): Promise<void> {
    const response = await fetch(this.projectFile);
    const json = await response.json();
    this.projects = json;
    this.addDateStrings();
    this.addCompletedTags();
    this.sortProjects();
    this.setProjectTags();
  }

  async dataReady(): Promise<void> {
    return this.dataPromise;
  }

  addDateStrings(): void {
    for (let i = 0; i < this.projects.length; i++) {
      var dateString = '';
      if (this.projects[i].completed === true) {
        const startDate = this.projects[i].startDate;
        const endDate = this.projects[i].endDate;
        if (startDate.month === endDate!.month && startDate.year === endDate!.year) {
          dateString = dateString.concat(`${this.monthsDictionary[startDate.month]} ${startDate.year}`);
        } else {
          dateString = dateString.concat(`${this.monthsDictionary[startDate.month]} ${startDate.year} — ${this.monthsDictionary[endDate!.month]} ${endDate!.year}`);
        }
      } else {
        dateString = dateString.concat('En desarrollo');
      }
      this.projects[i]['dateString'] = dateString;
    }
  }

  addCompletedTags(): void {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].completed === true) {
        this.projects[i].tags.push('Completados');
      } else {
        this.projects[i].tags.push('En desarrollo');
      }
    }
  }

  sortProjects(): void {
    this.projects.sort((a, b) => {
      const yearComparison = b.startDate.year - a.startDate.year;
      if (yearComparison !== 0) {
        return yearComparison;
      } else {
        return b.startDate.month - a.startDate.month;
      }
    });
  }

  setProjectTags(): void {
    for (let i = 0; i < this.projects.length; i++) {
      for (let j = 0; j < this.projects[i].tags.length; j++) {
        if (this.projectTags.indexOf(this.projects[i].tags[j]) === -1) {
          this.projectTags.push(this.projects[i].tags[j]);
        }
      }
    }

    this.sortProjectTags();
  }

  sortProjectTags(): void {
    this.projectTags.sort((a, b) => {
      if (a === "Completados") {
        return -1;
      } else if (b === "Completados") {
        return 1;
      }
      if (a === "En desarrollo") {
        return -1;
      } else if (b === "En desarrollo") {
        return 1;
      }
      if (a === "Frontend") {
        return -1;
      } else if (b === "Frontend") {
        return 1;
      }
      if (a === "Backend") {
        return -1;
      } else if (b === "Backend") {
        return 1;
      }
      return a.localeCompare(b);
    });
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectTags(): string[] {
    return this.projectTags;
  }

  getProjectByShortTitle(projectShortTitle: string): Project | null {
    const projectsFiltered = this.projects.filter(project => project.shortTitle === projectShortTitle);
    if (projectsFiltered.length === 1) {
      return projectsFiltered[0];
    } else {
      return null;
    }
  }
}