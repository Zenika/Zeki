import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./services/profile/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'zeki-front';

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe( (data) => {
        console.log(data);
    })
  }

}
