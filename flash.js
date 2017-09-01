var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var basicLibrary = require('./basLibrary');
var inquirer = require("inquirer");
var fs = require("fs");

var count = 0;

function start() {

  inquirer.prompt([{
      name: 'startMenu',
      message: 'Welcome, what would you like to do?',
      type: 'list',
      choices: ['Create','Basic', 'Cloze'],
      filter: function(str) {
        return str.toLowerCase();
      }
    }

  ]).then(function(answer) {

    switch (answer.startMenu) {

      case 'create':
      createCard();
        console.log(answer.startMenu);
        break;
      case 'basic':
        //  console.log(answer.startMenu);
        basicDraw();
        //console.log(CardLibrary[0].front);
        break;
      case 'cloze':
        console.log(answer.startMenu);
        break;
      default:
        console.log("Not a valid option");
        break;

    } ///----end switch
  }); //------end "then"------------
} //-------------end start function---------

start();

function createCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of flashcard do you want to create?",
            choices: ["Basic Card", "Cloze Card"],
            name: "cardType"
        }

    ]).then(function(userCreate) {

      var cardType = userCreate.cardType;
      console.log("User chose to create a " + cardType);

      if (cardType === "Basic Card"){
        console.log("Begin Basic Card Construction");
        inquirer.prompt([
          {
            name: "newFront",
            type: "input",
            message:"Please enter what you would like on the front of your card.",
          },
          {
            name:"newBack",
            type:"input",
            message:"what would you like on the back of the new card?",
          }

        ]).then(function(cardData){
          console.log(cardData);
          console.log(cardData.newFront);
          console.log(cardData.newBack);
          console.log(cardData.newFront + " : " + cardData.newBack);

          var userCard = new BasicCard(cardData.newFront, cardData.newBack);
          basicLibrary.push(userCard);
          fs.writeFile("basLibrary.json", JSON.stringify(basicLibrary, null, 2));
          console.log("Card stored in basLibray.json");

          inquirer.prompt([
            {
              name:"again",
              message:"would you like to make another basic card?",
              type: "confirm",
            }
          ]).then(function(res){
            console.log(res);
            if(res.again){
              console.log("true");
              createCard();
            } else {
              console.log("false");
              start();
            }
          })

        })

      } else {///---------------cloze car creator---------------//
        console.log("Begin Cloze Card Construction");
      }


  });//-----end card creation selection


  }///----end create




function basicDraw() {

  var randomBas = Math.floor(Math.random() * (basicLibrary.length - 1));
  //console.log(randomBas);

  //console.log(basicLibrary[randomBas].front);
  var currentCard = basicLibrary[randomBas];

  //console.log(currentCard.front);
  //var newCard = CardLibrary[0];

  inquirer.prompt([

    {
      name: "test",
      //message: newCard.front,
      message: currentCard.front,
      type: "input",
      validate: function validateInput(ans) {
        return ans !== '';
      }
    }
  ]).then(function(ans){
    //console.log(ans.test);
    //console.log(newCard.back.toLowerCase());
    if(ans.test === currentCard.back || ans.test === currentCard.back.toLowerCase()){
  //  if(ans.test === newCard.back || ans.test === newCard.back.toLowerCase()){
      console.log("correct");
      count++;
    } else {
      count++;
      console.log("Incorrect the answer was " + randomBas.back + ".");
      //console.log("Incorrect the answer was " + newCard.back + ".");
    }
  });

}
