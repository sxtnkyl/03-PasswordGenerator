// Assignment Code
var generateBtn = document.querySelector("#generate");

let options = {
  length: 0,
  spChars: false,
  numeric: false,
  upper: false,
  lower: false,
  strings: {
    spChars: "!@#$%^&*()_+-=?/[]{}|;/':",
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numeric: "0123456789",
  },
};

//make sure length has only numbers/within range
function checkLength(l) {
  function retry() {
    newInput = window.prompt(
      "ILL ASK AGAIN- Enter a password length from 8-128"
    );
    checkLength(newInput);
  }
  var regExp = /[a-zA-Z]/g;
  if (regExp.test(l)) {
    retry();
  } else if (l < 8 || l > 128) {
    retry();
  } else {
    return l;
  }
}

//update local params object
function setOptions(o) {
  var pwLen = prompt("Enter a password length from 8-128");
  //check length until correct
  let len = checkLength(pwLen);
  o.length = len;
  var spChars = confirm("Do you want to include special characters?");
  if (spChars) o.spChars = true;
  var numChars = confirm("Do you want to include numbers?");
  if (numChars) o.numeric = true;
  var uppercase = confirm("Do you want to include Uppercase characters?");
  if (uppercase) o.upper = true;
  var lowercase = confirm("Do you want to include Lowercase characters?");
  if (lowercase) o.lower = true;
  checkArgs(o);
}

//form string to display
function generatePassword(o) {
  var result = "";
  var characters = "";
  //build wanted chars
  for (let key in o) {
    if (o[key] == true) {
      characters += o.strings[key];
    }
  }
  //add random char to result
  for (var i = 0; i < o.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

//ensure at least one selected
function checkArgs(o) {
  let count = 0;
  for (let key in o) {
    if (o[key] == true) count++;
  }
  if (count == 0) {
    confirm("Please select at least one parameter");
    setOptions(o);
  } else return;
}

//set local options object, execute
function writePassword() {
  let newOptions = { ...options };
  setOptions(newOptions);
  var password = generatePassword(newOptions);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
