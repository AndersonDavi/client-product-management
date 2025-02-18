import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoices-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices-list-page.component.html',
  styleUrl: './invoices-list-page.component.css',
})
export class InvoicesListPageComponent implements OnInit {
  invoices: any[] = [];
  lastMonthPurchases: number = 0;

  constructor(private invoiceService: InvoiceService) {}

  async ngOnInit() {
    const userId = localStorage.getItem('user');
    await this.invoiceService
      .getAllPurchasesLastMonth()
      .subscribe((invoices) => {
        this.invoices = invoices;
      });

    await this.invoiceService.countAllinvoicesLastMonth().subscribe((count) => {
      this.lastMonthPurchases = count;
    });
  }
}
