import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(private router: Router) {}

  loadProjectNeurone(): void {
    this.router.navigate(['/project-neurone']);
  }
}
