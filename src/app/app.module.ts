import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';

import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  {
     path:'',
     children: []
  },
  {
     path:'protected',
     component:ProtectedComponent,
     canActivate: [AuthGuardService]
  },
  {
     path:'auth-callback',
     component:AuthCallbackComponent
  }
  ];


@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    AuthCallbackComponent
  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuardService, AuthService, Adal6Service,{ provide:Adal6HTTPService, useFactory:Adal6HTTPService.factory, deps: [HttpClient, Adal6Service] } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
