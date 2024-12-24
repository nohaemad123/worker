import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogModule,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-dynamic-dialog',
    standalone: true,
    imports: [
        CommonModule,
        DynamicDialogModule,
        RouterLink,
        NgOptimizedImage,
        TranslocoModule,
    ],
    templateUrl: './dynamic-dialog.component.html',
    styleUrl: './dynamic-dialog.component.scss',
    providers: [DialogService],
})
export class DynamicDialogComponent {
    router = inject(Router);
    private dialogConfig = inject(DynamicDialogConfig);
    ref: DynamicDialogRef = inject(DynamicDialogRef);
    data = this.dialogConfig.data;

    action() {
        this.ref.close({ action: 'action' });
    }

    cancel() {
        this.ref.close({ action: 'cancel' });
    }
}
