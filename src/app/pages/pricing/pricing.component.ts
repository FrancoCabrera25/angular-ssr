import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingComponent implements OnInit {

  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
/*    if(!isPlatformServer(this.platform)){
    document.title = 'Pricing page';
   } */
  }

 }
