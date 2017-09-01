function BasicCard(front,back) {
  this.front= front;
  this.back= back;
}

module.exports = BasicCard;


///----------TEST---------------//
var basicLib = [];
var newBasic = new BasicCard(
    "Who was the first president of the United States?", "George Washington");
basicLib.push(newBasic);
var newBasic = new BasicCard(
    "Who was the last president of the United States?", "Donald Trump");
// "Who was the first president of the United States?"
/*console.log(newBasic.front);
// "George Washington"
console.log(newBasic.back);

basicLib.push(newBasic);

console.log(basicLib.length);
console.log(basicLib[0].front);*/
