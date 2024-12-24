import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'لوحه التحكم',
        type: 'basic',
        icon: 'heroicons_outline:squares-2x2',
        link: '/' + +'/Dashboard',
    },

    {
        id: 'stock',
        title: 'البيانات الاساسيه',
        type: 'collapsable',
        icon: 'mat_outline:list_alt',
        children: [
            {
                id: 'brenches',
                title: 'بانات الفروع',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-brenches',
            },
            {
                id: 'banks',
                title: 'بيانات البنوك',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-banks',
            },
            {
                id: 'bank-cards',
                title: ' بيانات البطاقات البنكيه',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-bank-cards',
            },
            //////
            {
                id: 'customers',
                title: ' بيانات  العملاء',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-customers',
            },
            {
                id: 'expenses',
                title: ' بيانات  المصروفات',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-expenses',
            },
            {
                id: 'Representatives',
                title: ' بيانات  المندوبين',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-Representatives',
            },
            {
                id: 'Store',
                title: ' بيانات المخازن',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-Store',
            },
            {
                id: 'Storage',
                title: ' بيانات الخزن',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-Storage',
            },
            {
                id: 'Suppliers',
                title: ' بيانات الموردين',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-Suppliers',
            },
            {
                id: 'Varieties',
                title: ' بيانات  الاصناف',
                type: 'basic',
                icon: 'mat_outline:circle',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user')).username +
                //     '/basic-information/view-Varieties',
            },
        ],
    },

    {
        id: 'stock',
        title: 'المخزون',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-document-list',
        children: [
            {
                id: 'store',
                title: 'حركه المخزون - وارد',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'حركه المخزون - صادر',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'تحويلات المخازن',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
        ],
    },
    {
        id: 'purchase',
        title: 'المشتريات',
        type: 'collapsable',
        icon: 'heroicons_outline:document-text',
        children: [
            {
                id: 'store',
                title: 'امر شراء',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'فاتورة شراء',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'مرتجع شراء',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
        ],
    },
    {
        id: 'sales',
        title: 'المبيعات',
        type: 'collapsable',
        icon: 'heroicons_outline:cube',
        children: [
            {
                id: 'store',
                title: 'امر بيع',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'فاتورة المبيعات',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'مرتجع مبيعات',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'كاشيرة',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'مرتجع كاشيرة',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
            {
                id: 'store',
                title: 'حجز بضاعه',
                type: 'basic',
                icon: 'mat_outline:circle',
                link: '/store',
            },
        ],
    },
    {
        id: 'sales',
        title: 'المستخدمين',
        type: 'collapsable',
        icon: 'heroicons_outline:users',
        children: [
            {
                id: 'store',
                title: 'المستخدمين',
                type: 'basic',
                icon: 'insert_chart',
                // link:
                //     '/' +
                //     JSON.parse(localStorage.getItem('user'))?.username +
                //     '/users/View-users',
            },
        ],
    },
    // {
    //     id: 'sales',
    //     title: 'الفروع',
    //     type: 'collapsable',
    //     icon: 'heroicons_outline:clipboard-document-list',
    //     children: [
    //         {
    //             id: 'store',
    //             title: 'الفروع',
    //             type: 'basic',
    //             icon: 'mat_outline:circle',
    //             link:
    //                 '/' +
    //                 JSON.parse(localStorage.getItem('user')).username +
    //                 '/branches/View-branches',
    //         },
    //     ],
    // },
    {
        id: 'settings',
        title: 'الإعدادات',
        type: 'basic',
        link: '/settings',
        icon: 'heroicons_outline:cog-6-tooth',
    },
];
// export const compactNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     },
//     {
//         id   : 'example2',
//         title: 'Example2',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
// export const futuristicNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
// export const horizontalNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
