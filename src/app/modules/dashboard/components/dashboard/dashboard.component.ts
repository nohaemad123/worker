import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent  implements OnInit{
    
    private _basicService = inject(BasicServicesService);
    private _destroyRef = inject(DestroyRef);

    dashboardData: any;
    loading = false;

    ngOnInit(): void {
        this.getDashboardData();
    }

    getDashboardData(): void {
        this.loading = true;
        this._basicService
            .getWithParams(ENDPOINT.DASHBOARD + '/GetHomeData', {})
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response) => {
                this.dashboardData = response?.data;
                this.loading = false;
            });
    }
  
}
