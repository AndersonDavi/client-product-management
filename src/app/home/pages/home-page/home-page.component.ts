import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListComponent } from "../../components/products/product-list/product-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent { }
