// console.log(quiz);
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer=document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;
function setAvailableQuestion() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++){
        availableQuestion.push(quiz[i]);
    }
}
function getNewQuestion() {
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get position of questionIndex from available Array;
    const index1 = availableQuestion.indexOf(questionIndex);
    
    // remove element that is render now so that is not repeat again;
    availableQuestion.splice(index1, 1);
    // set options
    // get options length
    let optionLen = currentQuestion.options.length;
    // push options in availableOption Array;
    for (let i = 0; i < optionLen; i++)
    {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = "";
    let animationDelay = 0.2;
    //create options in html
    for (let i = 0; i < optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.className = "option";
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.2;
        option.setAttribute("onclick","getResult(this)")
        optionContainer.appendChild(option);
    }

    questionCounter++;
}
function getResult(element) {
    const id = parseInt(element.id);
    if (id === currentQuestion.answer) {
        //set green color to correct answer
        element.classList.add("correct")
        updateAnswerIndicator("correct");
        correctAnswer++;
    } else {
        //set green color to correct answer
        element.classList.add("wrong")
        updateAnswerIndicator("wrong");
        let optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++){
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct")
                
            }
       }
    }
    attempt++;
    unClickableOptions()
}
function answersIndicator() {
    answersIndicatorContainer.innerHTML=""
    let totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}
// make other option unclickable options
function unClickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
    
}
function nextQuestion() {
    if (questionCounter === quiz.length) {
        // console.log("get result")
        quizOver();
    }
    else {
        getNewQuestion();
    }
}
function quizOver() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}
function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer
    const percentage=(correctAnswer/quiz.length)*100
    resultBox.querySelector(".total-percentage").innerHTML=percentage.toFixed()+"%"
    resultBox.querySelector(".total-score").innerHTML=correctAnswer+" / "+quiz.length
}
function resetQuiz() {
    questionCounter = 0;
    correctAnswer = 0;
    attempt = 0;
}
function tryAgainQuiz() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function goToHome() {
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    console.log(homeBox)
    console.log(resultBox)
    
    resetQuiz();
    
}


function startQuiz() {
    //hide home box
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    // get all the question and store in array
    setAvailableQuestion();
    // get new question
    getNewQuestion()
    // set answer indicator
    answersIndicator();
} 
window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML=quiz.length
}
