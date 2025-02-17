import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, FormsModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css',
})
export class ProductDetailPageComponent implements OnInit {
  product: any;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProduct(productId).subscribe((product) => {
          this.product = product;
        });
      }
    });
  }

  addToCart() {
    if (this.quantity > this.product.stock) {
      Swal.fire('Error', `Only ${this.product.stock} items in stock`, 'error');
      return;
    }
    this.productService.addToCart(this.product, this.quantity);
    Swal.fire('Success', 'Product added to cart!', 'success');
  }
}
