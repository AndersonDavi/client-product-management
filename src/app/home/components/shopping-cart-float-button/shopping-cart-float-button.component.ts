import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-float-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shopping-cart-float-button.component.html',
  styleUrls: ['./shopping-cart-float-button.component.css'],
})
export class ShoppingCartFloatButtonComponent implements OnInit {
  totalCartItems: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getCartObservable().subscribe((cart) => {
      this.totalCartItems = cart.length;
    });
  }
}
