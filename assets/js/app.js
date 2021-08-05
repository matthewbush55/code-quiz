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

//GLOBAL VARIABLE DECLARATIONS
var secondsLeft = 60;
var questionCount = questionsObjects.length;
var index = 0;
var score = 0;

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

//function to start the quiz, timer, remove the "start" button, display the first question (using the nextQuestion function), and check the first answer
function startQuiz() {
  //call startTimer function
  startTimer();
  //remove start button
  startBtn.remove();
  //call nextQuestion function when an answer is selected
  nextQuestion();
  //call checkAnswer function
  checkAnswer();
}

//function to display the next question and choices in a ul element
function nextQuestion() {
  var questionIndex = questionsObjects[index];
  currentQuestion.text(questionIndex.question);
  for (i = 0; i < questionIndex.choices.length; i++) {
    console.log(questionIndex, questionsObjects[i].choices, questionIndex.choices);
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", questionIndex.choices);
  }
}

//function to check if answer matches the correct answer in the object. If yes, increase the score. If no, decrease the timer
function checkAnswer(event) {
  event.preventDefault();
  var selection = $(event.target).text();
  if (selection === questionsObjects[index].answer) {
    score = score + 100;
    nextQuestion();
  } else {
    secondsLeft = secondsLeft - 5000;
    nextQuestion();
  }
}

//function to display the score and "enter intitials" content when all questions are answered or the timer reaches 0
function displayScore() {}

//event listener when the start button is clicked
startBtn.on("click", startQuiz);

//event listener for when the user selects an answer

//event listener when the submit score button is clicked
submitBtn.on("click", displayScore);
