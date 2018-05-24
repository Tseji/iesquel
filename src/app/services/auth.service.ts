// This service will manage signin, signout and users data

import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
 
@Injectable()
export class AuthService {
 
private _user=null;
private _config = {
   tenant:'29abf16e-95a2-4d13-8d51-6db1b775d45b', 
   clientId:'4fee1b89-deee-4f74-9b13-684872c8b6e4', 
   redirectUri:"http://localhost:4200/auth-callback", 
   postLogoutRedirectUri:"http://localhost:4200" 
}
 
constructor(private _adal:Adal6Service) {
   this._adal.init(this._config);
}
 
public isLoggedIn():boolean {
   return this._adal.userInfo.authenticated;
}
 
public signout():void {
   this._adal.logOut();
}
 
public startAuthentication():any {
   this._adal.login();
}
 
public getName():string {
   return this._user.profile.name;
}
 
public completeAuthentication():void {
   this._adal.handleWindowCallback();
   this._adal.getUser().subscribe(user=> {
   this._user=user;
   console.log(this._adal.userInfo);
   var expireIn=user.profile.exp.newDate().getTime();
});
 
}
 
}