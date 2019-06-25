import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { RaceModule } from './race/race.module';
import { TournamentComponent } from './tournament.component';
import { ChatComponent } from './chat/chat.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [TournamentComponent, ChatComponent, StatsComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    RaceModule,
  ]
})
export class TournamentModule { }
