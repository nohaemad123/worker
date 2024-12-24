import { Route } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';

import { LayoutComponent } from '@shared/layout/layout.component';
import { AuthSignInComponent } from './modules/auth/sign-in/sign-in.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Sign-In',
        // canActivate: [AuthGuard]
    },

    // Landing routes
    {
        path: 'landing',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('app/modules/landing/home/home.routes'),
                providers: [provideTranslocoScope('auth')],
            },
        ],
    },
    // sign-in without tenant
    {
        path: 'Sign-In',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: '',
                // component: SignInWithoutTenantComponent,
                component: AuthSignInComponent,
                providers: [provideTranslocoScope('auth')],
            },
        ],
    },
    // sign-in without tenant
    // {
    //     path: 'Sign-Up',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty',
    //     },
    //     children: [
    //         {
    //             path: '',
    //             // component: SignInWithoutTenantComponent,
    //             component: AuthSignUpComponent,
    //             providers: [provideTranslocoScope('auth')],
    //         },
    //     ],
    // },
    // Admin routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         {
    //             path: 'example',

    //             loadChildren: () =>
    //                 import('app/modules/admin/example/example.routes'),
    //         },
    //         {
    //             path: 'Dashboard',
    //             component: DashboardComponent,
    //             providers: [provideTranslocoScope('dashboard')],
    //         },
    //     ],
    // },
    // home
    {
        path: `Home`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['welcome-page'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/home/home.module').then((m) => m.HomeModule),
        providers: [provideTranslocoScope('home')],
    },

    // dashboard
    {
        path: `Dashboard`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Home'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        providers: [provideTranslocoScope('home')],
    },

    // Companies
    {
        path: `Companies`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Companies'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/companies/companies.module').then(
                (m) => m.CompaniesModule
            ),
        providers: [provideTranslocoScope('companies')],
    },

    // Cities
    {
        path: `Cities`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Cities'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/cities/cities.module').then(
                (m) => m.CitiesModule
            ),
        providers: [provideTranslocoScope('cities')],
    },

    // Jobs
    {
        path: `Jobs`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Jobs'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/jobs/jobs.module').then((m) => m.JobsModule),
        providers: [provideTranslocoScope('jobs')],
    },

    // Nationalities
    {
        path: `Nationalities`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Nationalities'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/nationalities/nationalities.module').then(
                (m) => m.NationalitiesModule
            ),
        providers: [provideTranslocoScope('nationalities')],
    },

    // Provided Services
    // {
    //     path: `Provided-Services`,
    //     component: LayoutComponent,
    //     canActivate: [AuthGuard],
    //     loadChildren: () =>
    //         import('./modules/provided-services/provided-services.module').then(
    //             (m) => m.ProvidedServicesModule
    //         ),
    //     providers: [provideTranslocoScope('providedServices')],
    // },

    // Regions
    {
        path: `Regions`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Regions'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/regions/regions.module').then(
                (m) => m.RegionsModule
            ),
        providers: [provideTranslocoScope('regions')],
    },

    // Services
    {
        path: `Services`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['ServicesTypes'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/services/services.module').then(
                (m) => m.ServicesModule
            ),
        providers: [provideTranslocoScope('services')],
    },

    // Workers
    {
        path: `Workers`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Workers'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/workers/workers.module').then(
                (m) => m.WorkersModule
            ),
        providers: [provideTranslocoScope('workers')],
    },

    // users
    {
        path: `Users`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Users'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/users/users.module').then((m) => m.UsersModule),
        providers: [provideTranslocoScope('users')],
    },

    // user permission
    {
        path: `User-permissions`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['UserPermissions'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/user-permissions/user-permissions.module').then(
                (m) => m.UserPermissionsModule
            ),
        providers: [provideTranslocoScope('userPermission')],
    },

    // Branches
    {
        path: `Branches`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Branches'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/branches/branches.module').then(
                (m) => m.BranchesModule
            ),
        providers: [provideTranslocoScope('branches')],
    },

    // Company Branches
    {
        path: `Company-Branches`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['CompanyBranches'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/company-branches/company-branches.module').then(
                (m) => m.CompanyBranchesModule
            ),
        providers: [provideTranslocoScope('companyBranches')],
    },
    // offers
    // {
    //     path: `Offers`,
    //     component: LayoutComponent,
    //     canActivate: [AuthGuard],
    //     loadChildren: () =>
    //         import('./modules/offers/offers.module').then(
    //             (m) => m.OffersModule
    //         ),
    //     providers: [provideTranslocoScope('offers')],
    // },
    {
        path: `Services-Systems`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['ServicesSystems'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/system-service/system-service.module').then(
                (m) => m.SystemServiceModule
            ),
        providers: [provideTranslocoScope('systemServices')],
    },
    {
        path: `Services-Pricing`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['ServicesPricing'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/services-pricing/services-pricing.module').then(
                (m) => m.ServicesPricingModule
            ),
        providers: [provideTranslocoScope('servicesPricing')],
    },
    // Shifts
    {
        path: `Shifts`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Shifts'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/shifts/shifts.module').then(
                (m) => m.ShiftsModule
            ),
        providers: [provideTranslocoScope('shifts')],
    },
    // Orders
    {
        path: `Orders`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Orders'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/orders/orders.module').then(
                (m) => m.OrdersModule
            ),
        providers: [provideTranslocoScope('orders')],
    },
    // Advertisements
    {
        path: `Advertisements`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Advertisements'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/advertisements/advertisements.module').then(
                (m) => m.AdvertisementsModule
            ),
        providers: [provideTranslocoScope('advertisements')],
    },
    // Reports
    {
        path: `Reports`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Reports'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/reports/reports.module').then(
                (m) => m.ReportsModule
            ),
        providers: [provideTranslocoScope('reports')],
    },
    // Profile
    {
        path: `Profile`,
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            pageKey: ['Profile'] // Required permissions for this route
        },
        loadChildren: () =>
            import('./modules/profile/profile.module').then(
                (m) => m.ProfileModule
            ),
        providers: [provideTranslocoScope('profile')],
    },

];
