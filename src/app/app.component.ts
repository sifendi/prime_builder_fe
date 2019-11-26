import { Component } from '@angular/core';
import { LoopBackConfig } from '../shared/loopback_sdk/index';
declare var hostname:any;
@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {

    constructor() {
 
        LoopBackConfig.setBaseURL(hostname);
        LoopBackConfig.setApiVersion('api');

    }
 }
