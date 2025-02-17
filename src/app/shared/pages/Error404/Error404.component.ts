import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Error404.component.html',
  styleUrl: './Error404.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404Component { }
