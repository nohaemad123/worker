import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  constructor() { }

  tenantId$ = new BehaviorSubject<string>('');
}
