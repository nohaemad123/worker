import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BreadCrumbItem } from '@shared/models';
import { LayoutService } from '@shared/services/layout.service';

@Component({
    selector: 'example',
    standalone: true,
    imports: [MatIconModule, MatMenuModule],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit {

    private _layoutService = inject(LayoutService);

    ngOnInit(): void {
        this.prepareBreadCrumbs();
    }

    prepareBreadCrumbs(): void {
        const BREADCRUMBS: BreadCrumbItem[] = [
            {
                name: 'Dashboard',
                link: '/dashboard'
            },
            {
                name: 'Project',
                link: '/project'
            },
            {
                name: 'Weekend Project',
                link: ''
            }
        ];
        this._layoutService.breadCrumbSubj.next(BREADCRUMBS);
    }

}
