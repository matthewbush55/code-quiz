//OBJECT ARRAY FOR QUESTIONS, CHOICES, & ANSWERS
var questionsObjects = [
  {
    question: "What color is the sun?",
    choices: ["A: Green", "B: Black", "C: Blue", "D: Yellow"],
    answer: 3,
  },
  {
    question: "What sneaker brand has a swoosh?",
    choices: ["A: Reebok", "B: Addidas", "C: Under Armor", "D: Nike"],
    answer: 3,
  },
  {
    question: "What utencil has ink?",
    choices: ["A: Pencil", "B: Paper", "C: Fork", "D: Pen"],
    answer: 3,
  },
];

//JQUERY VARIABLE DECLARATIONS
var timeEl = $("#timer");
var startBtn = $("#start-btn");
var displayQuestion = $("#questions");

//GLOBAL VARIABLE DECLARATIONS
var secondsLeft = 60;
var questionCount = questionsObjects.length;
var questionNumber = 0;

//COUNTDOWN TIMER
function startTimer() {
  // set timer interval
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.text(secondsLeft).prepend("Time: ");

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      // call function to enter initials for final score
    }
  }, 1000);
}

function startQuiz(event) {
  //call startTimer function
  startTimer();
  //remove start button
  startBtn.remove();
  //call nextQuestion function when an answer is selected
  nextQuestion();
  //call checkAnswer function
  checkAnswer();
}

//function to display the next question and choices
function nextQuestion() {
  var currentQuestion = questionsObjects[questionNumber];
  displayQuestion.text(currentQuestion.question);
  for (var i = 0; i < currentQuestion.choices.length; i++) {}
}

//function to check if answer matches the correct answer in the object. If yes, increase the score. If no, decrease the timer
function checkAnswer() {}

//event listener when the start button is clicked
startBtn.on("click", startQuiz);

//event listener for when the user selects an answer

//event listener when the submit score button is clicked
