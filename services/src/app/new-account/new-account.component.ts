import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../shared/logging.service';
import { AccountsService } from '../shared/accounts.service';

@Component({
	selector: 'app-new-account',
	templateUrl: './new-account.component.html',
	styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
	// @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

	constructor(private loggingService: LoggingService, private accountsService: AccountsService) {
		// now new-account component can listen of which ever component that emits this Event
		this.accountsService.statusUpdated.subscribe(
			(status: string) => alert('New Status: ' + status)
		);
	}

	onCreateAccount(accountName: string, accountStatus: string) {

		// No longer need to emit events
		// this.accountAdded.emit({
		// 	name: accountName,
		// 	status: accountStatus
		// });
		this.accountsService.addAccount(accountName, accountStatus);

		// console.log('A server status changed, new status: ' + accountStatus);

		// WRONG WAY OF USING SERVICES, USE DEPENDENCY INJECTOR INSTEAD
		// const service = new LoggingService();
		// service.logStatusChange(accountStatus);

		// this.loggingService.logStatusChange(accountStatus);
	}
}
