import { Injectable } from '@angular/core';
import { BreadCrumbItem } from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  breadCrumbSubj = new BehaviorSubject<BreadCrumbItem[]>([]);

  constructor() { }
}
