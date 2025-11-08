
      const WORDS = [
        { word: "cat", hint: "A furry pet that says meow" },
        { word: "dog", hint: "A friendly pet that barks" },
        { word: "sun", hint: "Bright and yellow in the sky" },
        { word: "moon", hint: "You see it at night in the sky" },
        { word: "fish", hint: "Swims in water" },
        { word: "bird", hint: "Has wings and can fly" },
        { word: "tree", hint: "Tall plant with leaves" },
        { word: "book", hint: "You read this for stories" },
        { word: "ball", hint: "Round toy you can throw" },
        { word: "apple", hint: "Red or green fruit, healthy snack" },
        { word: "star", hint: "Twinkles in the night sky" },
        { word: "rain", hint: "Water falling from clouds" },
        { word: "happy", hint: "When you feel joy and smile" },
        { word: "juice", hint: "Yummy drink from fruits" },
        { word: "pizza", hint: "Delicious food with cheese" },
        { word: "school", hint: "Place where you learn" },
        { word: "pencil", hint: "You write with this" },
        { word: "cookie", hint: "Sweet treat you can eat" },
        { word: "flower", hint: "Pretty plant with colors" },
        { word: "rainbow", hint: "Colorful arc in the sky after rain" },
      ];

      let selectedWord, hint, guessedWords, remainingAttempts, gameActive;
      let loggedIn = false;

      const loginBtn = document.getElementById("loginBtn");
      const logoutBtn = document.getElementById("logoutBtn");

      loginBtn.addEventListener("click", () => {
        const username = prompt("👋 What's your name, young detective?");

        if (username && username.trim() !== "") {
          loggedIn = true;
          alert(`🎉 Welcome, Detective ${username}! 🎉`);

          alert(
            "📖 HOW TO PLAY WORD DETECTIVE KIDS 🕵️‍♂️\n\n" +
              "🎯 YOUR MISSION:\n" +
              "Find the secret word before you run out of tries!\n\n" +
              "📝 RULES (Super Easy!):\n" +
              "1️⃣ Pick how hard you want to play\n" +
              "2️⃣ We'll give you a helpful clue\n" +
              "3️⃣ You'll see dashes like this: -----\n" +
              "4️⃣ Type your guess for the word\n" +
              "5️⃣ Each wrong guess uses 1 try\n" +
              "6️⃣ Get it right and you WIN! 🏆\n\n" +
              "💡 TIP: Read the clue carefully!\n\n"
          );

          loginBtn.style.display = "none";
          logoutBtn.style.display = "block";
          initGame();
        } else {
          alert("Oops! Please enter your name to play!");
        }
      });

      function handleLogout() {
        if (confirm("Are you sure you want to leave?")) {
          loggedIn = false;
          alert("👋 Bye bye! Come back soon to play more!");
          loginBtn.style.display = "block";
          logoutBtn.style.display = "none";
        }
      }

      logoutBtn.addEventListener("click", handleLogout);

      function initGame() {
        if (!loggedIn) {
          alert("🔒 Please tell us your name first!");
          return;
        }

        let difficulty = prompt(
          "Pick how you want to play:\n\n" +
            "⭐ Type 'super' for Super Easy (12 tries)\n" +
            "😊 Type 'easy' for Easy (8 tries)\n" +
            "🤔 Type 'medium' for Medium (5 tries)\n\n" +
            "What do you choose?"
        );

        if (!difficulty) {
          alert("No problem! Come back when you're ready!");
          return;
        }

        difficulty = difficulty.trim().toLowerCase();
        if (difficulty === "super" || difficulty === "super easy") {
          remainingAttempts = 12;
          difficulty = "super easy";
        } else if (difficulty === "easy") {
          remainingAttempts = 8;
        } else if (difficulty === "medium") {
          remainingAttempts = 5;
        } else {
          alert("Let's play on Easy mode - you get 8 tries!");
          remainingAttempts = 8;
          difficulty = "easy";
        }
        alert(
          `Great choice! You picked ${difficulty.toUpperCase()}. You have ${remainingAttempts} tries! 🎮`
        );

        const randomIndex = Math.floor(Math.random() * WORDS.length);
        selectedWord = WORDS[randomIndex].word;
        hint = WORDS[randomIndex].hint;
        guessedWords = [];
        gameActive = true;

        const wordDashes = "-".repeat(selectedWord.length);

        alert(
          `🕵️‍♂️ DETECTIVE MISSION START! 🕵️‍♂️\n\n` +
            `Level: ${difficulty.toUpperCase()}\n` +
            `Number of Tries: ${remainingAttempts}\n` +
            `Mystery Word: ${wordDashes}\n\n` +
            `🔍 Your Clue: ${hint}\n\n` +
            `Good luck, detective!`
        );

        playLoop();
      }

      function getWordDashes() {
        return "-".repeat(selectedWord.length);
      }

      function isValidWord(input) {
        return (
          input && input.trim().length > 0 && /^[a-z]+$/i.test(input.trim())
        );
      }

      function playLoop() {
        while (gameActive && remainingAttempts > 0) {
          const wordDashes = getWordDashes();
          const guessedDisplay = guessedWords.length
            ? guessedWords.join(", ")
            : "None yet";

          const gameInfo =
            `🕵️‍♂️ Mystery Word: ${wordDashes}\n` +
            `📝 Your Guesses: ${guessedDisplay}\n` +
            `💖 Tries Left: ${remainingAttempts}\n\n` +
            `🔍 Clue: ${hint}\n\n` +
            `What's your guess?`;

          let userGuess = prompt(gameInfo);

          if (userGuess === null) {
            const confirmQuit = confirm("Do you want to stop playing? 😢");
            if (confirmQuit) {
              alert("👋 Okay! Thanks for playing, detective!");
              gameActive = false;
              break;
            } else {
              alert("😊 Yay! Let's keep playing!");
              continue;
            }
          }

          if (!isValidWord(userGuess)) {
            alert("⚠️ Oops! Please type only letters (like 'cat' or 'dog').");
            continue;
          }

          userGuess = userGuess.trim().toLowerCase();

          if (guessedWords.includes(userGuess)) {
            remainingAttempts--;
            alert(
              `🔁 You already guessed "${userGuess}"!\n` +
                `That uses up 1 try. 😅\n` +
                `Tries left: ${remainingAttempts}`
            );
            if (remainingAttempts <= 0) {
              alert(
                `😢 Out of tries!\n\n` +
                  `The word was: "${selectedWord}"\n\n` +
                  `Don't worry, you can try again!`
              );
              gameActive = false;
            }
            continue;
          }

          guessedWords.push(userGuess);

          if (userGuess === selectedWord) {
            alert(
              `🎉🎊 YOU DID IT! 🎊🎉\n\n` +
                `✨ The word was: ${selectedWord}\n` +
                `🏆 You had ${remainingAttempts} tries left!\n` +
                `👏 You're an AMAZING detective!\n\n` +
                `Total guesses: ${guessedWords.length}`
            );
            gameActive = false;
          } else {
            remainingAttempts--;

            const encouragements = [
              "You can do it! 💪",
              "Keep trying! 🌟",
              "Think about the clue! 🔍",
              "You're getting closer! 😊",
              "Don't give up! 🎯",
              "Try another word! 💡",
              "You're doing great! ⭐",
            ];
            const randomMsg =
              encouragements[Math.floor(Math.random() * encouragements.length)];

            alert(
              `❌ Nope! "${userGuess}" isn't the word.\n\n` +
                `🕵️‍♂️ Mystery Word: ${wordDashes}\n` +
                `🔍 Clue: ${hint}\n` +
                `🌈 ${randomMsg}\n` +
                `💖 Tries left: ${remainingAttempts}`
            );

            if (remainingAttempts === 0) {
              alert(
                `😢 Game Over!\n\n` +
                  `The word was: "${selectedWord}"\n\n` +
                  `That's okay! Want to try again?`
              );
              gameActive = false;
            }
          }
        }

        // End of game
        if (!gameActive) {
          const playAgain = confirm("🎮 Want to solve another mystery word?");
          if (playAgain) initGame();
          else alert("Thanks for being an awesome detective! 👋 See you soon!");
        }
      }