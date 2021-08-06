//OBJECT ARRAY FOR QUESTIONS, CHOICES, & ANSWERS
var questionsObjects = [
  {
    question: "What is the name of a fast, small, and feature-rich JavaScript library?",
    choices: ["A: Java", "B: Minify", "C: Coffee", "D: jQuery"],
    answer: "D: jQuery",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    choices: ["A: isNaN", "B: String", "C: Boolean", "D: Object"],
    answer: "A: isNaN",
  },
  {
    question: "What is the === operator called?",
    choices: ["A: Pipe", "B: Strict Equality", "C: Loose Equality", "D: Equal"],
    answer: "B: Strict Equality",
  },
  {
    question: "What characters are used to declare an array in JavaScript?",
    choices: ["A: ()", "B: []", "C: #_#", "D: //"],
    answer: "B: []",
  },
];

//JQUERY VARIABLE DECLARATIONS
var timeEl = $("#timer");
var startBtn = $("#start-btn");
var currentQuestion = $("#current-question");
var currentChoices = $("#current-choices");
var submitBtn = $("#submitBtn");
var questionWrapper = $(".question-wrapper");
var submitHighscore = $(".submit-highscore");
var playerEntry = $("#player");
var highscoreWrapper = $(".highscore-wrapper");
var highscoreList = $("#highscore-list");
var welcomeWrapper = $("#welcome-wrapper");

//GLOBAL VARIABLE DECLARATIONS
var secondsLeft = 60;
var questionCount = questionsObjects.length;
var index = 0;
var score = 0;

//global page load values for hiding elements that are not yet needed
submitHighscore.hide();
highscoreWrapper.hide();

//COUNTDOWN TIMER
function startTimer() {
  // set timer interval
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.text(secondsLeft).prepend("Time: ");

    if (secondsLeft <= 0 || index === questionCount) {
      timeEl.text(0);
      questionWrapper.hide();
      submitHighscore.show();
      clearInterval(timerInterval);
    }
  }, 1000);
}

//function to start the quiz, timer, remove the "start" button, display the first question (using the nextQuestion function), and check the first answer
function startQuiz() {
  submitHighscore.hide();
  highscoreWrapper.hide();
  welcomeWrapper.hide();
  //call startTimer function
  startTimer();
  //remove start button
  startBtn.remove();
  //call nextQuestion function when an answer is selected
  nextQuestion();
}

//function to display the next question and choices in an li element
function nextQuestion() {
  var questionIndex = questionsObjects[index];
  currentQuestion.text(questionIndex.question);
  currentChoices.empty();
  for (i = 0; i < questionIndex.choices.length; i++) {
    var answerLi = $(`<li>`);
    answerLi.addClass("listItemQuestion");
    var answerBtn = $(`<button>`);
    answerBtn.addClass("btn btn-info btn-lg");
    answerBtn.attr("style", "margin-top: 5px");
    answerBtn.attr("style", "margin-bottom: 5px");
    answerBtn.text(questionIndex.choices[i]);
    answerLi.append(answerBtn);
    currentChoices.append(answerLi);
  }
}

// function to check if answer matches the correct answer in the object. If yes, increase the score. If no, decrease the timer
function checkAnswer(event) {
  event.preventDefault();
  var selection = $(event.target).text();
  if (selection === questionsObjects[index].answer) {
    score = score + 100;
    index++;
    nextQuestion();
  } else {
    secondsLeft = secondsLeft - 15;
    index++;
    nextQuestion();
  }
}

//function to display the score and "enter intitials" content when all questions are answered or the timer reaches 0
function displayScore() {
  submitHighscore.hide();
  highscoreWrapper.show();
  var highscore = JSON.parse(localStorage.getItem("highscore")) || [];
  var userInitialsInput = playerEntry.val();
  var userObject = {};
  userObject.initials = userInitialsInput;
  userObject.score = score;
  highscore.push(userObject);
  localStorage.setItem("highscore", JSON.stringify(highscore));
  var highScoreLi = $(`<li>`);
  highScoreLi.text(userInitialsInput + " - " + score);
  highscoreList.append(highScoreLi);
}

//event listener when the start button is clicked
startBtn.on("click", startQuiz);
//event listener for when the user selects an answer
questionWrapper.on("click", ".listItemQuestion", checkAnswer);
//event listener when the submit score button is clicked
submitBtn.on("click", displayScore);
