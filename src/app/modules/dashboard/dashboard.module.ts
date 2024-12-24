import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatisticsCardsComponent } from './components/statistics-cards/statistics-cards.component';
import { CompaniesChartComponent } from './components/companies-chart/companies-chart.component';
import { OrdersChartComponent } from './components/orders-chart/orders-chart.component';
import { WorkersChartComponent } from './components/workers-chart/workers-chart.component';
import { ServicesChartComponent } from './components/services-chart/services-chart.component';
import { WorkersStatisticsComponent } from './components/workers-statistics/workers-statistics.component';


@NgModule({
  declarations: [
   DashboardComponent,
   StatisticsCardsComponent,
   CompaniesChartComponent,
   OrdersChartComponent,
   WorkersChartComponent,
   ServicesChartComponent,
   WorkersStatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DynamicDialogModule,
    DynamicDialogComponent,
    DynamicDialogModule,
    TranslocoModule,
    MatIconModule,
    NgApexchartsModule
  ],
  providers: [DialogService]
})
export class DashboardModule { }
