var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var basicLibrary = require('./basLibrary');
var clozeLibrary = require('./clozLibrary');
var inquirer = require("inquirer");
var colors = require("colors");
var fs = require("fs");

var count = 0;

function start() {
  console.log("------------------------------------------------------".cyan);
  console.log("----------  ".cyan + "------------------------".red + "  --------------".cyan);
  console.log("----------  Flash Card Generator Go!  ----------------".cyan);
  console.log("----------  ".cyan + "------------------------".red + "  --------------".cyan);
  console.log("------------------------------------------------------".cyan);

  inquirer.prompt([{
      name: 'startMenu',
      message: 'Welcome, what would you like to do?',
      type: 'list',
      choices: ['Create a New Card', new inquirer.Separator(), 'Basic Card Random',  new inquirer.Separator(), 'Cloze Card Random'],
      filter: function(str) {
        return str.toLowerCase();
      }
    }

  ]).then(function(answer) {
    console.log("-------------------------------------------------------".cyan);
    console.log("--------------  Let's get started!  -------------------".cyan);
    console.log("-------------------------------------------------------".cyan);
    switch (answer.startMenu) {

      case 'create a new card':
        createCard();
        break;
      case 'basic card random':
        basicDraw();
        break;
      case 'cloze card random':
        clozeDraw();
        break;
      default:
        console.log("Not a valid option");
        break;

    } ///----end switch
  }); //------end "then"------------
} //-------------end start function---------

start();

function createCard() {
  inquirer.prompt([{
      type: "list",
      message: "What type of flashcard do you want to create?",
      choices: ["Basic Card", "Cloze Card"],
      name: "cardType"
    }

  ]).then(function(userCreate) {

    var cardType = userCreate.cardType;
    console.log("User chose to create a " + cardType);

    if (cardType === "Basic Card") {
      console.log("-------------------------------------------------------".yellow);
      console.log("------------+++ Basic Card Construction +++------------".yellow);
      console.log("-------------------------------------------------------".yellow);
      inquirer.prompt([{
          name: "newFront",
          type: "input",
          message: "Please enter what you would like on the front of your card.",
        },
        {
          name: "newBack",
          type: "input",
          message: "what would you like on the back of the new card?",
        }

      ]).then(function(cardData) {
        console.log(cardData.newFront + " : " + cardData.newBack);

        var userCard = new BasicCard(cardData.newFront, cardData.newBack);
        basicLibrary.push(userCard);
        fs.writeFile("basLibrary.json", JSON.stringify(basicLibrary, null, 2));
        console.log("Card stored in basLibray.json".blue);

        inquirer.prompt([{
          name: "again",
          message: "would you like to make another card?",
          type: "confirm",
        }]).then(function(res) {
          console.log(res);
          if (res.again) {
            console.log("true");
            createCard();
          } else {
            console.log("false");
            start();
          }
        });

      });

    } else { ///---------------cloze car creator---------------//
      console.log("-------------------------------------------------------".yellow);
      console.log("------------+++ Cloze Card Construction +++------------".yellow);
      console.log("-------------------------------------------------------".yellow);
      inquirer.prompt([{
          name: "newFull",
          type: "input",
          message: "Please enter the full text of the card.",
        },
        {
          name: "newCloze",
          type: "input",
          message: "what part would you like to be 'cloze-deleted' and replaced with '...'?",
        }

      ]).then(function(cardData){

        console.log(cardData.newFull);
        console.log(cardData.newCloze);

        var userCard = new ClozeCard(cardData.newFull, cardData.newCloze);
        clozeLibrary.push(userCard);
        fs.writeFile("clozLibrary.json", JSON.stringify(clozeLibrary, null, 2));
        console.log("Card stored in clozLibray.json");
      });
    }


  }); //-----end card creation selection

} ///----end create

function basicDraw() {

  var randomBas = Math.floor(Math.random() * (basicLibrary.length - 1));
  var currentCard = basicLibrary[randomBas];

  inquirer.prompt([

    {
      name: "test",
      message: currentCard.front,
      type: "input",
      validate: function validateInput(ans) {
        return ans !== '';
      }
    }
  ]).then(function(ans) {

    if (ans.test === currentCard.back || ans.test === currentCard.back.toLowerCase()) {
      console.log("That is correct".yellow);
      count++;
    } else {
      count++;
      console.log("Incorrect the answer was ".magenta + currentCard.back.magenta + ".".magenta);
    }
  });

}

function clozeDraw() {

  var randomCloz = Math.floor(Math.random() * (clozeLibrary.length - 1));
  var currentCard = clozeLibrary[randomCloz];

  inquirer.prompt([

    {
      name: "test",
      message: currentCard.partial,
      type: "input",
      validate: function validateInput(ans) {
        return ans !== '';
      }
    }
  ]).then(function(ans) {

    if (ans.test === currentCard.cloze || ans.test === currentCard.cloze.toLowerCase()) {
      console.log("That is correct".yellow);
      count++;
    } else {
      count++;
      console.log("Incorrect, the answer was ".magenta + currentCard.cloze.magenta + ".".magenta);
    }
  });

}
