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
  project: Project | null = null;
  slides: Slide[] = [];
  currentSlide: number = 0;
  firstSlide: boolean = false;
  lastSlide: boolean = false;
  displaySlides: boolean[] = Array(this.slides.length).fill(false);

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
  }

  async ngOnInit(): Promise<void> {
    await this.projectService.dataReady();
    this.activatedRoute.params.subscribe(params => {
      const projectId = +params['id'];
      const project = this.projectService.getProjectById(projectId);
      if (project === null) {
        this.router.navigate(['/page-not-found']);
      } else {
        this.project = project;
        this.slides = this.project.slides;
        this.displaySlides = Array(this.slides.length).fill(false);
        this.changeSlide(this.currentSlide);
      }
    });
  }

  navigateToProjectsList(): void {
    this.router.navigate(['/projects-list']);
  }

  changeSlide(n: number) {
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
    this.checkFirstLastSlide();
  }

  checkFirstLastSlide() {
    if (this.slides.length === 1) {
      this.firstSlide = true;
      this.lastSlide = true;
    } else {
      if (this.currentSlide === this.slides.length - 1) {
        this.firstSlide = false;
        this.lastSlide = true;
      } else if (this.currentSlide === 0) {
        this.firstSlide = true;
        this.lastSlide = false;
      } else {
        this.firstSlide = false;
        this.lastSlide = false;
      }
    }
  }

  nextSlide() {
    if (this.currentSlide == this.slides.length - 1) {
      return;
    }
    this.changeSlide(this.currentSlide + 1);
  }

  previousSlide() {
    if (this.currentSlide == 0) {
      return;
    }
    this.changeSlide(this.currentSlide - 1);
  }
}
