import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  standalone: false,

  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(300, style({ opacity: 1 }))]),
    ]),
  ],
})
export class SidenavComponent {
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible);
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }
}
