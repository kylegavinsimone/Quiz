var questions = [
  {
    question: "1. Why did I create this quiz?",
    choices: [
      "I always wanted to be a professional quiz maker",
      "I have a lot of free time on my hands",
      "So I could learn coding and make fat stacks",
    ],
    correctAnswer: 2,
  },
  {
    question: "2. What is the point of this quiz?",
    choices: [
      "There is no point",
      "To learn how to cook",
      "To flex my mad programming skills",
    ],
    correctAnswer: 2,
  },
  {
    question: "3. How is your day going so far?",
    choices: ["Just kidding, I don't care", "Great", "Aweful"],
    correctAnswer: 0,
  },
  {
    question: "4. What number comes after four?",
    choices: ["three", "seven", "five"],
    correctAnswer: 2,
  },
];

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var theTime = 180;
var t;
$(document).ready(function () {
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();
  $(this).find(".preButton").attr("disabled", "disabled");

  timedCount();

  $(this)
    .find(".preButton")
    .on("click", function () {
      if (!quizOver) {
        if (currentQuestion == 0) {
          return false;
        }

        if (currentQuestion == 1) {
          $(".preButton").attr("disabled", "disabled");
        }

        currentQuestion--;
        if (currentQuestion < questions.length) {
          displayCurrentQuestion();
        }
      } else {
        if (viewingAns == 3) {
          return false;
        }
        currentQuestion = 0;
        viewingAns = 3;
        viewResults();
      }
    });

  $(this)
    .find(".nextButton")
    .on("click", function () {
      if (!quizOver) {
        var val = $("input[type='radio']:checked").val();

        if (val == undefined) {
          $(document).find(".quizMessage").text("Please select an answer");
          $(document).find(".quizMessage").show();
        } else {
          $(document).find(".quizMessage").hide();
          if (val == questions[currentQuestion].correctAnswer) {
            correctAnswers++;
          }
          iSelectedAnswer[currentQuestion] = val;

          currentQuestion++;
          if (currentQuestion >= 1) {
            $(".preButton").prop("disabled", false);
          }
          if (currentQuestion < questions.length) {
            displayCurrentQuestion();
          } else {
            displayScore();
            $("#iTimeShow").html("Quiz Time Completed!");
            $("#timer").html(
              "You scored: " + correctAnswers + " out of: " + questions.length
            );
            theTime = 185;
            $(document).find(".preButton").text("View Answer");
            $(document).find(".nextButton").text("Play Again?");
            quizOver = true;
            return false;
          }
        }
      } else {
        quizOver = false;
        $("#iTimeShow").html("Time Remaining:");
        iSelectedAnswer = [];
        $(document).find(".nextButton").text("Next Question");
        $(document).find(".preButton").text("Previous Question");
        $(".preButton").attr("disabled", "disabled");
        resetQuiz();
        viewingAns = 1;
        displayCurrentQuestion();
        hideScore();
      }
    });
});

function timedCount() {
  if (theTime == 185) {
    return false;
  }

  var hours = parseInt(theTime / 3600) % 24;
  var minutes = parseInt(theTime / 60) % 60;
  var seconds = theTime % 60;
  var result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  $("#timer").html(result);

  if (theTime == 0) {
    displayScore();
    $("#iTimeShow").html("Quiz Time Completed!");
    $("#timer").html(
      "You scored: " + correctAnswers + " out of: " + questions.length
    );
    theTime = 185;
    $(document).find(".preButton").text("Review");
    $(document).find(".nextButton").text("Try Again?");
    quizOver = true;
    return false;
  }

  theTime = theTime - 1;
  t = setTimeout(function () {
    timedCount();
  }, 1000);
}

function displayCurrentQuestion() {
  if (theTime == 185) {
    theTime = 180;
    timedCount();
  }

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;

  $(questionClass).text(question);

  $(choiceList).find("li").remove();
  var choice;

  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      $(
        '<li><input type="radio" class="radio-inline" checked="checked"  value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    } else {
      $(
        '<li><input type="radio" class="radio-inline" value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    }
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document)
    .find(".quizContainer > .result")
    .text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}

function viewResults() {
  if (currentQuestion == 10) {
    currentQuestion = 0;
    return false;
  }
  if (viewingAns == 1) {
    return false;
  }

  hideScore();
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;

  $(questionClass).text(question);

  $(choiceList).find("li").remove();
  var choice;

  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      if (questions[currentQuestion].correctAnswer == i) {
        $(
          '<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      } else {
        $(
          '<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      }
    } else {
      if (questions[currentQuestion].correctAnswer == i) {
        $(
          '<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      } else {
        $(
          '<li><input type="radio" class="radio-inline" value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      }
    }
  }

  currentQuestion++;

  setTimeout(function () {
    viewResults();
  }, 3000);
}
