import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() {}
  Messages$ = new BehaviorSubject<any>({ type: '', summary: '', messages: '' });
  showMassage(type: string, summary: string, messages: string) {
    this.Messages$.next({
      type: type,
      summary: summary,
      messages: messages,
    });
  }
}
