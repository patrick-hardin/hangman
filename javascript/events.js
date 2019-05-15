document.addEventListener("DOMContentLoaded", function () {
  let output = {};
  output.game = Hangman.init();
  output.record = Hangman.record;
  output.messages = [
    "This is a classic game of Hangman. You have " + Hangman.settings.lives + " tries to guess the word.",
    "Use your keyboard to play. Press any key to begin."
  ]
  updateDOM(output);
})

document.onkeyup = function (event) {
  if (Hangman.game.victory != null) {
    let output = {};
    output.game = Hangman.init();
    output.record = Hangman.record;
    output.messages = [];
    let label = document.getElementById("history-label");
    let history = document.getElementById("history-letters")
    removeChildren(label);
    removeChildren(history);
    updateDOM(output);
    return;
  }

  var input = Hangman.validate(event.key);
  var output = {};
  output.value = input.value;

  if (input.valid) {
    output.found = Hangman.play(input.value);
    output.messages = [
      "You guessed " + input.value.toUpperCase(),
      output.found + " found"
    ]
  } else {
    output.messages = input.error;
  }

  output.game = Hangman.game;
  output.record = Hangman.record;

  if (output.game.victory != null) {
    if (output.game.victory) {
      output.messages = ["You win!"];
    } else {
      output.messages = ["You lose :("];
      output.game.letters = Hangman.game.answer;
      output.game.history = [];
    }
    output.messages.push("Press any key to play again");
  }

  updateDOM(output);
}

function updateDOM(output) {
  var letters = document.getElementById("letters");
  removeChildren(letters);

  for (let letter of output.game.letters) {
    let li = document.createElement('li');
    li.innerHTML = letter.toUpperCase();
    letters.appendChild(li);
  }

  var messages = document.getElementById("messages");
  removeChildren(messages);

  for (let message of output.messages) {
    let span = document.createElement('span');
    span.innerHTML = message;
    messages.appendChild(span);
  }

  var record = document.getElementById("record");
  removeChildren(record);

  let recordStrings = [
    "Wins: " + output.record.wins,
    "Losses: " + output.record.losses
  ];

  for (let string of recordStrings) {
    let li = document.createElement('li');
    li.innerHTML = string;
    record.appendChild(li);
  }

  var score = document.getElementById("score");
  removeChildren(score);

  let scoreStrings = [
    "Attempt: " + output.game.attempt,
    "Remaining: " + output.game.lives
  ]

  for (let string of scoreStrings) {
    let li = document.createElement('li');
    li.innerHTML = string;
    score.appendChild(li);
  }

  let label = document.getElementById("history-label");
  var history = document.getElementById("history-letters");
  if (output.game.history.length > 0) {
    label.innerHTML = "History";
    removeChildren(history);

    for (let letter of output.game.history) {
      let li = document.createElement('li');
      li.innerHTML = letter.toUpperCase();
      li.className = "history-item";
      history.appendChild(li);
    }
  } else if (output.game.victory != null) {
    label.innerHTML = "";
    removeChildren(history);
  }
}

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
