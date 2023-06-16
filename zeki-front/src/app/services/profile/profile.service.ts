import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface Profile {
  url: string;
  name: string;
  surname: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  profilesUrl = 'http://localhost:3000/images/all'

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.profilesUrl);
  }

}
