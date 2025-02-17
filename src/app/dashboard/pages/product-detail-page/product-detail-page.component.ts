import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as valid,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from '../../../home/services/product.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css',
})
export class ProductDetailPageComponent implements OnInit {
  product: any;
  private formBuilder = inject(FormBuilder);
  public editForm: FormGroup = this.formBuilder.group({
    name: ['', [valid.required]],
    description: ['', [valid.required]],
    price: ['', [valid.required]],
    rating: ['', [valid.required]],
    sizes: ['', [valid.required]],
    stock: ['', [valid.required]],
    image: ['', [valid.required]],
  });

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProduct(productId).subscribe((product) => {
          this.product = product;
          this.editForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            rating: product.rating,
            sizes: product.sizes,
            stock: product.stock,
            image: product.image,
          });
        });
      }
    });
  }

  updateProduct() {
    if (this.editForm.valid) {
      this.productService
        .updateProduct(this.product._id, this.editForm.value)
        .subscribe((product) => {
          if (product) {
            Swal.fire('Success', 'Product updated successfully!', 'success');
            this.router.navigateByUrl('dashboard/products');
          } else {
            Swal.fire('Error', 'Failed to update product.', 'error');
          }
        });
    }
  }
}
