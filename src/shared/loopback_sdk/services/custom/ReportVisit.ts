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
export class ReportVisitApi extends BaseLoopBackApi{
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

    public getVisit(userId: any = {}, fromMonth: any = {}, 
        toMonth: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_visits/getVisit";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof userId !== 'undefined' && userId !== null) _urlParams.user_id = userId;
        if (typeof fromMonth !== 'undefined' && fromMonth !== null) _urlParams.periode_from = fromMonth;
        if (typeof toMonth !== 'undefined' && toMonth !== null) _urlParams.periode_to = toMonth;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    public getVisitSummarySph(sphId: any = {}, periode: any = {}, 
        visitRate: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_visits/getVisitSummarySph";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof sphId !== 'undefined' && sphId !== null) _urlParams.sph_id = sphId;
        if (typeof periode !== 'undefined' && periode !== null) _urlParams.periode = periode;
        if (typeof visitRate !== 'undefined' && visitRate !== null) _urlParams.visit_rate = visitRate;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    public getVisitSummaryRegion(acId: any = {}, periode: any = {}, 
        visitRate: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_visits/getVisitSummaryRegion";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof acId !== 'undefined' && acId !== null) _urlParams.ac_id = acId;
        if (typeof periode !== 'undefined' && periode !== null) _urlParams.periode = periode;
        if (typeof visitRate !== 'undefined' && visitRate !== null) _urlParams.visit_rate = visitRate;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    public getVisitSummaryHo(regionId: any = {}, periode: any = {}, 
        visitRate: any = {}, customHeaders?: Function): Observable<any>{
        let _method: string = "GET";
        let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
        "/report_visits/getVisitSummaryHo";
        let _routeParams: any = {};
        let _postBody: any = {};
        let _urlParams: any = {};
        if (typeof regionId !== 'undefined' && regionId !== null) _urlParams.region_id = regionId;
        if (typeof periode !== 'undefined' && periode !== null) _urlParams.periode_from = periode;
        if (typeof visitRate !== 'undefined' && visitRate !== null) _urlParams.visit_rate = visitRate;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }

    public getModelName() {
        return "ReportVisit";
    }
}