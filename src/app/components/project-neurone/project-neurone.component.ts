import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-neurone',
  templateUrl: './project-neurone.component.html',
  styleUrls: ['./project-neurone.component.css']
})
export class ProjectNeuroneComponent {
  constructor(private router: Router) {}

  // Maybe turn it into a service for all individual project pages to load
  loadProjects(): void {
    this.router.navigate(['/projects']);
  }
}
