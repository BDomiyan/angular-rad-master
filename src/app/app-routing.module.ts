import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { InitializeComponent } from './pages/initialize/initialize.component';
import { AuthGuard } from './core/auth.guard';

// const redirectUnauthorizedToInitialize = redirectUnauthorizedTo(['initialize']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './pages/landing/landing.module#LandingModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'tournament',
    loadChildren: './pages/tournament/tournament.module#TournamentModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'initialize',
    component: InitializeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
