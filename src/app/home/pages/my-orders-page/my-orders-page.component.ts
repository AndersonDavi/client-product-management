import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../dashboard/services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders-page.component.html',
  styleUrl: './my-orders-page.component.css',
})
export class MyOrdersPageComponent implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService) {}

  async ngOnInit() {
    const userId = localStorage.getItem('user');
    if (userId) {
      await this.invoiceService
        .getUserInvoices(userId)
        .subscribe((invoices) => {
          this.invoices = invoices;
        });
    }
  }
}
