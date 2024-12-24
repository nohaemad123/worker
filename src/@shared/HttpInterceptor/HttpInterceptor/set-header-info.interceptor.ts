import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInfoInterceptor: HttpInterceptorFn = (req, next) => {
    // Get the data from local storage
    const lang = JSON.parse(localStorage.getItem('user'))?.language;
    // const Tenant = JSON.parse(localStorage.getItem('user'))?.username;
    const Token = JSON.parse(localStorage.getItem('user'))?.token;

    let header;
    if (localStorage.getItem('user'))
        header = req.clone({
            setHeaders: {
                'Accept-Language': lang,
                Authorization: `Bearer ${Token}`,
            },
        });
    else header = req.clone();
    // send cloned request with header to the next handler.
    return next(header);
};
