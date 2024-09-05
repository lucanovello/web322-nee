/*********************************************************************************
 * WEB322 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites, GPT) or distributed to other students.
 *
 * Name:         Luca Novello
 * Student ID:   038515003
 * Date:         09-04-2024
 *
 ********************************************************************************/

const fs = require("fs");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface(process.stdin, process.stdout);

function processFile(fileName) {
  fs.readFile(fileName, "utf8", (err, fileData) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const lines = fileData.split("\n").length;
    const words = fileData
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const characters = fileData.length;
    const frequency = {};
    for (let char of fileData.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        frequency[char] = (frequency[char] || 0) + 1;
      }
    }
    console.log(`File: ${fileName}`);
    console.log(`Number of lines: ${lines}`);
    console.log(`Number of words: ${words}`);
    console.log(`Number of characters: ${characters}`);
    console.log(
      "Frequency of each alphabet letter (case insensitive): ",
      frequency
    );
  });
}

function processDirectory(dirName) {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const txtFiles = files
      .filter((file) => path.extname(file) == ".txt")
      .sort()
      .reverse();

    console.log(`Files in directory:`, txtFiles);

    let totalSize = 0;
    txtFiles.forEach((file) => {
      const filePath = path.join(dirName, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      processFile(filePath);
    });

    console.log(`\nTotal number of files: ${txtFiles.length}`);
    console.log(`Cumulative size of files: ${totalSize} bytes\n`);
  });
}

function main() {
  rl.question(
    "Would you like to process a File(f) or Directory(d): ",
    (input) => {
      const prompt = input.toLowerCase();
      if (prompt === "f") {
        rl.question("Enter the name of the file: ", (fileName) => {
          processFile(fileName);
          rl.close();
        });
      } else if (prompt === "d") {
        rl.question("Enter the name of the directory: ", (dirName) => {
          processDirectory(dirName);
          rl.close();
        });
      } else {
        console.log("Invalid Selection");
        rl.close();
      }
    }
  );
}

main();
