import { FbResponse, User } from './interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

public create(user): Observable<User> {
    return this.http.post(`${environment.fbDbUrl}/users.json`, user).pipe(
      map((res: FbResponse) => {
        return {
          ...user,
          id: res.name,
          date: new Date(user.date),
        };
      })
    );
  }

  public getAll(): Observable<User[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`).pipe(
      map((res) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          created_at: new Date(res[key].сreated_at),
        }));
      })
    );
  }

 public getById(id): Observable<User>{
    return this.http.get(`${environment.fbDbUrl}/users/${id}.json`).pipe(
      map((res: User) => {
        return { ...res,
           id ,
          };
      })
    );
  }

 public remove(id): Observable<any> {
    return this.http.delete(`${environment.fbDbUrl}/users/${id}.json`);
  }

public update(user: User): Observable<any> {
    return this.http.patch(
      `${environment.fbDbUrl}/users/${user.id}.json`,
      user
    );
  }

}
