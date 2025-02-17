import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
} from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    // MatSidenavModule,
    // MatButtonModule,
    // SidebarComponent,
    RouterModule,
    NavbarComponent,
    FooterComponent
],

  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent {
  private router = inject(Router);

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '|') {
      this.router.navigate(['/dashboard/sell']);
    }
  }
}
