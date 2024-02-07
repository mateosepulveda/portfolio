import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  shouldFadeOut: boolean = false;

  constructor(private router: Router) {
  }

  navigateProjectsList(): void {
    this.router.navigate(['/projects-list']);
  }
}
