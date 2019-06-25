import { LoggingService } from './logging.service';
import { Injectable, EventEmitter } from '@angular/core';

// Tells Angular that this service can be injected with others
@Injectable()
export class AccountsService {
	accounts = [
		{
			name: 'Master Account',
			status: 'active'
		},
		{
			name: 'Testaccount',
			status: 'inactive'
		},
		{
			name: 'Hidden Account',
			status: 'unknown'
		}
	];

	// to communicate between components through a service
	statusUpdated = new EventEmitter<string>();

	constructor(private loggingService: LoggingService) { }

	addAccount(name: string, status: string) {
		this.accounts.push({name, status});
		this.loggingService.logStatusChange(status);
	}

	updateStatus(id: number, status: string) {
		this.accounts[id].status = status;
		this.loggingService.logStatusChange(status);
	}
}
