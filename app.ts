/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2'; 
//
// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  template: `
    <h1>Hello {{ name }} {{ examDef.exercises.length  }}</h1>
    <ul>
       <li *ng-for="#exercise of examDef.exercises">
          E:{{ exercise.id }}
          <ul>
             <li *ng-for="#question of exercise.questions">
                Q: {{ question.description}} (#{{ question.id }}) [{{question.weight}}]
                <ul>

                   <li *ng-for="#task of question.tasks">
                   {{task.description}} ({{ task.maxPoints }}P): #{{ task.id }}
                   </li>
                </ul>

             </li>
          </ul>

       </li>
    </ul>
    `,
  directives: [NgFor]
})
// Component controller
class MyAppComponent {
  name: string;
  examDef: ExamDef;
  
  constructor() {
    this.name = 'Alice';
    this.examDef = new ExamDef();
  }
}
class ExamDef {
  exercises: Array<Exercise>;

  constructor() {
    var def_json: string = '{"e1":{"weight":2,"q1":{"description":"EmptyStr impl","t1":{"description":"singleton?","max":1},"t2":{"description":"funktioniert","max":1}}},"e6":{"q1":{"weight":3,"description":"static","t1":{"description":"checkbox","max":1},"t2":{"description":"erklärung","max":2}},"q2":{"description":"unterklassen private sinnvoll?","t1":{"description":"checkbox","max":1},"t2":{"description":"erklarung","max":2}}}}';
    var x;
    x = JSON.parse(def_json);
    this.exercises = [];
    for (var id in x) {
      this.exercises.push(new Exercise(this, id, x[id] ));
    }
  }

  tasks() {
    return [];
  }
}

class Exercise {
  questions: Array<Question>;
  description: string;
  weight: number;
  examDef: ExamDef;
  id: string;

  constructor(examDef: ExamDef, id: string, questions) {
    this.id = id;
    this.examDef = examDef;
    this.questions = [];
    for (var questionId in questions) {
      var tasks = questions[questionId];
      if (questionId == 'description') {
        this.description = questions[questionId];
      } else if (questionId == 'weight') {
        this.weight = questions[questionId];
      } else {
        this.questions.push(new Question(this, questionId, tasks))
      }
    }
  }
}

class Question {
  tasks: Array<Task>;
  weight: number;
  description: string;
  exercise: Exercise;
  id: string;
  constructor(exercise: Exercise, id: string, tasks) {
    this.id = id;
    this.exercise = exercise;
    this.tasks = [];
    for (var taskId in tasks) {
      var task = tasks[taskId];
      if (taskId == 'description') {
        this.description = tasks[taskId];
      } else if (taskId == 'weight') {
        this.weight = tasks[taskId];
      } else {
        this.tasks.push(new Task(this, taskId, task.max, task.description));
      }
    }
  }
}

class Task {
  maxPoints: number;
  description: string;
  weight: number;
  question: Question;
  id: string;

  constructor(question: Question, id: string, maxPoints: number, description: string
) {
    this.question = question;
    this.id = id;
    this.maxPoints = maxPoints;
    this.description = description;
  }
}

class TaskResult {
  task: Task;
  points: number;
}

class ExamResult {
  taskResults: Array<TaskResult>;
  examDef: ExamDef;
  constructor(examDef: ExamDef) {
    this.examDef = examDef;
    for (var task in examDef.tasks) {
    }
  }
}




bootstrap(MyAppComponent);
