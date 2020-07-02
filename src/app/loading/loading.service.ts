import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';

@Injectable()

 export class LoadingService {
  // Custom Observable = RXJs Subject.
  // Subject is like Observable, Subject can emit values. Observable can only subscribe, no way to control the values emmit by OBS.

  // -> Behavior subject is a special type of subject that emit the last value of the subject.
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log('Loading service created...');
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> { // --> <T> Get track of the type and return the same type.
    return of(null) // --> Create default Observable just in order to create an observable change.
      .pipe(
        tap(() => this.turnOn()), // --> When we receive "null", the default value. We turnOn the loader.
        // concatMap using for safely witch Observable
        concatMap(() => obs$), // --> switch to outputting the value emitted by the input Obs.
        finalize(() => this.turnOff()) // --> When input obs is completed we turn the loader off.
      );
  }

  turnOn() {
    this.loadingSubject.next(true);
  }

  turnOff() {
    this.loadingSubject.next(false);
  }
}
