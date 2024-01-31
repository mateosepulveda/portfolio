import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  menuWidth = '0%' ;
  shouldCenter = true;

  constructor(private router: Router) {
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
        this.shouldCenter = true;
        this.hideMenu();
        break;
      case 'projects':
        this.router.navigate(['/projects-list']);
        this.shouldCenter = false;
        this.hideMenu();
        break;
      case 'contact':
        this.router.navigate(['/contact']);
        this.shouldCenter = true;
        this.hideMenu();
        break;
      default:
        this.router.navigate(['/about']);
        this.shouldCenter = true;
        this.hideMenu();
    }
  }
}
