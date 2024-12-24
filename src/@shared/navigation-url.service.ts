import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationUrlService {
    tanentId = new BehaviorSubject<string>('');
    tanentId$ = this.tanentId.asObservable();

    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe((params) => {
            this.tanentId.next(params.get('tenant') || '');
        });
    }
}
