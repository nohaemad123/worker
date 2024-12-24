import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AvailableLangs, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { LayoutService } from '@shared/services/layout.service';
import { BreadCrumbItem } from '@shared/models';



@Component({
  selector: 'breadcrumbs',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule,TranslocoModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {

  private _translocoService = inject(TranslocoService);
  private _layoutService = inject(LayoutService);

  currentLang = "ar";
  breadCrumbData: BreadCrumbItem[] = [];

  ngOnInit(): void {
    this.getBreadCrumbData();
  }

  getBreadCrumbData(): void {
    this._layoutService.breadCrumbSubj.subscribe((data: BreadCrumbItem[]) => {
      this.breadCrumbData = data;
    })
  }

}
