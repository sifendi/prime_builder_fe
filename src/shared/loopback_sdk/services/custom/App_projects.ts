/* tslint:disable */
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
import { App_projects } from '../../models/App_projects';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `App_projects` model.
 */
@Injectable()
export class App_projectsApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - Model instance data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `App_projects` object.)
   * </em>
   */
  public patchOrCreate(data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "PATCH";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/app_projects";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id app_projects id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `App_projects` object.)
   * </em>
   */
  public patchAttributes(id: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "PATCH";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/app_projects/:id";
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

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} hpb_id 
   *
   * @param {number} project_id 
   *
   * @param {string} project_name 
   *
   * @param {number} project_type 
   *
   * @param {number} project_stage 
   *
   * @param {number} project_pincode 
   *
   * @param {string} is_srku 
   *
   * @param {number} created_by 
   *
   * @param {number} updated_by 
   *
   * @param {number} created_date 
   *
   * @param {number} updated_date 
   *
   * @param {number} user_id 
   *
   * @param {string} rolename 
   *
   * @param {number} limit 
   *
   * @param {number} page 
   *
   * @param {string} approval 
   *
   * @param {string} approvalDashboard 
   *
   * @param {number} assigned_to 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{object}` - 
   */
  public getProject(hpb_id: any = {}, project_id: any = {}, project_name: any = {}, project_type: any = {}, project_stage: any = {}, project_pincode: any = {}, is_srku: any = {}, created_by: any = {}, updated_by: any = {}, created_date: any = {}, updated_date: any = {}, user_id: any = {}, rolename: any = {}, limit: any = {}, page: any = {}, approval: any = {}, approvalDashboard: any = {}, assigned_to: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/app_projects/getProject";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof hpb_id !== 'undefined' && hpb_id !== null) _urlParams.hpb_id = hpb_id;
    if (typeof project_id !== 'undefined' && project_id !== null) _urlParams.project_id = project_id;
    if (typeof project_name !== 'undefined' && project_name !== null) _urlParams.project_name = project_name;
    if (typeof project_type !== 'undefined' && project_type !== null) _urlParams.project_type = project_type;
    if (typeof project_stage !== 'undefined' && project_stage !== null) _urlParams.project_stage = project_stage;
    if (typeof project_pincode !== 'undefined' && project_pincode !== null) _urlParams.project_pincode = project_pincode;
    if (typeof is_srku !== 'undefined' && is_srku !== null) _urlParams.is_srku = is_srku;
    if (typeof created_by !== 'undefined' && created_by !== null) _urlParams.created_by = created_by;
    if (typeof updated_by !== 'undefined' && updated_by !== null) _urlParams.updated_by = updated_by;
    if (typeof created_date !== 'undefined' && created_date !== null) _urlParams.created_date = created_date;
    if (typeof updated_date !== 'undefined' && updated_date !== null) _urlParams.updated_date = updated_date;
    if (typeof user_id !== 'undefined' && user_id !== null) _urlParams.user_id = user_id;
    if (typeof rolename !== 'undefined' && rolename !== null) _urlParams.rolename = rolename;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof page !== 'undefined' && page !== null) _urlParams.page = page;
    if (typeof approval !== 'undefined' && approval !== null) _urlParams.approval = approval;
    if (typeof approvalDashboard !== 'undefined' && approvalDashboard !== null) _urlParams.approvalDashboard = approvalDashboard;
    if (typeof assigned_to !== 'undefined' && assigned_to !== null) _urlParams.assigned_to = assigned_to;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} hpb_id 
   *
   * @param {number} project_id 
   *
   * @param {string} project_name 
   *
   * @param {number} project_type 
   *
   * @param {number} project_stage 
   *
   * @param {number} project_pincode 
   *
   * @param {string} is_srku 
   *
   * @param {number} created_by 
   *
   * @param {number} updated_by 
   *
   * @param {number} created_date 
   *
   * @param {number} updated_date 
   *
   * @param {number} user_id 
   *
   * @param {string} rolename 
   *
   * @param {number} limit 
   *
   * @param {number} page 
   *
   * @param {string} approval 
   *
   * @param {string} approvalDashboard 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{object}` - 
   */
  public getProjectCount(hpb_id: any = {}, project_id: any = {}, project_name: any = {}, project_type: any = {}, project_stage: any = {}, project_pincode: any = {}, is_srku: any = {}, created_by: any = {}, updated_by: any = {}, created_date: any = {}, updated_date: any = {}, user_id: any = {}, rolename: any = {}, limit: any = {}, page: any = {}, approval: any = {}, approvalDashboard: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/app_projects/getProjectCount";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof hpb_id !== 'undefined' && hpb_id !== null) _urlParams.hpb_id = hpb_id;
    if (typeof project_id !== 'undefined' && project_id !== null) _urlParams.project_id = project_id;
    if (typeof project_name !== 'undefined' && project_name !== null) _urlParams.project_name = project_name;
    if (typeof project_type !== 'undefined' && project_type !== null) _urlParams.project_type = project_type;
    if (typeof project_stage !== 'undefined' && project_stage !== null) _urlParams.project_stage = project_stage;
    if (typeof project_pincode !== 'undefined' && project_pincode !== null) _urlParams.project_pincode = project_pincode;
    if (typeof is_srku !== 'undefined' && is_srku !== null) _urlParams.is_srku = is_srku;
    if (typeof created_by !== 'undefined' && created_by !== null) _urlParams.created_by = created_by;
    if (typeof updated_by !== 'undefined' && updated_by !== null) _urlParams.updated_by = updated_by;
    if (typeof created_date !== 'undefined' && created_date !== null) _urlParams.created_date = created_date;
    if (typeof updated_date !== 'undefined' && updated_date !== null) _urlParams.updated_date = updated_date;
    if (typeof user_id !== 'undefined' && user_id !== null) _urlParams.user_id = user_id;
    if (typeof rolename !== 'undefined' && rolename !== null) _urlParams.rolename = rolename;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof page !== 'undefined' && page !== null) _urlParams.page = page;
    if (typeof approval !== 'undefined' && approval !== null) _urlParams.approval = approval;
    if (typeof approvalDashboard !== 'undefined' && approvalDashboard !== null) _urlParams.approvalDashboard = approvalDashboard;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} hpb_id 
   *
   * @param {number} project_id 
   *
   * @param {string} project_name 
   *
   * @param {number} project_type 
   *
   * @param {number} project_stage 
   *
   * @param {number} project_pincode 
   *
   * @param {number} is_srku 
   *
   * @param {number} created_by 
   *
   * @param {number} updated_by 
   *
   * @param {number} created_date 
   *
   * @param {number} updated_date 
   *
   * @param {number} user_id 
   *
   * @param {string} rolename 
   *
   * @param {number} limit 
   *
   * @param {number} page 
   *
   * @param {string} approval 
   *
   * @param {string} sub_district_name 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{object}` - 
   */
  public getProjectWithApp(hpb_id: any = {}, project_id: any = {}, project_name: any = {}, project_type: any = {}, project_stage: any = {}, project_pincode: any = {}, is_srku: any = {}, created_by: any = {}, updated_by: any = {}, created_date: any = {}, updated_date: any = {}, user_id: any = {}, rolename: any = {}, limit: any = {}, page: any = {}, approval: any = {}, sub_district_name: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/app_projects/getProjectWithApp";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof hpb_id !== 'undefined' && hpb_id !== null) _urlParams.hpb_id = hpb_id;
    if (typeof project_id !== 'undefined' && project_id !== null) _urlParams.project_id = project_id;
    if (typeof project_name !== 'undefined' && project_name !== null) _urlParams.project_name = project_name;
    if (typeof project_type !== 'undefined' && project_type !== null) _urlParams.project_type = project_type;
    if (typeof project_stage !== 'undefined' && project_stage !== null) _urlParams.project_stage = project_stage;
    if (typeof project_pincode !== 'undefined' && project_pincode !== null) _urlParams.project_pincode = project_pincode;
    if (typeof is_srku !== 'undefined' && is_srku !== null) _urlParams.is_srku = is_srku;
    if (typeof created_by !== 'undefined' && created_by !== null) _urlParams.created_by = created_by;
    if (typeof updated_by !== 'undefined' && updated_by !== null) _urlParams.updated_by = updated_by;
    if (typeof created_date !== 'undefined' && created_date !== null) _urlParams.created_date = created_date;
    if (typeof updated_date !== 'undefined' && updated_date !== null) _urlParams.updated_date = updated_date;
    if (typeof user_id !== 'undefined' && user_id !== null) _urlParams.user_id = user_id;
    if (typeof rolename !== 'undefined' && rolename !== null) _urlParams.rolename = rolename;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof page !== 'undefined' && page !== null) _urlParams.page = page;
    if (typeof approval !== 'undefined' && approval !== null) _urlParams.approval = approval;
    if (typeof sub_district_name !== 'undefined' && sub_district_name !== null) _urlParams.sub_district_name = sub_district_name;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} project_id 
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{object}` - 
   */
  public addEditProject(dataArrObj: any = {}, project_id: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/app_projects/addEditProject";
    let _routeParams: any = {};
    let _postBody: any = {
      dataArrObj: dataArrObj
    };
    let _urlParams: any = {};
    if (typeof project_id !== 'undefined' && project_id !== null) _urlParams.project_id = project_id;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `App_projects`.
   */
  public getModelName() {
    return "App_projects";
  }
}
