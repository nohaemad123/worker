import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
   HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DynamicDialogModule,
    DynamicDialogComponent,
    DynamicDialogModule,
    TranslocoModule
  ],
  providers: [DialogService]
})
export class HomeModule { }
