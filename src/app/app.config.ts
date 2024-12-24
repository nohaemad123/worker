import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_RIPPLE_GLOBAL_OPTIONS,
    RippleGlobalOptions,
} from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
    PreloadAllModules,
    provideRouter,
    withInMemoryScrolling,
    withPreloading,
} from '@angular/router';
import { provideFuse } from '@fuse';
import { provideTransloco, TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { appRoutes } from 'app/app.routes';
import { provideAuth } from 'app/core/auth/auth.provider';
import { provideIcons } from 'app/core/icons/icons.provider';
// import { mockApiServices } from 'app/mock-api';
import { TranslocoHttpLoader } from './core/transloco/transloco.http-loader';
import { setHeaderInfoInterceptor } from '@shared/HttpInterceptor/HttpInterceptor/set-header-info.interceptor';
import { errorInterceptorInterceptor } from '@shared/HttpInterceptor/HttpInterceptor/error-interceptor.interceptor';
const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
    animation: {
        enterDuration: 300,
        exitDuration: 0,
    },
    terminateOnPointerUp: true,
};
export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(
            withInterceptors([setHeaderInfoInterceptor ,errorInterceptorInterceptor])
        ),
        provideRouter(
            appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
        ),

        // Material Date Adapter
        {
            provide: DateAdapter,
            useClass: LuxonDateAdapter,
        },

        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'D',
                },
                display: {
                    dateInput: 'DDD',
                    monthYearLabel: 'LLL yyyy',
                    dateA11yLabel: 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },

        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disable: true } },
        // Transloco Config
        provideTransloco({
            config: {
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'ar',
                        label: 'Arabic',
                    },
                ],
                defaultLang: 'ar',
                fallbackLang: 'ar',
                reRenderOnLangChange: true,
                prodMode: true,
            },
            loader: TranslocoHttpLoader,
        }),
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            useFactory: () => {
                const translocoService = inject(TranslocoService);
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);

                return () => firstValueFrom(translocoService.load(defaultLang));
            },
            multi: true,
        },

        // Fuse
        provideAuth(),
        provideIcons(),
        provideFuse({
            // mockApi: {
            //     delay   : 0,
            //     services: mockApiServices,
            // },
            fuse: {
                layout: 'classy',
                scheme: 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme: 'theme-default',
                themes: [
                    {
                        id: 'theme-default',
                        name: 'Default',
                    },
                ],
            },
        }),
    ],
};
