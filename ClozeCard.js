function ClozeCard(text, cloze) {
  this.fullText = text;
  this.cloze = cloze;
  this.partial = text.replace(cloze, "...");
}
//----------who fucking knows----------------
ClozeCard.prototype.error = function() {
  if (ClozeCard.prototype.fullText === undefined) {
    console.log("Error no cloze deletion present");
  }
};

module.exports = ClozeCard;



/*

The constructor should accept two arguments: text and cloze.
The constructed object should have a cloze property that contains only the cloze-deleted portion of the text.
The constructed object should have a partial property that contains only the partial text.
The constructed object should have a fullText property that contains only the full text.
The constructor should throw or log an error when the cloze deletion does not appear in the input text.
Use prototypes to attach these methods, wherever possible.*/

/*
// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");

console.log(brokenCloze.cloze);
console.log(brokenCloze.partial);
console.log(brokenCloze.fulltext);


///----------------working test-------------------//
/*

var firstPresidentCloze = new ClozeCard(
  "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze);

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial);

// "George Washington was the first president of the United States.""
console.log(firstPresidentCloze.fullText);*/
