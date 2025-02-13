import { SidebarService } from './../../services/sidebar/sidebar.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to auth status observable
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  toggleSidebar() {
    // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}

