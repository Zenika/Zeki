export interface Question {
  picture: string;
  solution: Answer
  answers: Answer[]
}

export interface Answer {
  name: string,
  surname: string
}
