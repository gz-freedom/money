import { Component, OnInit } from '@angular/core';
import { ExService } from "../ex.service";
import MonthSpend from "../class/monthSpend";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hasPlan:boolean;
  monthDays: number = (() => {
    let d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth() + 1;
    return new Date(year, month, 0).getDate() - new Date().getDate() + 1;
  })();
  daySpend: number = 0;
  totalSpend: number = 0;

  constructor(private es: ExService) { }

  ngOnInit() {
    this.es.getCurrentExpenditure().subscribe((res: MonthSpend[]) => {
      this.hasPlan = (res.length !== 0);
    });
  }

  keyup() {
    this.totalSpend = this.monthDays * this.daySpend;
  }

  addExpenditure() {
    
  }

}
