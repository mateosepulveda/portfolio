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
  zIndexSlide: number = 0;
  firstSlide: boolean = false;
  lastSlide: boolean = false;
  displaySlides: boolean[] = []
  displayCaptions: boolean[] = []
  carouselIntervalId: any = null;
  carouselDirection: string = 'forward';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
  }

  async ngOnInit(): Promise<void> {
    await this.projectService.dataReady();
    this.activatedRoute.params.subscribe(async params => {
      const projectShortTitle = params['shorttitle'];
      const project = this.projectService.getProjectByShortTitle(projectShortTitle);
      if (project === null) {
        this.router.navigate(['/page-not-found']);
      } else {
        this.project = project;
        this.slides = this.project.slides;
        this.displaySlides = Array(this.slides.length).fill(false);
        this.displayCaptions = Array(this.slides.length).fill(false);
        this.handleSlideChange(this.currentSlide);
        this.updateCarousel = this.updateCarousel.bind(this);
        this.startCarousel();
      }
    });
  }

  handleSlideChange(slideIndex: number): void {
    if ((slideIndex < 0) || (slideIndex > this.slides.length - 1)) {
      return;
    }
    var currentSlideSnapshot = this.currentSlide;
    this.currentSlide = slideIndex;
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
    this.changeZIndex(currentSlideSnapshot, slideIndex);
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

  changeZIndex(currentSlideSnapshot: number, slideIndex: number): void {
    if (slideIndex > currentSlideSnapshot) {
      this.zIndexSlide = this.currentSlide;
    } else {
      setTimeout(() => {
        this.zIndexSlide = this.currentSlide;
      }, 500);
    }
  }

  nextSlide(): void {
    clearInterval(this.carouselIntervalId);
    this.handleSlideChange(this.currentSlide + 1);
    this.carouselDirection = 'forward';
  }

  previousSlide(): void {
    clearInterval(this.carouselIntervalId);
    this.handleSlideChange(this.currentSlide - 1);
    this.carouselDirection = 'backward';
  }

  changeSlide(slideIndex: number): void {
    if (slideIndex > this.currentSlide) {
      this.carouselDirection = 'forward';
    } else if (slideIndex < this.currentSlide) {
      this.carouselDirection = 'backward';
    }
    this.handleSlideChange(slideIndex);
  }

  startCarousel(): void {
    this.carouselIntervalId = setInterval(this.updateCarousel, 5000);
  }

  pauseCarousel(): void {
    clearInterval(this.carouselIntervalId);
  }

  updateCarousel(): void {
    if (this.carouselDirection === 'forward') {
      if (this.currentSlide === this.slides.length - 1) {
        this.handleSlideChange(0);
      } else {
        this.handleSlideChange(this.currentSlide + 1);
      }
    } else {
      if (this.currentSlide === 0) {
        this.handleSlideChange(this.slides.length - 1);
      } else {
        this.handleSlideChange(this.currentSlide - 1);
      }
    }
  }
}
