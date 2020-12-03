import { Component, OnInit } from '@angular/core';

import { Answer, Question, Quiz, QuizConfig } from '../models/index';
import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
//import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-quizcomp',
  templateUrl: './quizcomp.component.html',
  styleUrls: [],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  // Default configuration is used, unless quiz object specifies another configuration.
  defaultConfig: QuizConfig = {
    'allowGoBack': true,
    'allowReview': true,
    'autoNext': false,  // if true, it will move to next question automatically when answered.
    'quizTime': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'requireAllAnswered': false,  // indicates if you must answer all the questions before submitting.
    'shuffleQuestions': false,
    'shuffleAnswers': false,
    'displayClock': true
  };
  config: QuizConfig = {
    'allowGoBack': true,
    'allowReview': true,
    'autoNext': false,
    'quizTime': 300,
    'requireAllAnswered': false,
    'shuffleQuestions': false,
    'shuffleAnswers': false,
    'displayClock': true
  };
  modes: string[] = ['quiz','result','review','login','select']

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  ellapsedTime = '0:00:00';
  quizTime = '';
  loginFailed: boolean = false;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    //this.loadQuiz(this.quizName);
    this.mode = this.modes[3];
  }

  onLogin(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    console.log(username, password);
  }

  loadQuiz(quizName: string) {
    if (this.mode!=this.modes[3]) {
      this.quizService.get(quizName).subscribe(res => {
        this.quiz = new Quiz(res);
        this.pager.count = this.quiz.questions.length;
        this.startTime = new Date();
        this.ellapsedTime = '0:00:00';
        this.timer = setInterval(() => { this.tick(); }, 1000);
        this.quizTime = this.parseTime(this.config.quizTime);
        this.setConfig(this.quiz.config);
        if (this.config.shuffleQuestions) {
          this.quiz.questions = HelperService.shuffle(this.quiz.questions);
        }
        if (this.config.shuffleAnswers) {
          this.quiz.questions.forEach(question => question.answers = HelperService.shuffle(question.answers))
        }
      });
      this.goTo(0);
      this.mode = this.modes[0];
    }
  }

  tick() {
    if (this.mode!=this.modes[3] && this.mode!=this.modes[4]) {
      const now = new Date();
      const diff = (now.getTime() - this.startTime.getTime()) / 1000;
      if (diff >= this.config.quizTime && this.config.quizTime > 0) {
        this.onSubmit();
      }
      this.ellapsedTime = this.parseTime(diff);
    }
  }

  parseTime(totalSeconds: number) {
    let hours: string | number = Math.floor(totalSeconds / 3600);
    let mins: string | number = Math.floor(totalSeconds % 3600 / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    hours = (hours < 10 ? '0' : '') + hours;
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${hours}:${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, answer: Answer) {
    // If question has only one answer to be selected by subject (cannot select more than one, all other selections will be set to false).
    if (question.questionTypeNum === 1) {
      question.answers.forEach((q) => { 
        if (q.answerNum !== answer.answerNum) 
          q.selected = false; 
        // Determine if an answer has been selected at all.
        else if (q.selected == false)
          question.answered = false;
        else
          question.answered = true;
      });
    }

    else {
      question.answered = true;
    }

    if (this.config.autoNext) {
      this.goTo(this.pager.index + 1);
    }
  }

  setConfig(config: QuizConfig) {
    this.config.allowGoBack = this.defaultConfig.allowGoBack;
    this.config.allowReview = this.defaultConfig.allowReview;
    this.config.autoNext = this.defaultConfig.autoNext;
    this.config.displayClock = this.defaultConfig.displayClock;
    this.config.quizTime = this.defaultConfig.quizTime;
    this.config.requireAllAnswered = this.defaultConfig.requireAllAnswered;
    this.config.shuffleAnswers = this.defaultConfig.shuffleAnswers;
    this.config.shuffleQuestions = this.defaultConfig.shuffleQuestions;

    if (config !== undefined && config !== null) {
      if(config.allowGoBack !== undefined && config.allowGoBack !== null) {
        this.config.allowGoBack = config.allowGoBack;
        console.log("allowGoBack has been set to " + this.config.allowGoBack)
      }
      if(config.allowReview !== undefined && config.allowReview !== null) {
        this.config.allowReview = config.allowReview;
        console.log("allowReview has been set to " + this.config.allowReview)
      }
      if(config.autoNext !== undefined && config.autoNext !== null) {
        this.config.autoNext = config.autoNext;
        console.log("autoNext has been set to " + this.config.autoNext)
      }
      if(config.quizTime !== undefined && config.quizTime !== null) {
        this.config.quizTime = config.quizTime;
        console.log("quizTime has been set to " + this.config.quizTime)
      }
      if(config.requireAllAnswered !== undefined && config.requireAllAnswered !== null) {
        this.config.requireAllAnswered = config.requireAllAnswered;
        console.log("requireAllAnswered has been set to " + this.config.requireAllAnswered)
      }
      if(config.shuffleQuestions !== undefined && config.shuffleQuestions !== null) {
        this.config.shuffleQuestions = config.shuffleQuestions;
        console.log("shuffleQuestions has been set to " + this.config.shuffleQuestions)
      }
      if(config.shuffleAnswers !== undefined && config.shuffleAnswers !== null) {
        this.config.shuffleAnswers = config.shuffleAnswers;
        console.log("shuffleAnswers has been set to " + this.config.shuffleAnswers)
      }
      if(config.displayClock !== undefined && config.displayClock !== null) {
        this.config.displayClock = config.displayClock;
        console.log("displayClock has been set to " + this.config.displayClock)
      }
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = this.modes[0];
    }
  }

  isAnswered(question: Question) {
    return question.answers.find(q => q.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.answers.every(q => q.selected === q.isCorrect) ? 'correct' : 'wrong';
  };

  onSubmit() {
    if (this.mode!=this.modes[3] && this.mode!=this.modes[4]) {
      let answers = [];
      this.quiz.questions.forEach(q => answers.push({ 'quizId': this.quiz.id, 'questionId': q.questionNum, 'answered': q.answered }));

      this.mode = this.modes[1];
    }
  }

  allQuestionsAnswered() {
    let allAnswered = true;
    if (this.quiz.questions === undefined || this.quiz.questions === null)
      return false;
    this.quiz.questions.forEach(q => allAnswered = allAnswered && q.answered)
    return allAnswered;
  }

  logout() {
    this.mode = this.modes[3];
    (<HTMLInputElement>document.getElementById("quizSelect")).value = 'select';
  }

  tryLogin() {
    console.log('login attempted')
    var username = (<HTMLInputElement>document.getElementById("username")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    console.log(username)
    console.log(password)
    this.loginFailed = false;
    if (username == 'tataemp' && password == 'pass@123') {
      this.loadQuiz(this.quizName);
      this.mode = this.modes[4]
    } else
    (<HTMLInputElement>document.getElementById("username")).value = "";
    (<HTMLInputElement>document.getElementById("password")).value = "";
      this.loginFailed = true;
  }
}
