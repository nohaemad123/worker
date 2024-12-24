import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private _basicService = inject(BasicServicesService);
  private _destroyRef = inject(DestroyRef);

  userDetails: any;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this._basicService
      .getWithParams(ENDPOINT.USER + '/GetUserProfile', {})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: any) => {
        this.userDetails = response.data;
      });
  }

}
