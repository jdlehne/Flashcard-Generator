function ClozeCard(text, cloze) {
  this.fullText = text;
  this.cloze = cloze;
  this.partial = this.checkPartial();
  //this.partial = this.partial = text.replace(cloze, "...");
}


ClozeCard.prototype.checkPartial = function() {
  var re = new RegExp(this.cloze);
  if (!re.exec(this.fullText)) {
    throw new Error("Cloze deletion not found in text input, please start over");
  }
  return this.fullText.replace(re, "...");
};


module.exports = ClozeCard;
