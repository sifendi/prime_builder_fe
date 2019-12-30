import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { SocketConnection } from '../../sockets/socket.connections';

@Injectable()
export class ReportSummaryApi extends BaseLoopBackApi{
    constructor(
        @Inject(Http) protected http: Http,
        @Inject(SocketConnection) protected connection: SocketConnection,
        @Inject(SDKModels) protected models: SDKModels,
        @Inject(LoopBackAuth) protected auth: LoopBackAuth,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
    ){
        super(http,  connection,  models, auth, searchParams, errorHandler);
    }

    /**
     * 
     * @param data 
     * @param customHeaders 
     */
    public patchOrCreate(data: any = {}, customHeaders?: Function): Observable<any> {
        let _method: string = "PATCH";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_hpb_summaries";
        let _routeParams: any = {};
        let _postBody: any = {
            data: data
        };
        let _urlParams: any = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    /**
     * 
     * @param id 
     * @param data 
     * @param customHeaders 
     */
    public patchAttributes(id: any, data: any = {}, customHeaders?: Function): Observable<any> {
        let _method: string = "PATCH";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_hpb_summaries/:id";
        let _routeParams: any = {
            id: id
        };
        let _postBody: any = {
            data: data
        };
        let _urlParams: any = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    public getReportDetail(asphId: any = {}, fromMonth: any = {}, 
        toMonth: any = {}, customHeaders?: Function):Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_hpb_summaries/getReportDetail";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof asphId !== 'undefined' && asphId !== null) _urlParams.sph_id = asphId;
        if (typeof fromMonth !== 'undefined' && fromMonth !== null) _urlParams.periode_from = fromMonth;
        if (typeof toMonth !== 'undefined' && toMonth !== null) _urlParams.periode_to = toMonth;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    /**
     * 
     * @param asphId 
     * @param fromMonth 
     * @param toMonth 
     * @param customHeaders 
     */
    public getReportSummaryAcTlh(asphId: any = {}, fromMonth: any = {}, 
        toMonth: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_hpb_summaries/getReportSummaryAcTlh";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof asphId !== 'undefined' && asphId !== null) _urlParams.sph_id = asphId;
        if (typeof fromMonth !== 'undefined' && fromMonth !== null) _urlParams.periode_from = fromMonth;
        if (typeof toMonth !== 'undefined' && toMonth !== null) _urlParams.periode_to = toMonth;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    /**
     * 
     * @param acId 
     * @param fromMonth 
     * @param toMonth 
     * @param customHeaders 
     */
    public getReportSummaryRegion(acId: any = {}, fromMonth: any = {}, 
        toMonth: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_hpb_summaries/getReportSummaryRegion";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof acId !== 'undefined' && acId !== null) _urlParams.ac_id = acId;
        if (typeof fromMonth !== 'undefined' && fromMonth !== null) _urlParams.periode_from = fromMonth;
        if (typeof toMonth !== 'undefined' && toMonth !== null) _urlParams.periode_to = toMonth;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    /**
     * 
     * @param acId 
     * @param region_id 
     * @param fromMonth 
     * @param toMonth 
     * @param customHeaders 
     */
    public getReportSummaryHo( //roleName: any = {}, 
        acId: any = {},
        region_id: any = {}, fromMonth: any = {}, toMonth: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_hpb_summaries/getReportSummaryHo";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        // if (typeof roleName !== 'undefined' && roleName !== null) _urlParams.rolename = roleName;
        if (typeof acId !== 'undefined' && acId !== null) _urlParams.ac_id = acId;
        if (typeof region_id !== 'undefined' && region_id !== null) _urlParams.region_id = region_id;
        if (typeof fromMonth !== 'undefined' && fromMonth !== null) _urlParams.periode_from = fromMonth;
        if (typeof toMonth !== 'undefined' && toMonth !== null) _urlParams.periode_to = toMonth;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    public getModelName() {
        return "ReportSummary";
    }
}