/**
 * Created by kta pc on 6/1/2017.
 */
/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderformComponent} from 'app/orderform/orderform.component';
import {SimplesolutionComponent} from 'app/simplesolution/simplesolution.component';
import {BasicinformationComponent} from 'app/basicinformation/basicinformation.component';
import {ConfirmationComponent} from 'app/confirmation/confirmation.component';
import {TrialComponent} from 'app/trial/trial.component';
import {CampaignsettingsComponent} from 'app/campaignsettings/campaignsettings.component';
import {CreateAudienceComponent} from 'app/create-audience/create-audience.component';
import {CampaignlistComponent} from 'app/campaignlist/campaignlist.component';
import {HeaderComponent} from 'app/header/header.component';
import {SummaryComponent} from 'app/summary/summary.component';
import {TestComponent} from 'app/test/test.component';
import {SignupComponent} from 'app/signup/signup.component';
import {LoginComponent} from 'app/login/login.component';
import {UserlistComponent} from 'app/userlist/userlist.component';
import {AccountdetailsComponent} from 'app/accountdetails/accountdetails.component';
import {UpdateprofileComponent} from 'app/updateprofile/updateprofile.component';
import {ChangepasswordComponent} from 'app/changepassword/changepassword.component';
import {LocationtraceComponent} from 'app/locationtrace/locationtrace.component';
import {ForgetpasswordComponent} from 'app/forgetpassword/forgetpassword.component';
import {AccesscodeComponent} from 'app/accesscode/accesscode.component';
import {NewpasswordComponent} from 'app/newpassword/newpassword.component';
import {CicrlemapComponent} from 'app/cicrlemap/cicrlemap.component';
import {PolyintersectComponent} from 'app/polyintersect/polyintersect.component';
import {GetcircleComponent} from 'app/getcircle/getcircle.component';
import {LocationsComponent} from 'app/locations/locations.component';
/*------------------------------------------
    --------------------------------------*/
import {BrowserComponent} from 'app/browser/browser.component';
import {PacingComponent} from 'app/pacing/pacing.component';
import {ViewabilityComponent} from 'app/viewability/viewability.component';
import {DevicetypesComponent} from 'app/devicetypes/devicetypes.component';
import {DealsComponent} from 'app/deals/deals.component';
import {OsComponent} from 'app/os/os.component';
import {DaypartingComponent} from 'app/dayparting/dayparting.component';
import {AudiencelistComponent} from 'app/audiencelist/audiencelist.component';
import {TriallocComponent} from 'app/trialloc/trialloc.component';
import {TrialAirtoryComponent} from 'app/trial-airtory/trial-airtory.component';
import {CreativeaddComponent} from 'app/creativeadd/creativeadd.component';
import {CreativelistComponent} from 'app/creativelist/creativelist.component';
import {CreativeeditComponent} from 'app/creativeedit/creativeedit.component';
import { AdminlistComponent } from 'app/adminlist/adminlist.component';
import { AdminaddComponent } from 'app/adminadd/adminadd.component';
import { AdmineditComponent } from 'app/adminedit/adminedit.component';
import { AdbanneraddComponent } from 'app/adbanneradd/adbanneradd.component';
import { AdbannerlistComponent } from 'app/adbannerlist/adbannerlist.component';
import { AdbannereditComponent } from 'app/adbanneredit/adbanneredit.component';
import { AdbanneraddnewComponent } from 'app/adbanneraddnew/adbanneraddnew.component';
import { AdbannereditnewComponent } from 'app/adbannereditnew/adbannereditnew.component';
import {CampaignaddComponent} from './app/campaignadd/campaignadd.component';
import {CampaignlistnewComponent} from './app/campaignlistnew/campaignlistnew.component';
import {CampaigneditComponent} from "./app/campaignedit/campaignedit.component";

const appRoutes: Routes = [

   // { path: '', component: OrderformComponent},
    // { path: 'simplesolution', component: SimplesolutionComponent},
    { path: 'simplesolution', component: SimplesolutionComponent},
    { path: 'basicinformation', component: BasicinformationComponent},
    { path: 'confirmation', component: ConfirmationComponent},
    { path: 'trial', component: TrialComponent},
    { path: 'campaignsettings', component: CampaignsettingsComponent},
    { path: 'createaudience', component: CreateAudienceComponent},
    { path: 'campaignlist', component: CampaignlistComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'summary', component: SummaryComponent},
    { path: 'test', component: TestComponent},
    { path: 'signup', component: SignupComponent},
    { path: '', component: LoginComponent},
    { path: 'userlist', component: UserlistComponent},
    { path: 'accountdetails', component: AccountdetailsComponent},
    { path: 'updateprofile', component: UpdateprofileComponent},
    { path: 'changepassword', component: ChangepasswordComponent},
    { path: 'locationtrace', component: LocationtraceComponent},
    { path: 'forgetpassword', component: ForgetpasswordComponent},
    { path: 'accesscode', component: AccesscodeComponent},
    { path: 'newpassword', component: NewpasswordComponent},
    { path: 'circlemap', component: CicrlemapComponent},
    { path: 'polyintersect', component: PolyintersectComponent},
    { path: 'getcircle', component: GetcircleComponent},
    { path: 'browser', component: BrowserComponent},
    { path: 'pacing', component: PacingComponent},
    { path: 'locations', component: LocationsComponent},
    { path: 'viewability', component: ViewabilityComponent},
    { path: 'devicetypes', component: DevicetypesComponent},
    { path: 'deals', component: DealsComponent},
    { path: 'os', component: OsComponent},
    { path: 'dayparting', component: DaypartingComponent},
    { path: 'audiencelist', component: AudiencelistComponent},
    { path: 'trialloc', component: TriallocComponent},
    { path: 'trial_airtory', component: TrialAirtoryComponent},
    { path: 'creativeadd', component: CreativeaddComponent},
    { path: 'creativelist', component: CreativelistComponent},
    { path: 'campaignadd', component: CampaignaddComponent},
    { path: 'creativeedit/:id', component: CreativeeditComponent},
    { path: 'adminedit/:id', component: AdmineditComponent},
    { path: 'adminadd', component: AdminaddComponent},
    { path: 'adminlist', component: AdminlistComponent},
    { path: 'adbanneradd', component: AdbanneraddComponent},
    { path: 'adbannerlist', component: AdbannerlistComponent},
    { path: 'adbanneredit/:id', component: AdbannereditComponent},
    { path: 'adbanneraddnew', component: AdbanneraddnewComponent},
    { path: 'adbannereditnew/:id', component: AdbannereditnewComponent},
    { path: 'campaignedit/:id', component: CampaigneditComponent},
    { path: 'campaignlistnew', component: CampaignlistnewComponent}

];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });