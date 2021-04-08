import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl: string = 'http://localhost:3000/api/user';
  id: String = ''
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl+'/createUser', user);
  }

  editUser(user: User) {
    user.id = this.getUserID();
    return this.http.put<User>(this.baseUrl + '/updateUser', user);
  }

  getUserByID(id: String) {
    let obj = {
      id: id
    }
    return this.http.post<User>(this.baseUrl + '/fetchUser', obj);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + '/userList');
  }

  setUserID(id: String) {
    this.id = id;
  }

  getUserID() {
    return this.id;
  }
}
