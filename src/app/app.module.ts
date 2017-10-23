import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {appRoutingProviders, routing} from 'route';
import { AppComponent } from './app.component';
import { OrderformComponent } from './orderform/orderform.component';
import { SimplesolutionComponent } from './simplesolution/simplesolution.component';
import { BasicinformationComponent } from './basicinformation/basicinformation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { TrialComponent } from './trial/trial.component';
import { CampaignsettingsComponent } from './campaignsettings/campaignsettings.component';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
 // import {UiSwitchModule} from 'angular2-ui-switch';
 import {UiSwitchModule} from 'angular2-ui-switch/src';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CreateAudienceComponent } from './create-audience/create-audience.component';
import { OnlyNumberDirective } from './directives/only_number';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CampaignlistComponent } from './campaignlist/campaignlist.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import {AgmCircle, AgmCoreModule, CircleManager, GoogleMapsAPIWrapper} from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { SummaryComponent } from './summary/summary.component';
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserlistComponent } from './userlist/userlist.component';
import { OrderBy } from './orderby';
import { UsersearchPipe } from './search.pipe';
import { Ng2UploaderModule } from 'ng2-uploader';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LocationtraceComponent } from './locationtrace/locationtrace.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AccesscodeComponent } from './accesscode/accesscode.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { CicrlemapComponent } from './cicrlemap/cicrlemap.component';
import { PolyintersectComponent } from './polyintersect/polyintersect.component';
import { GetcircleComponent } from './getcircle/getcircle.component';
import { BrowserComponent } from './browser/browser.component';
import { PacingComponent } from './pacing/pacing.component';
import { LocationsComponent } from './locations/locations.component';
import { ViewabilityComponent } from './viewability/viewability.component';
import { DevicetypesComponent } from './devicetypes/devicetypes.component';
import { DealsComponent } from './deals/deals.component';
import { OsComponent } from './os/os.component';
import { DaypartingComponent } from './dayparting/dayparting.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderformComponent,
    SimplesolutionComponent,
    BasicinformationComponent,
    ConfirmationComponent,
    TrialComponent,
    CampaignsettingsComponent,
    CreateAudienceComponent,
    OnlyNumberDirective,
    CampaignlistComponent,
    HeaderComponent,
    SummaryComponent,
    TestComponent,
    SignupComponent,
    LoginComponent,
    UserlistComponent,
    OrderBy,
    UsersearchPipe,
    AccountdetailsComponent,
    UpdateprofileComponent,
    ChangepasswordComponent,
    LocationtraceComponent,
    ForgetpasswordComponent,
    AccesscodeComponent,
    NewpasswordComponent,
    CicrlemapComponent,
    PolyintersectComponent,
    GetcircleComponent,
    BrowserComponent,
    PacingComponent,
    LocationsComponent,
    ViewabilityComponent,
    DevicetypesComponent,
    DealsComponent,
    OsComponent,
    DaypartingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    IonRangeSliderModule,
    UiSwitchModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    Ng2UploaderModule,
    AgmCoreModule.forRoot({
     // apiKey: 'AIzaSyA2_vmiwMYMoLIAyN5Bb1C8XZYOyQwIq8U'
      apiKey: 'AIzaSyC7rd1BpaO2BEgfQMD7ekZ4dQ9gFsKIod4'
    }),
  ],
  providers: [CookieService, CircleManager, AgmCircle,  GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
