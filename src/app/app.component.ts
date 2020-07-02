import {Component, OnInit} from '@angular/core';
import {LoadingService} from './loading/loading.service';
import {MessagesService} from './messages/messages.service';
import {AuthStore} from './services/auth.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers Visible to child components of the app-root but not services singleton global
  // In example in course dialog component we dont have access to this instance of loading
  // service because its an another branch pf the app generate by material dialog
  // so we need to define an other instance of loading service in provider!
})
export class AppComponent implements  OnInit {

    constructor(
      public authStore: AuthStore
    ) {

    }

    ngOnInit() {


    }

  logout() {
    this.authStore.logout();
  }

}
