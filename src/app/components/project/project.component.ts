import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import Project, { Slide } from './../../interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project | null = null;
  slides: Slide[] = [];
  currentSlide: number = 0;
  firstSlide: boolean = false;
  lastSlide: boolean = false;
  displaySlides: boolean[] = Array(this.slides.length).fill(false);
  displayCaptions: boolean[] = Array(this.slides.length).fill(false);

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
        this.displayCaptions = Array(this.slides.length).fill(false);
        this.changeSlide(this.currentSlide);
      }
    });
  }

  navigateProjectsList(): void {
    this.router.navigate(['/projects-list']);
  }

  changeSlide(n: number): void {
    if (n > this.slides.length - 1) {
      return;
    }
    if (n < 0) {
      return;
    }
    this.currentSlide = n;
    for (let i = 0; i < this.displaySlides.length; i++) {
      if (i <= this.currentSlide) {
        this.displaySlides[i] = true;
      } else {
        this.displaySlides[i] = false;
      }
    }
    for (let i = 0; i < this.displayCaptions.length; i++) {
      if (i === this.currentSlide) {
        this.displayCaptions[i] = true;
      } else {
        this.displayCaptions[i] = false;
      }
    }
    this.checkFirstLastSlide();
  }

  checkFirstLastSlide(): void {
    if (this.slides.length === 1) {
      this.firstSlide = true;
      this.lastSlide = true;
    } else {
      if (this.currentSlide === 0) {
        this.firstSlide = true;
        this.lastSlide = false;
      } else if (this.currentSlide === this.slides.length - 1) {
        this.firstSlide = false;
        this.lastSlide = true;
      } else {
        this.firstSlide = false;
        this.lastSlide = false;
      }
    }
  }

  nextSlide(): void {
    this.changeSlide(this.currentSlide + 1);
  }

  previousSlide(): void {
    this.changeSlide(this.currentSlide - 1);
  }
}
