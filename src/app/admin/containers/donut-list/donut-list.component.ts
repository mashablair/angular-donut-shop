import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-list',
  template: `
    <div>
      <ng-container *ngIf="donuts.length">
        <donut-card [donut]="donuts[0]"></donut-card>
        <donut-card [donut]="donuts[1]"></donut-card>
        <donut-card [donut]="donuts[2]"></donut-card>
      </ng-container>

      <ng-template [ngIf]="donuts.length" [ngIfElse]="nothing" ]>
        <donut-card [donut]="donuts[0]"></donut-card>
        <donut-card [donut]="donuts[1]"></donut-card>
        <donut-card [donut]="donuts[2]"></donut-card>
      </ng-template>

      <ng-template #nothing>
        <p>No Donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  ngOnInit(): void {
    this.donuts = [];
  }
}
