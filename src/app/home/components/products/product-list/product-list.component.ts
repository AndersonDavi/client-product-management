import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements AfterViewInit {
  public products: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService, private router: Router) {}

  ngAfterViewInit(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.products.sort(() => Math.random() - 0.5);
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/auth']);
        }
      }
    );
  }
  async getProducts() {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) =>
          console.error('Error al obtener los productos:', error),
      });
  }
}
