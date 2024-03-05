import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from './../../interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project | null = null;
  images: string[] = [];
  currentImage: number = 0;
  zIndexImage: number = 0;
  firstImage: boolean = false;
  lastImage: boolean = false;
  displayImages: boolean[] = []
  displayCaptions: boolean[] = []
  carouselIntervalId: any = null;
  carouselDirection: string = 'forward';
  hoverEnabled: boolean = true;

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
        this.images = this.project.images;
        this.displayImages = Array(this.images.length).fill(false);
        this.displayCaptions = Array(this.images.length).fill(false);
        this.handleImageChange(this.currentImage);
        if (this.images.length > 1) {
          this.updateCarousel = this.updateCarousel.bind(this);
          this.startCarousel();
        }
        if (this.hasTouch() === true) {
          this.hoverEnabled = false;
        }
      }
    });
  }

  handleImageChange(imageIndex: number): void {
    if ((imageIndex < 0) || (imageIndex > this.images.length - 1)) {
      return;
    }
    var currentImageSnapshot = this.currentImage;
    this.currentImage = imageIndex;
    for (let i = 0; i < this.displayImages.length; i++) {
      if (i <= this.currentImage) {
        this.displayImages[i] = true;
      } else {
        this.displayImages[i] = false;
      }
    }
    for (let i = 0; i < this.displayCaptions.length; i++) {
      if (i === this.currentImage) {
        this.displayCaptions[i] = true;
      } else {
        this.displayCaptions[i] = false;
      }
    }
    this.checkFirstLastImage();
    this.changeZIndex(currentImageSnapshot, imageIndex);
  }

  checkFirstLastImage(): void {
    if (this.images.length === 1) {
      this.firstImage = true;
      this.lastImage = true;
    } else {
      if (this.currentImage === 0) {
        this.firstImage = true;
        this.lastImage = false;
      } else if (this.currentImage === this.images.length - 1) {
        this.firstImage = false;
        this.lastImage = true;
      } else {
        this.firstImage = false;
        this.lastImage = false;
      }
    }
  }

  changeZIndex(currentImageSnapshot: number, imageIndex: number): void {
    if (imageIndex > currentImageSnapshot) {
      this.zIndexImage = this.currentImage;
    } else {
      setTimeout(() => {
        this.zIndexImage = this.currentImage;
      }, 500);
    }
  }

  nextImage(): void {
    clearInterval(this.carouselIntervalId);
    this.handleImageChange(this.currentImage + 1);
    this.carouselDirection = 'forward';
  }

  previousImage(): void {
    clearInterval(this.carouselIntervalId);
    this.handleImageChange(this.currentImage - 1);
    this.carouselDirection = 'backward';
  }

  changeImage(imageIndex: number): void {
    if (imageIndex > this.currentImage) {
      this.carouselDirection = 'forward';
    } else if (imageIndex < this.currentImage) {
      this.carouselDirection = 'backward';
    }
    this.handleImageChange(imageIndex);
  }

  startCarousel(): void {
    this.carouselIntervalId = setInterval(this.updateCarousel, 5000);
  }

  pauseCarousel(): void {
    clearInterval(this.carouselIntervalId);
  }

  updateCarousel(): void {
    if (this.carouselDirection === 'forward') {
      if (this.currentImage === this.images.length - 1) {
        this.handleImageChange(0);
      } else {
        this.handleImageChange(this.currentImage + 1);
      }
    } else {
      if (this.currentImage === 0) {
        this.handleImageChange(this.images.length - 1);
      } else {
        this.handleImageChange(this.currentImage - 1);
      }
    }
  }

  hasTouch(): boolean {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
