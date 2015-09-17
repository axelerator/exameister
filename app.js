var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
//
// Annotation section
var MyAppComponent = (function () {
    function MyAppComponent() {
        this.name = 'Alice';
        this.examDef = new ExamDef();
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: "\n    <h1>Hello {{ name }} {{ examDef.exercises.length  }}</h1>\n    <ul>\n       <li *ng-for=\"#exercise of examDef.exercises\">\n          E:{{ exercise.id }}\n          <ul>\n             <li *ng-for=\"#question of exercise.questions\">\n                Q: {{ question.description}} (#{{ question.id }}) [{{question.weight}}]\n                <ul>\n\n                   <li *ng-for=\"#task of question.tasks\">\n                   {{task.description}} ({{ task.maxPoints }}P): #{{ task.id }}\n                   </li>\n                </ul>\n\n             </li>\n          </ul>\n\n       </li>\n    </ul>\n    ",
            directives: [angular2_1.NgFor]
        })
    ], MyAppComponent);
    return MyAppComponent;
})();
var ExamDef = (function () {
    function ExamDef() {
        var def_json = '{"e1":{"weight":2,"q1":{"description":"EmptyStr impl","t1":{"description":"singleton?","max":1},"t2":{"description":"funktioniert","max":1}}},"e6":{"q1":{"weight":3,"description":"static","t1":{"description":"checkbox","max":1},"t2":{"description":"erklärung","max":2}},"q2":{"description":"unterklassen private sinnvoll?","t1":{"description":"checkbox","max":1},"t2":{"description":"erklarung","max":2}}}}';
        var x;
        x = JSON.parse(def_json);
        this.exercises = [];
        for (var id in x) {
            this.exercises.push(new Exercise(this, id, x[id]));
        }
    }
    ExamDef.prototype.tasks = function () {
        return [];
    };
    return ExamDef;
})();
var Exercise = (function () {
    function Exercise(examDef, id, questions) {
        this.id = id;
        this.examDef = examDef;
        this.questions = [];
        for (var questionId in questions) {
            var tasks = questions[questionId];
            if (questionId == 'description') {
                this.description = questions[questionId];
            }
            else if (questionId == 'weight') {
                this.weight = questions[questionId];
            }
            else {
                this.questions.push(new Question(this, questionId, tasks));
            }
        }
    }
    return Exercise;
})();
var Question = (function () {
    function Question(exercise, id, tasks) {
        this.id = id;
        this.exercise = exercise;
        this.tasks = [];
        for (var taskId in tasks) {
            var task = tasks[taskId];
            if (taskId == 'description') {
                this.description = tasks[taskId];
            }
            else if (taskId == 'weight') {
                this.weight = tasks[taskId];
            }
            else {
                this.tasks.push(new Task(this, taskId, task.max, task.description));
            }
        }
    }
    return Question;
})();
var Task = (function () {
    function Task(question, id, maxPoints, description) {
        this.question = question;
        this.id = id;
        this.maxPoints = maxPoints;
        this.description = description;
    }
    return Task;
})();
var TaskResult = (function () {
    function TaskResult() {
    }
    return TaskResult;
})();
var ExamResult = (function () {
    function ExamResult(examDef) {
        this.examDef = examDef;
        for (var task in examDef.tasks) {
        }
    }
    return ExamResult;
})();
angular2_1.bootstrap(MyAppComponent);
