const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What does NBA stand for?",
    answers: [
      { text: "National Basketball Association", correct: true },
      { text: "National Badminton Association", correct: false },
      { text: "National Beachball Association", correct: false },
      { text: "National Boxing Association", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText Machine Language", correct: false },
      { text: "HighText Markup Language", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "bgColor", correct: false },
      { text: "background-color", correct: true },
      { text: "background", correct: false },
    ],
  },
  {
    question: "What color are the goalposts in football?",
    answers: [
      { text: "Orange", correct: false },
      { text: "Green", correct: false },
      { text: "Yellow", correct: true },
      { text: "Black", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "Who is the highest run-scorer in IPL history?",
    answers: [
      { text: "Rohit Sharma", correct: false },
      { text: "M.S Dhoni", correct: false },
      { text: "Virat Kohli", correct: true },
      { text: "Suresh Raina", correct: false },
    ],
  },
  {
    question: "Which data structure is based on the First In Last Out (FILO) principle?",
    answers: [
      { text: "Linkedlist", correct: false },
      { text: "Queue", correct: false },
      { text: "Stack", correct: true },
      { text: "Array", correct: false },
    ],
  },
  {
    question: " Which of the following is the correct extension of the Python file?",
    answers: [
      { text: ".py", correct: true },
      { text: ".p", correct: false },
      { text: ".python", correct: false },
      { text: ".pl", correct: false },
    ],
  },
  {
    question: "What is the size of float and double in java?",
    answers: [
      { text: "64 and 64", correct: false },
      { text: "32 and 32", correct: false },
      { text: "32 and 64 ", correct: true },
      { text: "64 and 32", correct: false },
    ],
  },
  {
    question: "A person who uses his expertise to gain access of others computer illegally is known as?",
    answers: [
      { text: "Hobbyist", correct: false },
      { text: "Spammer", correct: false },
      { text: "Hacker ", correct: true },
      { text: "Programer", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
