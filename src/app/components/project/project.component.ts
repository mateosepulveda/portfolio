import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project.service';
import Project, { Slide } from './../../project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  project: Project | null
  slides: Slide[];  
  currentSlide: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
    this.project = null;
    this.slides = [];
    this.currentSlide = -1;
    this.activatedRoute.params.subscribe(params => {
      const projectId = +params['id'];
      let project = this.projectService.getProjectById(projectId);
      if (project === null) {
        this.router.navigate(['/about']);
      } else {
        this.project = project;
        this.slides = this.project.slides;
        this.currentSlide = 0;
      }
    });
  }

  getCurrentSlideUrl(): string {
    let a = `url('${this.slides[this.currentSlide].imageFile}')`;
    console.log(a);
    return a;
  }

  navigateToProjectsList(): void {
    this.router.navigate(['/projects-list']);
  }
}
