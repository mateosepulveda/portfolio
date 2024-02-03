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
  displaySlides: boolean[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
    this.project = null;
    this.slides = [];
    this.currentSlide = -1;
    this.displaySlides = Array(this.slides.length).fill(false);
    this.activatedRoute.params.subscribe(params => {
      const projectId = +params['id'];
      let project = this.projectService.getProjectById(projectId);
      if (project === null) {
        this.router.navigate(['/about']);
      } else {
        this.project = project;
        this.slides = this.project.slides;
        this.displaySlides = Array(this.slides.length).fill(false);
        this.showSlide(0);
      }
    });
  }

  navigateToProjectsList(): void {
    this.router.navigate(['/projects-list']);
  }

  showSlide(n: number) {
    if (n > this.slides.length - 1) {
      return;
    }

    if (n < 0) {
      return;
    }

    this.currentSlide = n;
    for (let i = 0; i < this.displaySlides.length; i++) {
      if (i != this.currentSlide) {
        this.displaySlides[i] = false;
      } else {
        this.displaySlides[i] = true;
      }
    }

    console.log(this.displaySlides);
  }

  plusSlides(move: string) {
    if ((this.currentSlide == this.slides.length - 1) && (move === 'forward')) {
      return;
    }

    if ((this.currentSlide == 0) && (move === 'back')) {
      return;
    }

    if (move === 'back') {
      this.showSlide(this.currentSlide - 1);
    } else if (move === 'forward') {
      this.showSlide(this.currentSlide + 1);
    }
  }
}
