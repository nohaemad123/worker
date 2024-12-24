import { Injectable } from '@angular/core';
import { MENU_ICONS } from '@data/svg-icons';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { HelpersService } from '@shared/services/helpers.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationPramesService {
    constructor(private _helpersService: HelpersService) { }
    public defaultNavigation(tenant: string): FuseNavigationItem[] {
        // this._helpersService.tenantId$.next(tenant);

        return [
            {
                id: 'Home',
                title: 'الرئيسية',
                type: 'basic',
                // icon: 'heroicons_outline:squares-2x2',
                icon: MENU_ICONS.DASHBOARD,
                link: '/Dashboard',
            },

            {
                id: 'Companies',
                title: 'الشركات',
                type: 'basic',
                icon: MENU_ICONS.COMPANIES,
                link: '/Companies',
            },
            {
                id: 'Branches',
                title: 'الفروع',
                type: 'basic',
                icon: MENU_ICONS.BRANCHES,
                link: '/Branches',
            },
            {
                id: 'CompanyBranches',
                title: 'افرع الشركة',
                type: 'basic',
                icon: MENU_ICONS.COMPANIES_BRANCHES,
                link: '/Company-Branches',
            },
            {
                id: 'Cities',
                title: 'المدن',
                type: 'basic',
                icon: MENU_ICONS.CITIES,
                link: '/Cities',
            },
            {
                id: 'Regions',
                title: 'الاحياء',
                type: 'basic',
                icon: MENU_ICONS.REGIONS,
                link: '/Regions',
            },
            {
                id: 'Jobs',
                title: 'الوظائف',
                type: 'basic',
                icon: MENU_ICONS.JOBS,
                link: '/Jobs',
            },
            {
                id: 'Nationalities',
                title: 'الجنسيات',
                type: 'basic',
                icon: MENU_ICONS.NATIONALITIES,
                link: '/Nationalities',
            },
            {
                id: 'Workers',
                title: 'العمال',
                type: 'basic',
                icon: MENU_ICONS.WORKERS,
                link: '/Workers',
            },
            {
                id: 'ServicesTypes',
                title: 'انواع الخدمات',
                type: 'basic',
                icon: MENU_ICONS.SERVICE_TYPES,
                link: '/Services',
            },
            {
                id: 'ServicesSystems',
                title: 'انظمة الخدمات',
                type: 'basic',
                icon: MENU_ICONS.SERVICE_SYSTEMS,
                link: '/Services-Systems',
            },
            {
                id: 'ServicesPricing',
                title: 'تسعير الخدمات',
                type: 'basic',
                icon: MENU_ICONS.SERVICE_PRICING,
                link: '/Services-Pricing',
            },

            {
                id: 'Advertisements',
                title: 'الإعلانات',
                type: 'basic',
                icon: MENU_ICONS.ADVERTISEMENTS,
                link: '/Advertisements',
            },
            {
                id: 'Shifts',
                title: 'الورديات',
                type: 'basic',
                icon: MENU_ICONS.SHIFTS,
                link: '/Shifts',
            },
            {
                id: 'Orders',
                title: 'الطلبات',
                type: 'basic',
                icon: MENU_ICONS.ORDERS,
                link: '/Orders',
            },
            {
                id: 'Reports',
                title: 'التقارير',
                type: 'collapsable',
                icon: MENU_ICONS.REPORTS,
                children: [
                    {
                        id: 'orders-reports',
                        title: 'تقارير الطلبات',
                        type: 'basic',
                        icon: MENU_ICONS.ORDERS,
                        link: '/Reports/orders-reports'
                    },
                    {
                        id: 'orders-reports',
                        title: 'تقارير العمولات الإجمالى',
                        type: 'basic',
                        icon: MENU_ICONS.COMMISSIONS,
                        link: '/Reports/total-commissions-reports'
                    },
                    {
                        id: 'orders-reports',
                        title: 'تقارير العمولات التفصيلى',
                        type: 'basic',
                        icon: MENU_ICONS.COMMISSIONS,
                        link: '/Reports/detailed-commissions-reports'
                    },
                ]
            },
            {
                id: 'Users',
                title: 'المستخدمين',
                type: 'basic',
                icon: MENU_ICONS.USERS,
                link: '/Users',
            },
            {
                id: 'UserPermissions',
                title: 'صلاحيات المستخدمين',
                type: 'basic',
                icon: MENU_ICONS.USERS_PERMISSIONS,
                link: '/User-permissions',
            },
            // {
            //     id: 'offers',
            //     title: 'العروض',
            //     type: 'basic',
            //     icon: 'heroicons_outline:receipt-percent',
            //     link:  '/Offers',
            // },

            // {
            //     id: 'services',
            //     title: 'الخدمات المقدمة',
            //     type: 'basic',
            //     icon: 'heroicons_outline:sparkles',
            //     link: '/Provided-Services',
            // },

            // {
            //     id: 'stock',
            //     title: 'المخزون',
            //     type: 'collapsable',
            //     icon: 'heroicons_outline:clipboard-document-list',
            //     children: [
            //         {
            //             id: 'incoming',
            //             title: 'حركه المخزون - وارد',
            //             type: 'basic',
            //             icon: 'mat_outline:circle',
            //             link:  '/incoming/view',
            //         },
            //         {
            //             id: 'outgoing',
            //             title: 'حركه المخزون - صادر',
            //             type: 'basic',
            //             icon: 'mat_outline:circle',
            //             link:  '/outgoing/view',

            //         },
            //         {
            //             id: 'store-transfer',
            //             title: 'تحويلات المخازن',
            //             type: 'basic',
            //             icon: 'mat_outline:circle',
            //             link:  '/store-transfer/view',
            //         },
            //     ],
            // },
            // {
            //     id: 'settings',
            //     title: 'الإعدادات',
            //     type: 'basic',
            //     link: '/settings',
            //     icon: 'heroicons_outline:cog-6-tooth',
            // },
        ];
    }
}
