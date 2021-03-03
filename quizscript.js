function buildQuiz(){
   
    const output = [];
  
   
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        const answers = [];
  
        for(letter in currentQuestion.answers){
 
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    
    quizContainer.innerHTML = output.join('');

function showResults() {}


buildQuiz();


submitButton.addEventListener("click", showResults);

const myQuestions = [
  {
    question: "Why did I create this quiz?",
    answers: {
      a: "I always wanted to be a professional quiz maker",
      b: "I have a lot of free time on my hands",
      c: "So I could learn coding and make fat stacks",
    },
    correctAnswer: "c",
  },
  {
    question: "What is the point of this quiz?",
    answers: {
      a: "There is no point",
      b: "To learn how to cook",
      c: "To flex my mad programming skills",
    },
    correctAnswer: "c",
  },
  {
    question: "How is your day going so far?",
    answers: {
      a: "Just kidding, I don't care",
      b: "Great",
      c: "Aweful",
    },
    correctAnswer: "a",
  },
];
