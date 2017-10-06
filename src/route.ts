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


const appRoutes: Routes = [

   // { path: '', component: OrderformComponent},
    // { path: 'simplesolution', component: SimplesolutionComponent},
    { path: 'simplesolution', component: SimplesolutionComponent},
    { path: 'basicinformation', component: BasicinformationComponent},
    { path: 'confirmation', component: ConfirmationComponent},
    { path: 'trail', component: TrialComponent},
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

];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });