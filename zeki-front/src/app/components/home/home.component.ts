import { Component } from '@angular/core';
import {Profile} from "../../services/profile/Profile";
import {ProfileService} from "../../services/profile/profile.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe( (data) => {
      this.profiles = data;
    })
  }

}
