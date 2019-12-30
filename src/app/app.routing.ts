import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '../providers/authenticated-guard/authenticated-guard';
import { AuthenticatedRole } from '../providers/authenticated-role/authenticated-role';
import { LoopBackConfig } from '../shared/loopback_sdk';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [{
	path: '',
	redirectTo: 'login',
	pathMatch: 'full',
},
{
	path: 'login',
	loadChildren: './pages/login/login.module#LoginModule',
	data: {
		title: 'Login'
	}
},
{
	path: 'password-forget',
	loadChildren: './pages/password-forget/password_forget.module#PasswordForgetModule',
	data: {
		title: 'Password Forget?'
	}
},
{
	path: 'password-reset/:token',
	loadChildren: './pages/password-reset/password_reset.module#PasswordResetModule',
	data: {
		title: 'Password Forget?'
	}
},
{
	path: 'register',
	loadChildren: './pages/register/register.module#RegisterModule',
	data: {
		title: 'Register'
	}
},
{
	path: '',
	component: FullLayoutComponent,
	data: {
		title: 'Home'
	},
	children: [
		{
			path: 'dashboard',
			loadChildren: './dashboard/dashboard.module#DashboardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'settings',
			loadChildren: './pages/settings/settings.module#SettingsModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'profile',
			loadChildren: './pages/profile/profile.module#ProfileModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users',
			loadChildren: './pages/users/user/user.module#UserModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/sph',
			loadChildren: './pages/users/sph/sph.module#SphModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/tlh',
			loadChildren: './pages/users/tlh/tlh.module#TlhModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/ac',
			loadChildren: './pages/users/ac/ac.module#AcModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/ra',
			loadChildren: './pages/users/ra/ra.module#RaModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/am',
			loadChildren: './pages/users/am/am.module#AmModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/sa',
			loadChildren: './pages/users/sa/sa.module#SaModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/hpb-update-approval',
			loadChildren: './pages/hpb-update-list/hpb-update-list.module#HpbUpdateListModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'hpb-update-view/:id',
			loadChildren: './pages/hpb-update-view/hpb-update-view.module#HpbUpdateModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'view-product',
			loadChildren: './pages/view-product/view-product.module#ViewProductModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/view-user/:id/:role',
			loadChildren: './pages/users/view-user/view-user.module#ViewUserModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/edit-user/:id/:role',
			loadChildren: './pages/users/edit-user/edit-user.module#EditUserModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/add-user',
			loadChildren: './pages/users/add-user/add-user.module#AddUserModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'users/upload-users',
			loadChildren: './pages/users/upload-users/upload-users.module#UploadUsersModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'ac-reports/scorecard',
			loadChildren: './pages/ac-reports/ac-scorecard/ac-scorecard.module#AcScorecardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'ac-reports/web-view',
			loadChildren: './pages/ac-reports/web-view/web-view.module#WebViewModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'am-reports/scorecard',
			loadChildren: './pages/am-reports/am-scorecard/am-scorecard.module#AmScorecardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'am-reports/web-view',
			loadChildren: './pages/am-reports/web-view/web-view.module#WebViewModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'hpb-reports',
			loadChildren: './pages/hpb-reports/hpb-reports.module#HPBReportsModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'summary-detail',
			loadChildren: './pages/hpb-reports/summary-detail/summary-detail.module#SummaryDetailModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'summary-actlh',
			loadChildren: './pages/hpb-reports/summary-actlh/summary-actlh.module#SummaryAcTlhModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'summary-region',
			loadChildren: './pages/hpb-reports/summary-region/summary-region.module#SummaryRegionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'summary-ho',
			loadChildren: './pages/hpb-reports/summary-ho/summary-ho.module#SummaryHoModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'product-request-raw-data',
			loadChildren: './pages/product-request-raw-data/product-request-raw-data.module#ProductRequestRawDataModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'visit-sph-raw',
			loadChildren: './pages/visit-sph-raw/visit-sph-raw.module#SPHVisitModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'visit-detail',
			loadChildren: './pages/visit-sph-raw/visit-detail/visit-detail.module#VisitDetailModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'visit-summary-actlh',
			loadChildren: './pages/visit-sph-raw/visit-summary-actlh/visit-summary-actlh.module#VisitSummaryAcTlhModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'visit-summary-region',
			loadChildren: './pages/visit-sph-raw/visit-summary-region/visit-summary-region.module#VisitSummaryRegionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'visit-summary-ho',
			loadChildren: './pages/visit-sph-raw/visit-summary-ho/visit-summary-ho.module#VisitSummaryHoModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'edit-hpb/:id',
			loadChildren: './pages/edit-hpb/edit-hpb.module#EditHpbModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'view-hpb/:id',
			loadChildren: './pages/view-hpb/view-hpb.module#ViewHpbModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'add-hpb',
			loadChildren: './pages/add-hpb/add-hpb.module#AddHpbModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'hpb',
			loadChildren: './pages/hpb/hpb.module#HpbModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'edit-project-type/:id',
			loadChildren: './pages/edit-project-type/edit-project-type.module#EditProjectTypeModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'add-project-type',
			loadChildren: './pages/add-project-type/add-project-type.module#AddProjectTypeModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'add-project',
			loadChildren: './pages/add-project/add-project.module#AddProjectModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'view-project/:id',
			loadChildren: './pages/view-project/view-project.module#ViewProjectModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'project',
			loadChildren: './pages/project/project.module#ProjectModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'edit-rds/:id',
			loadChildren: './pages/edit-rds/edit-rds.module#EditRdsModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'add-rds',
			loadChildren: './pages/add-rds/add-rds.module#AddRdsModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'rds',
			loadChildren: './pages/rds/rds.module#RdsModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		},
		{
			path: 'view-rds/:id',
			loadChildren: './pages/view-rds/view-rds.module#ViewRdsModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-rds-visit/:id',
			loadChildren: './pages/view-rds-visit/view-rds_visit.module#ViewRdsVisitModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'rds-visit',
			loadChildren: './pages/rds-visit/rds_visit.module#RdsVisitModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-reward/:id',
			loadChildren: './pages/view-reward/view-reward.module#ViewRewardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-product/:id',
			loadChildren: './pages/view-product/view-product.module#ViewProductModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-product/:id',
			loadChildren: './pages/edit-product/edit-product.module#EditProductModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-product',
			loadChildren: './pages/add-product/add-product.module#ProductCrudModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'product',
			loadChildren: './pages/product/product.module#ProductModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'project',
			loadChildren: './pages/project/project.module#ProjectModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-product-receipt',
			loadChildren: './pages/add-product-receipt/add-product_receipt.module#AddProductReceiptModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-product-receipt/:id/:page',
			loadChildren: './pages/view-product-receipt/view-product_receipt.module#ViewProductReceiptModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'product-receipt',
			loadChildren: './pages/product-receipt/product_receipt.module#ProductReceiptModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'pending-product-receipt',
			loadChildren: './pages/pending-product-receipt/pending_product_receipt.module#PendingProductReceiptModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'product-receipt-approval',
			loadChildren: './pages/product-receipt-approval/product_receipt_approval.module#ProductReceiptApprovalModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'product-request',
			loadChildren: './pages/product-request/product_request.module#ProductRequestModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'cement-bag-removal',
			loadChildren: './pages/cement-bag-removal/cement-bag-removal.module#CementBagRemovalModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-cement-bag-removal/:id',
			loadChildren: './pages/view-cement-bag-removal/view-cement-bag-removal.module#ViewCementBagRemovalModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-product-request/:id',
			loadChildren: './pages/view-product-request/view-product_request.module#ViewProductRequestModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'visit-plan',
			loadChildren: './pages/visit-plan/visit_plan.module#VisitPlanModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'monthly-actual-target',
			loadChildren: './pages/monthly-actual-target/monthly_actual_target.module#MonthlyActualTargetModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-monthly-actual-target',
			loadChildren: './pages/add-monthly-actual-target/add_monthly_actual_target.module#AddMonthlyActualTargetModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'monthly-forecast-target',
			loadChildren: './pages/monthly-forecast-target/monthly_forecast_target.module#MonthlyForecastTargetModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-monthly-forecast-target',
			loadChildren: './pages/add-monthly-forecast-target/add_monthly_forecast_target.module#AddMonthlyForecastTargetModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-visit-plan',
			loadChildren: './pages/add-visit-plan/add_visit_plan.module#AddVisitPlanModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-region/:id',
			loadChildren: './pages/edit-region/edit-region.module#EditRegionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-region',
			loadChildren: './pages/add-region/add-region.module#AddRegionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'reward',
			loadChildren: './pages/reward/reward.module#RewardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-reward',
			loadChildren: './pages/add-reward/add-reward.module#AddRewardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-reward/:id',
			loadChildren: './pages/edit-reward/edit-reward.module#EditRewardModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'redemption',
			loadChildren: './pages/redemption/redemption.module#RedemptionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-redemption/:id',
			loadChildren: './pages/view-redemption/view-redemption.module#ViewRedemptionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'rewardwishlist',
			loadChildren: './pages/rewardwishlist/rewardwishlist.module#RewardwishlistModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'region',
			loadChildren: './pages/region/region.module#RegionModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-province/:id',
			loadChildren: './pages/edit-province/edit-province.module#EditProvinceModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-province',
			loadChildren: './pages/add-province/add-province.module#AddProvinceModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'province',
			loadChildren: './pages/province/province.module#ProvinceModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-district/:id',
			loadChildren: './pages/edit-district/edit-district.module#EditDistrictModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-district',
			loadChildren: './pages/add-district/add-district.module#AddDistrictModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'district',
			loadChildren: './pages/district/district.module#DistrictModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-municipality/:id',
			loadChildren: './pages/edit-municipality/edit-municipality.module#EditMunicipalityModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-municipality',
			loadChildren: './pages/add-municipality/add-municipality.module#AddMunicipalityModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'municipality',
			loadChildren: './pages/municipality/municipality.module#MunicipalityModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-subdistrict/:id',
			loadChildren: './pages/edit-subdistrict/edit-subdistrict.module#EditSubdistrictModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-subdistrict',
			loadChildren: './pages/add-subdistrict/add-subdistrict.module#AddSubdistrictModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'subdistrict',
			loadChildren: './pages/subdistrict/subdistrict.module#SubdistrictModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-postalcode/:id',
			loadChildren: './pages/edit-postalcode/edit-postalcode.module#EditPostalCodeModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-postalcode',
			loadChildren: './pages/add-postalcode/add-postalcode.module#AddPostalCodeModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'postalcode',
			loadChildren: './pages/postalcode/postalcode.module#PostalCodeModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-nmc/:id',
			loadChildren: './pages/edit-nmc/edit-nmc.module#EditNmcModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-nmc',
			loadChildren: './pages/add-nmc/add-nmc.module#AddNmcModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'nmc',
			loadChildren: './pages/nmc/nmc.module#NmcModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'project-type',
			loadChildren: './pages/project-type/project-type.module#ProjectTypeModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'project-stage',
			loadChildren: './pages/project-stage/project-stage.module#ProjectStageModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'edit-project-stage/:id',
			loadChildren: './pages/edit-project-stage/edit-project-stage.module#EditProjectStageModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'add-project-stage',
			loadChildren: './pages/add-project-stage/add-project-stage.module#AddProjectStageModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'all-masters',
			loadChildren: './pages/all-masters/all_masters.module#AllMastersModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'eap-support-assignment',
			loadChildren: './pages/eap-support-assignment/eap-support-assignment.module#EapSupportAssignmentModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: 'view-eap-support-assignment',
			loadChildren: './pages/view-eap-support-assignment/view-eap-support-assignment.module#ViewEapSupportAssignmentModule',
			canActivate: [AuthenticatedGuard, AuthenticatedRole]
		}, {
			path: '**',
			redirectTo: 'login'
		}
	]
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
