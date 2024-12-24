import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BasicServicesService {
    private ENDPOINT = ENDPOINT;
    private _http: HttpClient = inject(HttpClient);
    constructor() { }

    add(EndPointsNames, data): Observable<any> {
        return this._http.post(ENDPOINT.MAIN_HOST + EndPointsNames, data);
    }

    getAll(EndPointsNames, filterCriteria: any): Observable<any> {
        return this._http.post<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames + '/GetAll',
            filterCriteria
        );
    }

    get(EndPointsNames, filterCriteria: any): Observable<any> {
        return this._http.post<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames,
            filterCriteria
        );
    }

    getlist(EndPointsNames, filterCriteria: any): Observable<any> {
        return this._http.get<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames + '/GetAll',
            filterCriteria
        );
    }
    getById(EndPointsNames, id): Observable<any> {
        return this._http.get<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames + '/' + id
        );
    }

    getWithParams(EndPointsNames, params): Observable<any> {
        return this._http.get<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames,
            { params }
        );
    }
    getByIds(EndPointsNames, ids): Observable<any> {
        return this._http.get<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames + '/' + ids
        );
    }

    update(EndPointsNames, id, data): Observable<any> {
        return this._http.put(
            ENDPOINT.MAIN_HOST + EndPointsNames + '?id=' + id,
            data
        );
    }

    updateWithoutId(EndPointsNames, data): Observable<any> {
        return this._http.post(ENDPOINT.MAIN_HOST + EndPointsNames, data);
    }

    updateWithParams(EndPointsNames, params, data): Observable<any> {
        return this._http.put(ENDPOINT.MAIN_HOST + EndPointsNames, data, {
            params,
        });
    }

    delete(EndPointsNames, id: string): Observable<any> {
        return this._http.delete(
            ENDPOINT.MAIN_HOST + EndPointsNames + '?id=' + id
        );
    }
    
    lock(EndPointsNames, id, data?): Observable<any> {
        if(EndPointsNames === ENDPOINT.USER) {
            return this._http.put(
                ENDPOINT.MAIN_HOST + EndPointsNames + '/UpdateUserStatus' + '?id=' + id,
                data
            );
        } else {
            return this._http.put(
                ENDPOINT.MAIN_HOST + EndPointsNames + '/UpdateStatus' + '?id=' + id,
                data
            );
        }
    }

    getCode(EndPointsNames): Observable<any> {
        return this._http.get<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames + '/getNewCode'
        );
    }

    getAllDeleted(EndPointsNames, filterCriteria): Observable<any> {
        return this._http.post<any>(
            ENDPOINT.MAIN_HOST + EndPointsNames + '/GetAllDeleted',
            filterCriteria
        );
    }

    uploadAttachmentWithPipe(EndPointsNames: any, formData): Observable<any> {
        return this._http.post<any>(EndPointsNames, formData, {
            observe: 'events',
            reportProgress: true,
        });
    }

    addWithFormData(EndPointsNames: any, formData):Observable<any>{
        return this._http.post<any>(ENDPOINT.MAIN_HOST + EndPointsNames, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}
