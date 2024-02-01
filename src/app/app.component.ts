import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  menuWidth = '0%';
  menuTextOpacity = '0';
  hideBottomBar = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.hideBottomBar = true;
    }, 3000);
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  showMenu(): void {
    this.menuWidth = '100%';
    this.menuTextOpacity = '1';
  }

  hideMenu(): void {
    this.menuWidth = '0%';
    this.menuTextOpacity = '0';
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
