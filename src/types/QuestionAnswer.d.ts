interface QuestionAnswer {
  _id: string;
  answer: number;
  answered?: boolean;
  questionId: Question;
}
