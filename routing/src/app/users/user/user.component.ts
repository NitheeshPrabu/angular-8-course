import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name
    };

    // params is an observable
    // use this to make sure the component gets informed about changes in the route params
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => { this.user.id = params.id; this.user.name = params.name; }
    );
  }

  ngOnDestroy() {
    // Angular would auto do this for Route Observables, but for other Observables we
    // have to manually unsubscribe
    this.paramsSubscription.unsubscribe();
  }
}
