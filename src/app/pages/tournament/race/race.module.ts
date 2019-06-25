import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from './race.component';

@NgModule({
  declarations: [RaceComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RaceComponent,
  ]
})
export class RaceModule { }
