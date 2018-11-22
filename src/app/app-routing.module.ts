import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExAddComponent } from './ex-add/ex-add.component';
import { ExListComponent } from './ex-list/ex-list.component';
import { ExHistoryComponent } from './ex-history/ex-history.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add',
    component: ExAddComponent
  },
  {
    path: 'list',
    component: ExListComponent
  },
  {
    path: 'history',
    component: ExHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
