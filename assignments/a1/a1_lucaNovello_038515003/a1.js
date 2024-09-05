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

const fs = require("fs"); // Import file system module
const readline = require("readline"); // Import readline module
const path = require("path"); // Import path module
const rl = readline.createInterface(process.stdin, process.stdout); // Create readline interface

// Function to process a file
function processFile(fileName, i = 1, size = 1) {
  fs.readFile(fileName, "utf8", (err, fileData) => {
    // check for errors
    if (err) {
      console.log("\x1b[31m", err.message, "\x1b[0m");
      return;
    }
    // Calculate number of lines, words, characters and frequency of each alphabet letter
    const lines = fileData.split("\n").length; // Split file data by newline character
    // Split file data by whitespace characters
    const words = fileData
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const characters = fileData.length; // Get length of file data
    const frequency = {}; // Initialize frequency object
    // Iterate through each character in file data
    for (let char of fileData.toLowerCase()) {
      // Check if character is an alphabet letter
      if (/[a-z]/.test(char)) {
        frequency[char] = (frequency[char] || 0) + 1; // Increment frequency of character
      }
    }
    console.log(); // Add newline
    console.log(`\x1b[0mFile \x1b[34m${i}\x1b[0m of \x1b[34m${size}\x1b[0m...`); // Display file number out of total files **(Optional)
    console.log(`\x1b[0mFilename: \x1b[34m${fileName}\x1b[0m`); // Display filename **(Optional)
    console.log(`\x1b[0mNumber of lines: \x1b[34m${lines}\x1b[0m`); // Display number of lines
    console.log(`\x1b[0mNumber of words: \x1b[34m${words}\x1b[0m`); // Display number of words
    console.log(`\x1b[0mNumber of characters: \x1b[34m${characters}\x1b[0m`); // Display number of characters
    console.log(
      "\x1b[0mFrequency of each alphabet letter (case insensitive): ", // Display frequency of each alphabet letter
      frequency
    );
  });
}

// Function to process a directory
function processDirectory(dirName) {
  fs.readdir(dirName, (err, files) => {
    // check for errors
    if (err) {
      console.log("\x1b[31m", err.message, "\x1b[0m");
      return;
    }
    let totalSize = 0; // Initialize total cumulative size
    // Filter files with .txt extension
    const txtFiles = files
      .filter((file) => path.extname(file) == ".txt")
      .sort();
    // Process each file in directory
    txtFiles.forEach((file, index) => {
      const filePath = path.join(dirName, file); // Get file path
      const stats = fs.statSync(filePath); // Get file stats
      totalSize += stats.size; // Increment total size
      processFile(filePath, index + 1, txtFiles.length); // Process file
    });
    console.log(); // Add newline
    // Display total number of files
    console.log(
      `\x1b[0mTotal number of files: \x1b[34m${txtFiles.length}\x1b[0m`
    );
    // Display cumulative size of files
    console.log(
      `\x1b[0mCumulative size of files: \x1b[34m${totalSize} bytes\x1b[0m`
    );
    // Display files in directory **(Optional)
    console.log(`\x1b[0mFiles in directory: `, txtFiles.sort(), "\x1b[0m");
  });
}

// Main function
function main() {
  // Prompt user to select file or directory
  rl.question(
    "\x1b[37mWould you like to process a \x1b[36mFile(f)\x1b[37m or \x1b[36mDirectory(d)\x1b[37m: \x1b[32m",
    (input) => {
      const prompt = input.toLowerCase(); // Convert input to lowercase
      if (prompt === "f") {
        // If user selects file
        // Prompt user for file name
        rl.question(
          "\x1b[37mEnter the name of the \x1b[1mFile\x1b[0;37m: \x1b[32m",
          (fileName) => {
            processFile(fileName); // Process file
            rl.close(); // Close readline interface
          }
        );
      } else if (prompt === "d") {
        // If user selects directory
        // Prompt user to enter directory name
        rl.question(
          "\x1b[37mEnter the name of the \x1b[1mDirectory\x1b[0;37m: \x1b[32m",
          (dirName) => {
            processDirectory(dirName); // Process directory
            rl.close(); // Close readline interface
          }
        );
      } else {
        console.log("\x1b[31mInvalid Selection\x1b[0m"); // Display error message
        rl.close(); // Close readline interface
      }
    }
  );
}

main();
