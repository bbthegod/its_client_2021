interface Option {
  _id: string;
  answer: string;
  numbering: number;
}

interface Question {
  _id: string;
  content: string;
  options: Option[];
}
