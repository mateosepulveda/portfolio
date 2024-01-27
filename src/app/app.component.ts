import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  menuWidth = '0%'
  projectDataUrl = '/assets/project-data.json';

  constructor(private router: Router) {}

  ngOnInit() {
    fetch(this.projectDataUrl).then(res => res.json())
    .then(json => {
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
        this.router.navigate(['/projects']);
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
