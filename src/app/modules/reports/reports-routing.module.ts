import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersReportsComponent } from './components/orders-reports/orders-reports.component';
import { TotalCommissionsReportsComponent } from './components/total-commissions-reports/total-commissions-reports.component';
import { DetailedCommissionsReportsComponent } from './components/detailed-commissions-reports/detailed-commissions-reports.component';

const routes: Routes = [
  { path: 'orders-reports', component: OrdersReportsComponent },
  { path: 'total-commissions-reports', component: TotalCommissionsReportsComponent },
  { path: 'detailed-commissions-reports', component: DetailedCommissionsReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
