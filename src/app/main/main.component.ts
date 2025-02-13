import { Component } from '@angular/core';
import { SidebarService } from '../services/sidebar/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isLoginPage: boolean = false;
  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible);
      this.isSidebarVisible = isVisible;
    });
    this.router.events.subscribe(() => {
      // Check if the current route is the login page
      this.isLoginPage = this.router.url === '/login';
    });
  }
}
