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


const appRoutes: Routes = [

   // { path: '', component: OrderformComponent},
    //{ path: 'simplesolution', component: SimplesolutionComponent},
    { path: '', component: SimplesolutionComponent},
    { path: 'basicinformation', component: BasicinformationComponent},
    { path: 'confirmation', component: ConfirmationComponent},
    { path: 'trial', component: TrialComponent},
    { path: 'campaignsettings', component: CampaignsettingsComponent},
    { path: 'createaudience', component: CreateAudienceComponent},

];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });