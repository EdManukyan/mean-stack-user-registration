import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {environment} from "../../../environments/environment";

import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private _http: HttpClient) {
  }

  public postUser(user: User) {
    return this._http.post(environment.apiBaseUrl + '/register', user);
  }
}
