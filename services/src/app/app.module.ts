import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountComponent } from './account/account.component';
import { AccountsService } from './shared/accounts.service';
import { LoggingService } from './shared/logging.service';

/**
 * HIERARCHICAL INJECTORS (SERVICES)
 * AppModule - Same instance of service available Application-Wide
 * AppComponent - Same instance of service available for all Components (but not for other Services)
 * Any other Component - Same instance of service available for the Component and all its children
 */

 @NgModule({
  declarations: [
    AppComponent,
    NewAccountComponent,
    AccountComponent
  ],
  imports: [
	BrowserModule,
	FormsModule
  ],
  providers: [AccountsService, LoggingService],	// whole application has access to this service
  bootstrap: [AppComponent]
})
export class AppModule { }
