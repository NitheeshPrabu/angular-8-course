import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // custom observable
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        if (count === 3) {
          observer.complete();
        }
        if (count > 3) {
          // errors cancel the observable, do not complete it!
          observer.error(new Error('Count greater than 3'));
        }
        observer.next(count++);
      }, 1000);
    });

    customIntervalObservable.pipe(map((data: number) => {
      return 'Round : ' + (data + 1);
    }));

    // can combine infinite rxjs operators in the pipe
    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round : ' + (data + 1);
    })).subscribe(
      data => console.log(data),
      error => { console.log(error); alert(error); },
      () => console.log('Observable completed')
    );

  }

  ngOnDestroy() {
    // have to unsubscribe
    this.firstObsSubscription.unsubscribe();
  }

}
