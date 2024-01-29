import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './project.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  menuWidth = '0%' ;
  projectDataUrl = 'assets/projects.json';

  constructor(private router: Router, private projectService: ProjectService) {
    fetch(this.projectDataUrl).then(res => res.json())
    .then(json => {
      this.projectService.setProjects(json);
      console.log(json);
    });
  }

  showMenu(): void {
    this.menuWidth = '100%';
  }

  hideMenu(): void {
    this.menuWidth = '0%';
  }

  navigate(destination: string): void {
    switch (destination) {
      case 'about':
        this.router.navigate(['/about']);
        this.hideMenu();
        break;
      case 'projects':
        this.router.navigate(['/projects-list']);
        this.hideMenu();
        break;
      case 'contact':
        this.router.navigate(['/contact']);
        this.hideMenu();
        break;
      default:
        this.router.navigate(['/about']);
        this.hideMenu();
    }
  }
}
