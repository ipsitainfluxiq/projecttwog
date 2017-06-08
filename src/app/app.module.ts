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
/*import {DatepickerModule} from 'ngx-bootstrap/datepicker';*/
@NgModule({
  declarations: [
    AppComponent,
    OrderformComponent,
    SimplesolutionComponent,
    BasicinformationComponent,
    ConfirmationComponent,
    TrialComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    /*DatepickerModule.forRoot(),*/

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
