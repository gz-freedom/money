import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ex-add',
  templateUrl: './ex-add.component.html',
  styleUrls: ['./ex-add.component.css']
})
export class ExAddComponent implements OnInit {
  monthDays: number = (() => {
    let d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth() + 1;
    return new Date(year, month, 0).getDate() - new Date().getDate() + 1;
  })();
  daySpend: number = 0;
  totalSpend: number = 0;

  constructor() {
  }

  keyup() {
    this.totalSpend = this.monthDays * this.daySpend;
  }

  ngOnInit() {
  }

}
