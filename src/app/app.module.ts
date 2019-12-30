import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { AuthenticatedGuard } from '../providers/authenticated-guard/authenticated-guard';
import { AuthenticatedRole } from '../providers/authenticated-role/authenticated-role';

import { ShareService } from '../providers/share-service/share-service';



// include this for csv reader
import { FileUtil } from '../providers/file.util';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

import { SDKBrowserModule } from '../shared/loopback_sdk/';
import { enableProdMode } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { PaginatorModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';
import { ExcelService } from 'providers/services/services';
// Routing Module
import { AppRoutingModule } from './app.routing';
enableProdMode();
@NgModule({
  imports: [
    ConfirmDialogModule,
    BrowserModule,
    PaginatorModule,
    BrowserAnimationsModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    AutoCompleteModule,
    BusyModule,
    CalendarModule,
    ButtonModule,
    ChartsModule,
    HttpModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  { provide: CookieService, useFactory: cookieServiceFactory },
    AuthenticatedGuard,
    AuthenticatedRole,
    ShareService,
    FileUtil,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function cookieServiceFactory() { return new CookieService(); }
