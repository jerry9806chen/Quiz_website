import { Answer } from './answer';

export class Question {
    questionNum: number;
    questionStr: string;
    questionTypeNum: number;
    answers: Answer[];
    answered: boolean;

    constructor(data: any) {
        this.questionNum = data.questionNum;
        this.questionStr = data.questionStr;
        this.questionTypeNum = data.questionTypeNum;
        this.answers = [];
        this.answered = false;
        data.options.forEach(o => {
            this.answers.push(new Answer(o));
        });
    }
}
