import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {Answer, Question} from "../../services/profile/Question";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  timer: number = 30;
  score: number = 0;
  questions: Question[] = [];
  questionIndex: number = 0;

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit(): void {
    const timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer < 0) {
        clearInterval(timerInterval);
        this.timer = 0;
        this.router.navigate(['/score', {score: this.score}])
      }
    }, 1000);
    this.profileService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  getDigit(number: number, place: number): string {
    const strNumber = String(number).padStart(2, '0');
    return strNumber[place];
  }

  checkAnswer(answer: Answer): boolean {
    if (this.questions[this.questionIndex].solution.surname == answer.surname && this.questions[this.questionIndex].solution.name == answer.name) {
      this.questionIndex++;
      this.score += 100;
      return true;
    }
    this.score -= 100;
    this.questionIndex++;
    return false;
  }

}
