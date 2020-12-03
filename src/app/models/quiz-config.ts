export class QuizConfig {
    allowGoBack: boolean;
    allowReview: boolean;
    autoNext: boolean;  // if true, the quiz will move to next question automatically when answered.
    quizTime: number;  // indicates the time in which quiz must be completed. 0 means no time limit.
    requireAllAnswered: boolean;  // indicates if you must answer all the questions before submitting.
    shuffleQuestions: boolean;
    shuffleAnswers: boolean;
    displayClock: boolean;

    constructor(data: any) {
        data = data || {};
        this.allowGoBack = data.allowGoBack;
        this.allowReview = data.allowReview;
        this.autoNext = data.autoNext;
        this.quizTime = data.quizTime;
        this.requireAllAnswered = data.requireAllAnswered;
        this.shuffleQuestions = data.shuffleQuestions;
        this.shuffleAnswers = data.shuffleAnswers;
        this.displayClock = data.displayClock;
    }
}
