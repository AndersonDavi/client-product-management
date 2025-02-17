import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../home/services/product.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as valid,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.css',
})
export class ProductsListPageComponent implements OnInit {
  products: any[] = [];
  private formBuilder = inject(FormBuilder);
  public productForm: FormGroup = this.formBuilder.group({
    name: ['', [valid.required]],
    description: ['', [valid.required]],
    price: ['', [valid.required]],
    rating: ['', [valid.required]],
    sizes: ['', [valid.required]],
    stock: ['', [valid.required]],
    image: ['', [valid.required]],
  });
  imagePreview: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        sizes: this.productForm.value.sizes.split(',').map((size: string) => size.trim())
      };

      this.productService.createProduct(productData).subscribe((product) => {
        if (product) {
          this.products.push(product);
          this.productForm.reset();
        }
      });
    }
  }

  updateImagePreview() {
    const imageUrl = this.productForm.get('image')?.value;
    this.imagePreview = imageUrl ? imageUrl : null;
  }

  editProduct(productId: string) {
    this.router.navigate(['/dashboard/product', productId]);
  }

  deleteProduct(productId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId, false).subscribe(() => {
          this.products = this.products.filter(
            (product) => product._id !== productId
          );
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          );
        });
      }
    });
  }
}
