import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FormGroup } from '@angular/forms';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { PaginationData } from '@shared/models';

@Component({
  selector: 'app-deleted-companies',
  templateUrl: './deleted-companies.component.html',
  styleUrl: './deleted-companies.component.scss'
})

export class DeletedCompaniesComponent implements OnInit {

  private _transloco = inject(TranslocoService);
  private _basicService = inject(BasicServicesService);
  private _destroyRef = inject(DestroyRef);

  searchForm!: FormGroup;
  filterCriteria = {
      page: 1,
      pageSize: 10,
      search: null,
      readDto: {
      },
      selectColumns: [
          'id',
          // 'companyCode',
          'companyName',
          'commercialRegistrationNumber',
          'taxNumber',
          'yearsOfExperience',
          'companyMobileNumber',
          'headquarters',
      ],
      sortColumn: '',
      sortColumnDirection: 'asc',
  };
  tableConfig = {
      columns: [
          {
              header: '#',
              field: 'id',
              type: 'text',
              sortable: false,
              style: 'text-start',
              rowStyle: 'text-start',
          },
          // {
          //     header: this._transloco.translate('companies.view.table.code'),
          //     field: 'companyCode',
          //     type: 'number',
          //     sortable: false,
          //     style: 'text-center',
          //     rowStyle: 'text-center font-regular text-black text-md',
          // },
          {
              header: this._transloco.translate('companies.view.table.name'),
              field: 'companyName',
              type: 'text',
              sortable: false,
              style: 'text-center',
              rowStyle: 'text-center text-black text-md',
          },
          {
              header: this._transloco.translate(
                  'companies.view.table.number'
              ),
              field: 'taxNumber',
              type: 'text',
              sortable: false,
              style: 'text-center',
              rowStyle: 'text-center',
          },
          {
              header: this._transloco.translate(
                  'companies.view.table.commerical'
              ),
              field: 'commercialRegistrationNumber',
              type: 'text',
              sortable: false,
              style: 'text-center',
              rowStyle: 'text-center',
          },
          {
              header: this._transloco.translate('companies.view.table.phone'),
              field: 'companyMobileNumber',
              type: 'number',
              sortable: false,
              style: 'text-center',
              rowStyle: 'text-center',
          },
          {
              header: this._transloco.translate(
                  'companies.view.table.address'
              ),
              field: 'headquarters',
              type: 'text',
              sortable: false,
              style: 'text-center',
              rowStyle: 'text-center',
          },
          {
              header: this._transloco.translate(
                  'companies.view.table.experience'
              ),
              field: 'yearsOfExperience',
              type: 'number',
              sortable: false,
              style: 'text-center',
              rowStyle: 'text-center',
          },

          {
              header: 'Actions',
              field: '',
              style: '',
              sortable: false,
              type: 'action',
          },
      ],
      data: [],
      total: null,
      paginator: true,
      lazy: true,
      loading: false,
      withCheckBoxes: false,
      withSort: true,
      controlColumns: false,
      withSearch: false,
      withFilter: false,
      rows: this.filterCriteria.pageSize,
      tableStyle: { 'min-width': '50rem' },
      rowsPerPageOptions: [5, 10, 20, 30],
      globalFilterFields: [],
      emptyMsg: 'No records found',
      actions: [
        {
            label: 'Return',
            key: 'Return',
            icon: 'feather:refresh-ccw',
            type: 'ACTION',
        },
      ],
      tableFilter: [],
  };
  paginationData: PaginationData;
  companies: any[] = [];

  ngOnInit(): void {
      this.getAllCompaniesList();
  }

  getAllCompaniesList(): void  {
      this.tableConfig.loading = true;
      this._basicService
          .getAllDeleted(ENDPOINT.COMPANY, this.filterCriteria)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(
              (res) => {
                  this.paginationData = res.data.paginationData;
                  this.tableConfig.data = res.data.listData;
                  this.tableConfig.total = res.data.paginationData.totalCount;
                  this.tableConfig.loading = false;
              },
              (err) => {
                  this.tableConfig.loading = false;
              }
          );
  }

  onPaginationChange(event: any): void  {
      this.filterCriteria.page = event.first / event.rows + 1;
      this.filterCriteria.pageSize = event.rows;
      this.getAllCompaniesList();
  }

  onActionClick(ev: { key: string; item: any }): void  {
      switch (ev.key) {
          case 'Return':
            //   this.router.navigate([
            //       `${this.tenantId}/incoming/add-edit/${ev.item.id}/${ev.key}`,
            //   ]);
              break;

          default:
              break;
      }
  }

  onSort(event: string): void {
      this.filterCriteria.sortColumnDirection =
          this.filterCriteria.sortColumnDirection === 'asc' ? 'desc' : 'asc';
      this.filterCriteria.sortColumn = event;
      this.getAllCompaniesList();
  }
  
}


