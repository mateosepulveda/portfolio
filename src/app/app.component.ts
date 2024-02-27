import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  introEnabled: boolean = true;
  menuHeight: string = '0vh';
  menuTransition: boolean = false;
  menuOpen: boolean = false;
  currentPage: string = '/';

  constructor(private renderer2: Renderer2, private router: Router) {
  }

  ngOnInit(): void {
    this.renderer2.setStyle(document.body, 'margin', '0');
    this.renderer2.setStyle(document.body, 'overflow-y', 'scroll');

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/') {
        this.introEnabled = false;
      }
      setTimeout(() => {
        this.currentPage = event.url;
      }, 300);
    });

    setTimeout(() => {
      this.introEnabled = false;
    }, 3000);

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo(0, 0);
      this.hideMenu();
    });
  }

  showMenu(): void {
    this.menuTransition = true;
    this.menuHeight = '100vh';
    this.menuOpen = true;
    setTimeout(() => {
      this.menuTransition = false;
      this.renderer2.setStyle(document.body, 'overflow-y', 'hidden');
    }, 300);
  }

  hideMenu(): void {
    this.renderer2.setStyle(document.body, 'overflow-y', 'scroll');
    this.menuTransition = true;
    this.menuHeight = '0vh';
    this.menuOpen = false;
    setTimeout(() => {
      this.menuTransition = false;
    }, 300);
  }

  toggleMenu(): void {
    if (this.menuTransition === true) {
      return;
    } else if (this.menuOpen === false) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }
}