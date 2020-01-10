import { Component, OnInit } from '@angular/core';

import { EntryService } from '../entry.service';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

@Component({
  selector: 'app-entry-display',
  templateUrl: './entry-display.component.html',
  styleUrls: ['./entry-display.component.css']
})
export class EntryDisplayComponent implements OnInit {
  subscription: Subscription;
  selected_date = new Date();


  constructor(private entryService: EntryService) {
    this.subscription = this.entryService.readRefresh().subscribe(message => {
      this.getEntryByDate();
    });
  }

  json;


  getEntryByDate() {

    // const utc_date = this.selected_date.toUTCString();
    this.json = this.entryService.getEntryByDate(moment(this.selected_date).format('YYYY-MM-DD'));
    // this.json.subscribe(data => {
    //   console.log(data);
    // }); 
  }

  ngOnInit() {
    this.getEntryByDate();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
