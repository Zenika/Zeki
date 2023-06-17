import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

interface Score {
  name: string,
  score: number
}

@Component({
  selector: 'app-home',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {

  pseudoIsDone: boolean = false;
  participantName: string = '';

  scores: Score[] = [{
    name: "Didier",
    score: 1000
  }
  ];

  constructor(private route: ActivatedRoute) {
  }

  submitForm() {
    if (this.participantName.trim() !== '') {
      let score = Number(this.route.snapshot.paramMap.get('score'));
      this.scores.push({
        name: this.participantName.trim(),
        score: score
      });
      this.scores.sort((a, b) => b.score - a.score);
      this.pseudoIsDone = true;
    }
  }

}
