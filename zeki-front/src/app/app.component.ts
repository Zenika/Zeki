import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./services/profile/profile.service";
import {Profile} from "./Profile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'zeki-front';
  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe( (data) => {
      this.profiles = data;
      console.log(data);
    })
  }

}
