export type Question = {
  question: string;
  propositions: string[];
  answer: string;
};

export type Quiz = {
  id: string;
  created_at: string;
  creator: string;
  name: string;
  description?: string;
  questions: Question[];
};
