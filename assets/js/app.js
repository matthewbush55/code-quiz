//OBJECT ARRAY FOR QUESTIONS, CHOICES, & ANSWERS
var questionsObjects = [
  {
    questionNumber: 1,
    question: "What color is the sun?",
    choices: ["A: Green", "B: Black", "C: Blue", "D: Yellow"],
    answer: "D: Yellow",
  },
  {
    questionNumber: 2,
    question: "What sneaker brand has a swoosh?",
    choices: ["A: Reebok", "B: Addidas", "C: Under Armor", "D: Nike"],
    answer: "D: Nike",
  },
  {
    questionNumber: 3,
    question: "What utencil has ink?",
    choices: ["A: Pencil", "B: Paper", "C: Fork", "D: Pen"],
    answer: "D: Pen",
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
var playAgain = $("#play-again");

//GLOBAL VARIABLE DECLARATIONS
var secondsLeft = 60;
var questionCount = questionsObjects.length;
var index = 0;
var score = 0;

submitHighscore.hide();
highscoreWrapper.hide();

//COUNTDOWN TIMER
function startTimer() {
  // set timer interval
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.text(secondsLeft).prepend("Time: ");

    if (secondsLeft <= 0 || index === questionCount) {
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
    answerBtn.text(questionIndex.choices[i]);
    answerLi.append(answerBtn);
    currentChoices.append(answerLi);
  }
}

// function to check if answer matches the correct answer in the object. If yes, increase the score. If no, decrease the timer
function checkAnswer(event) {
  event.preventDefault();
  var selection = $(event.target).text();
  console.log(selection);
  console.log(questionsObjects[index].answer);
  if (selection === questionsObjects[index].answer) {
    score = score + 100;
    index++;
    nextQuestion();
  } else {
    secondsLeft = secondsLeft - 30;
    index++;
    nextQuestion();
  }
}

//function to display the score and "enter intitials" content when all questions are answered or the timer reaches 0
function displayScore(event) {
  event.preventDefault();
  submitHighscore.hide();
  highscoreWrapper.show();
  var highscore = JSON.parse(localStorage.getItem("highscore")) || [];
  var userInitialsInput = playerEntry.val();
  var userObject = {};
  userObject.initials = userInitialsInput;
  userObject.score = score;
  highscore.push(userObject);
  localStorage.setItem("highscore", JSON.stringify(highscore));
}

//event listener when the start button is clicked
startBtn.on("click", startQuiz);
//event listener for when the user selects an answer
questionWrapper.on("click", ".listItemQuestion", checkAnswer);
//event listener when the submit score button is clicked
submitBtn.on("click", displayScore);
//event listener when play again button is clicked
playAgain.on("click", startQuiz);
