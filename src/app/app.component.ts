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
  menuHeight = '0%';
  menuOpen = false;

  constructor(private renderer2: Renderer2, private router: Router) {
  }

  ngOnInit(): void {
    this.renderer2.setStyle(document.body, 'overflow-y', 'scroll');

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
    });
  }

  showMenu(): void {
    this.menuHeight = '100%';
    this.menuOpen = true;
    this.renderer2.setStyle(document.body, 'height', '100vh');
    //this.renderer2.setStyle(document.body, 'overflow-y', 'hidden');
  }

  hideMenu(): void {
    this.menuHeight = '0%';
    this.menuOpen = false;
    //this.renderer2.setStyle(document.body, 'overflow-y', 'scroll');
  }

  toggleMenu(): void {
    if (this.menuOpen === false) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }
}
