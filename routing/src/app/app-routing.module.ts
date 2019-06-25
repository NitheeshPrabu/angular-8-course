import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { UserComponent } from './users/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolve.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }, // dynamic route
    ]
  },
  {
    path: 'servers', /*canActivate: [AuthGuard]*/ canActivateChild: [AuthGuard], component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'This page was not found!' } },
  { path: '**', redirectTo: '/not-found' }  // match all left over routes, must be the last generic route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // hash mode routing.  Some old servers will not handle redirection (eg. page not found to index.html) properly.
                                                              // Tells the web server to only care about serving the part before the '/#/...', so that such redirection is handled by Angular
  exports: [RouterModule]
})
export class AppRoutingModule { }
