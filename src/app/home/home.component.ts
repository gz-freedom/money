import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ExService } from "../ex.service";

import MonthSpend from "../class/monthSpend";
import DaySpend from '../class/daySpend';
import SpendItem from "../class/spendItem";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  angForm: FormGroup;
  date_today:Date = new Date();
  thisYear:number = this.date_today.getFullYear();
  thisMonth:number = this.date_today.getMonth() + 1;
  thisDay: number = this.date_today.getDate();
  monthDays: number = (() => {
    return new Date(this.thisYear, this.thisMonth, 0).getDate() - this.thisDay + 1;
  })();
  daySpend: number = 0;
  totalSpend: number = 0;
  currentTotal: number = 0;
  currentExpenditure;
  dayExpenditure: DaySpend[];
  todayItems: SpendItem[] = [];
  todayExpenditure: DaySpend = {
    day: this.thisDay,
    dayTotal: 0,
    dayLeft: 80,
    dayNote: "",
    items: this.todayItems
  };
  currentMonthLeft: number;
  

  constructor(private es: ExService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      itemName: ['', Validators.required],
      itemPrice: [, Validators.required],
      note: ['']
    });
  }

  ngOnInit() {
    this.es.getCurrentExpenditure(this.thisYear, this.thisMonth).subscribe((res: MonthSpend) => {
      this.currentMonthExpenditureHandler(res);
    });
  }

  currentMonthExpenditureHandler(data: MonthSpend) {
    if(data) {
      this.currentExpenditure = data;
      this.currentMonthLeft = parseInt(data.total + "") - parseInt(data.currentTotal + "");
      this.dayExpenditure = data.dayExpenditure;
    }

    if(this.dayExpenditure) {
      let todaySpend = this.dayExpenditure && this.dayExpenditure.filter(data => {
        return data.day === this.thisDay;
      }).pop();
      if(todaySpend) {
        this.todayExpenditure = todaySpend;
        this.todayItems = todaySpend.items;
      }        
    }
  }

  keyup() {
    this.totalSpend = this.monthDays * this.daySpend;
  }

  addExpenditure() {
    let obj = {
      year: this.thisYear,
      month: this.thisMonth,
      days: this.monthDays,
      total: this.totalSpend,
      dayTotal: this.daySpend,
      currentTotal: this.currentTotal,
      dayExpenditure: this.dayExpenditure
    };
    this.es.addExpenditure(obj)
        .subscribe(res => {
          this.ngOnInit();
        });
  }

  addSpend(name, price, note) {
    let spendItem: SpendItem = {
      name: name,
      price: price,
      note: note
    };
    let currentTotal = parseInt(this.currentExpenditure.currentTotal + "") + parseInt(price);
    this.todayExpenditure.dayLeft = parseInt(this.todayExpenditure.dayLeft + "") - parseInt(price);
    this.todayExpenditure.items.push(spendItem);
    this.todayExpenditure.dayTotal = parseInt(this.todayExpenditure.dayTotal + "") + parseInt(price);
    
    this.es.updateExpenditure(this.todayExpenditure, currentTotal, this.currentExpenditure._id).subscribe((res: MonthSpend) => {
      this.angForm.reset({ itemName: '' });
      this.currentMonthExpenditureHandler(res);
    });
  }

}
