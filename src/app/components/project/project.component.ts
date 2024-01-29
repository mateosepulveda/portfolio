import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project.service';
import Project from './../../project.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  project: Project | null

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
    this.project = null;
    this.activatedRoute.params.subscribe(params => {
      const projectId = +params['id'];
      let project = this.projectService.getProjectById(projectId);
      if (project === null) {
        this.router.navigate(['/about']);
      } else {
        this.project = project;
      }
    });
  }

  navigateToProjectsList(): void {
    this.router.navigate(['/projects-list']);
  }
}
