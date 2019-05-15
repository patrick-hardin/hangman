const Hangman = {
  settings: {
    lives: 9
  },
  record: {
    wins: 0,
    losses: 0
  },
  alphabet: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ],
  words: [
    "abrupt", "absurd", "abyss", "affix", "askew",
    "avenue", "awkward", "axiom", "banjo", "bayou",
    "bikini", "blizzard", "buffalo", "buzzard", "croquet",
    "crypt", "cycle", "disavow", "embezzle", "equip",
    "espionage", "fix", "fjord", "fuchsia", "funny",
    "galaxy", "gazebo", "glyph", "gnostic", "gossip",
    "groggy", "haiku", "haphazard", "hyphen", "injury",
    "ivory", "ivy", "jazz", "jockey", "jog",
    "joke", "jovial", "joy", "juicy", "jukebox",
    "kayak", "kazoo", "key", "khaki", "kiosk",
    "kiwi", "larynx", "length", "lucky", "luxury",
    "matrix", "microwave", "mystery", "onyx", "oxygen",
    "pixel", "pneumonia", "polka", "psychiatrist", "puzzle",
    "quartz", "queue", "quixotic", "quiz", "quorum",
    "rhubarb", "rhythm", "schnapps", "scratch", "squawk",
    "staff", "swivel", "syndrome", "thumb", "topaz",
    "transcript", "transgress", "transplant", "twelfth", "unknown",
    "unzip", "vodka", "vortex", "waltz", "wax",
    "whiskey", "whom", "wizard", "xylophone", "yacht",
    "youth", "zephyr", "zipper", "zodiac", "zombie"
  ],
  init: function () {
    this.game = {
      answer: this.rng(),
      letters: [],
      history: [],
      attempt: 0,
      correct: 0,
      lives: this.settings.lives,
      victory: null
    }

    for (var i = 0; i < this.game.answer.length; i++) {
      this.game.letters[i] = "_";
    }

    return this.game;
  },
  rng: function () {
    let i = Math.floor(Math.random() * this.words.length);
    return this.words[i];
  },
  validate: function (key) {
    let input = {};
    input.value = key.toLowerCase();

    if (!this.alphabet.includes(input.value)) {
      input.valid = false;
      input.error = ["Invalid Character: " + input.value.toUpperCase()];
    } else if (this.game.history && this.game.history.includes(input.value)) {
      input.valid = false;
      input.error = ["Already Guessed: " + input.value.toUpperCase()];
    } else {
      input.valid = true;
    }

    return input;
  },
  play: function (char) {
    var found = 0;

    this.game.history[this.game.attempt] = char;
    this.game.attempt++;

    let correct = this.game.answer.includes(char);
    if (correct) {
      for (var i = 0; i < this.game.answer.length; i++) {
        if (this.game.answer[i] === char) {
          this.game.letters[i] = char;
          this.game.correct++;
          found++;
        }
      }
    } else {
      this.game.lives--;
    }

    if (this.game.correct == this.game.answer.length) {
      this.game.victory = true;
      this.record.wins++;
    }

    if (this.game.lives == 0) {
      this.game.victory = false;
      this.record.losses++;
    }

    return found;
  }
}