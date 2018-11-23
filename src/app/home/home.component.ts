import { Component, OnInit } from '@angular/core';
import { ExService } from "../ex.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private es: ExService) { }

  ngOnInit() {
    this.es.getCurrentExpenditure().subscribe(res => {
      //
    });
  }

}
