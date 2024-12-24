import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor() {}
   Messages$ = new BehaviorSubject<any>({type: '', summary:'',messages: ''});
    showMassage(  type :string ,summary:string , messages: string ) {
        this.Messages$.next( {
            type: type,
            summary: summary,
            messages: messages
        });
    }

}
