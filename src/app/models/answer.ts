export class Answer {
    answerNum: number;
    questionNum: number;
    answerStr: string;
    isCorrect: boolean;
    selected: boolean;

    constructor(data: any) {
        this.answerNum = data.answerNum;
        this.questionNum = data.questionNum;
        this.answerStr = data.answerStr;
        this.isCorrect = data.isCorrect;
    }
}
