import { BasicServicesService } from './core/services/Basic-services/basic-services.service';
import { Component, inject, OnInit } from '@angular/core';
import { Navigation, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '@shared/services/error/toaster.service';
import { NavigationUrlService } from '@shared/navigation-url.service';
import { UserService } from './core/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, ToastModule],
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    
    private basicServicesService = inject(BasicServicesService);
    private messagehandle = inject(ToastService);
    private messageService = inject(MessageService);
    private userService = inject(UserService);

    constructor(
    ) {
        this.messagehandle.Messages$.subscribe((messageContent) => {
            this.messageService.add({
                severity: messageContent.type,
                summary: messageContent.summary,
                detail: messageContent.messages,
            });
        });
    }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
       const token = localStorage.getItem('accessToken');
       if (token) {
        this.getUserPermissions();
       }
    }

    getUserPermissions(): void {
    }

}
