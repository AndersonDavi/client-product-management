import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cart);

  constructor() {}

  addToCart(product: any, quantity: number = 1) {
    const existingProductIndex = this.cart.findIndex(item => item.product._id === product._id);
    if (existingProductIndex !== -1) {
      const existingProduct = this.cart[existingProductIndex];
      const newQuantity = existingProduct.quantity + quantity;
      this.cart[existingProductIndex].quantity = newQuantity > product.stock ? product.stock : newQuantity;
    } else {
      this.cart.push({ product, quantity: quantity > product.stock ? product.stock : quantity });
    }
    this.cartSubject.next(this.cart);
    console.log(this.cart);
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  get totalItems() {
    return this.cart.length;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }
}
