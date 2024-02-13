import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  introEnabled = true;
  menuWidth = '0%';
  menuTextOpacity = '0';
  menuOpen = false;

  constructor(private renderer2: Renderer2, private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.introEnabled = false;
    }, 3000);

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/') {
        this.introEnabled = false;
      }
    });

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo(0, 0);
      this.hideMenu();
    });
  }

  showMenu(): void {
    this.menuWidth = '100%';
    this.menuTextOpacity = '1';
    this.menuOpen = true;
    this.renderer2.setStyle(document.body, 'overflow', 'hidden');
  }

  hideMenu(): void {
    this.menuWidth = '0%';
    this.menuTextOpacity = '0';
    this.menuOpen = false;
    this.renderer2.removeStyle(document.body, 'overflow');
  }

  toggleMenu(): void {
    if (this.menuOpen === false) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
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
      case 'links':
        this.router.navigate(['/links']);
        this.hideMenu();
        break;
      case 'credits':
          this.router.navigate(['/credits']);
          this.hideMenu();
          break;
      default:
        this.router.navigate(['/about']);
        this.hideMenu();
    }
  }
}
