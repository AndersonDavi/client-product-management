import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { InvoiceService } from '../../../dashboard/services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css'],
})
export class ShoppingCartPageComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  userId: string = '67b2c01cccb8bbe47156695c'; // Example user ID

  constructor(
    private shoppingCartService: ShoppingCartService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.getCartObservable().subscribe((cart) => {
      this.cartItems = cart;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  createInvoice() {
    if (this.cartItems.length === 0) {
      return;
    }
    const invoiceData = {
      user_id: this.userId,
      products: this.cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      total: this.total,
    };

    this.invoiceService.createInvoice(invoiceData).subscribe(
      () => {
        this.clearCart();
        Swal.fire('Success', 'Invoice created successfully!', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Failed to create invoice', 'error');
      }
    );
  }
}
