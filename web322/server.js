const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

let count = 1; // global counter
let maxCount = 5; // global maximum

let myCountInterval = setInterval(function () {
  console.log('Hello after ' + count++ + ' second(s)');
  checkMaximum();
}, 1000);

let checkMaximum = function () {
  if (count > maxCount) {
    clearInterval(myCountInterval);
  }
};

console.log(__dirname);
// outputs /Users/pcrawford

console.log(__filename);
// outputs /Users/pcrawford/ex1.js

// outputs "Hello after 1 second" to the console
setTimeout(function () {
    console.log('Hello after 1 second');
  }, 1000);

let myURL = new URL('https://myProductInventory.com/products?sort=asc&onSale=true');

for (const [key, value] of myURL.searchParams) {
    console.log('key: ' + key + ' value: ' + value);
  }
  
  /*
  key: sort value: asc
  key: onSale value: true
  */

const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('event', function () {
  console.log('an event occurred!');
});

myEmitter.emit('event');

const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('First Name: ', function (fName) {
  rl.question('Last Name: ', function (lName) {
    console.log('Hello: ' + fName + ' ' + lName);
    rl.close();
  });
});

const path = require('path');

console.log('Absolute path to about.html');

console.log(path.join(__dirname, '/about.html')); // with leading slash
console.log(path.join(__dirname, '//about.html')); // with multiple leading slashes
console.log(path.join(__dirname, 'about.html')); // without leading slash
console.log(path.join(__dirname, '\about.html')); // with incorrect leading slash


const fs = require('fs');

fs.readdir('img', function (err, filesArray) {
  if (err) console.log(err);
  else {
    console.log(filesArray);
  }
});

fs.readFile('names.csv', function (err, fileData) {
  if (err) console.log(err);
  else {
    namesArray = fileData.toString().split(',');
    console.log(namesArray);
  }
});