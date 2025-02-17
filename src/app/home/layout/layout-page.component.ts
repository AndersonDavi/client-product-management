import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ShoppingCartFloatButtonComponent } from "../components/shopping-cart-float-button/shopping-cart-float-button.component";

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, ShoppingCartFloatButtonComponent],
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
