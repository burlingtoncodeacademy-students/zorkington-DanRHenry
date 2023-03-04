const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let z = 0;
let x = 9;
let y = 9;
let playerLocation = [z, x, y];
// let gameBoard = [];
let i = 0;


//Location Class Constructor
class Location {
  constructor(coordinate, name, description, north, east, south, west, up, down, item1, item2, item3) {
        this.coordinate = coordinate; // Location on map
        this.description = description; // wordy description from looking around
        this.north = north; // Default directions to closed?
        this.east = east;
        this.south = south;
        this.west = west;
        this.up = up;
        this.down = down;
        this.name = name; // quick name of location
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
  }
}

// This will store all constructed location objects
let locationArray = [];

// createLocation function to construct each location and push them to the locationArray
function createLocation(newLocation, coordinate, name, description, north, east, south, west, up, down, item1, item2, item3) {
  newLocation = new Location(coordinate, name, description, north, east, south, west, up, down, item1, item2, item3);
return locationArray.push(newLocation)
}

/* Locations indices
  0 = newLocation
  1 = coordinate
  2 = name
  3 = description
  4 = north
  5 = east
  6 = south
  7 = west
  8 = up
  9 = down
  10 = itemOne
  11 = itemTwo
  12 = itemThree
 */

let currentLocation = [z,x,y];
createLocation("start", [0,9,9], "home", "Starting Point", "You look to the north", 'You look to the south', 'You look to the east', 'You look to the west', 'You look up', 'You look down', 'You see item one', 'You see item 2', 'You see item 3');
createLocation("secondPosition",[0,9,10], 'second position.', 'position 2', "" , "" , "" , "" ,"" ,"", "lobster");
createLocation("cemetary",[0,9,11], 'cemetary', 'An old cemetary lies before you.');

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  // let answer = await ask(welcomeMessage);
  // console.log('Now write your code to make this work!');
  // let input;
// let input = inputText.value.toLowerCase();


// Get input, split it into an array, search the array for keywords, call functions based on those keywords.
// async function getInput() {
  let input = []
  let response = await ask(`\nWhat would you like? \n(Type help for commands.\n)`)
  input.push(response);
  input = response.split(" ")
    console.log(input) 
  if (input.includes("look") || input.includes("search")) {  // Change to fix text case
    describe();
  // } else if (input.includes("look") || input.includes("search") && (input.includes("itemName"))) // Look at a specific item in the locationArray, if asked for. Finish later.
  } else if (input.includes("go") && input.includes("north")|| input.includes("move") && input.includes("north") || input.includes("walk") && input.includes("north")) {
    go("north") 

  } else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
    let moveDirection = await ask("Which direction would you like to move?\n")
    go(moveDirection);
  }


// Movement
// If the text input is the direction name, and the direction parameter is not blocked, move in that direction
async function go(text) {
  // create a variable to hold current locations info
  let cL = [];

  // Iterate over the locationArray for the currentLocation coordinates 
  // If nothing is found at the index, keep searching.
  if (i < locationArray.length && JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
    i++
  //If found, push directions (4, 5, 6, 7, 8, 9) at the current index to the cL array.
  } else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
    cL.push(locationArray[i].north); // index 4
    cL.push(locationArray[i].east); // index 5
    cL.push(locationArray[i].south); // index 6
    cL.push(locationArray[i].west); // index 7
    cL.push(locationArray[i].up); // index 8
    cL.push(locationArray[i].down); // index 9
    // displayText.innerHTML = `You look around and see ${locationArray[i].description}`;
    // console.log(cL); //test
  // If still not found, don't push anything.    
  // }  else (locationArray[i] == undefined) {
    // Display text for movement and update the coordinate
    // start();
  }
  
  //If the text is "blocked", do not move, but display a message.
    if (text == "north") {
      if (cL[0] == "blocked") {
        console.log("The way is blocked.")
      } else {
      console.log(`You move ${text}`);
      y++
      // return playerLocation = [z, x, y];
      playerLocation = [z, x, y];
      // start();
      console.log(playerLocation);
      console.log("here")
      
    }

  } else if (text == "east") {
    if (cL[1] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    x++
    return playerLocation = [z, x, y];
    }

  } else if (text == "south") {
    if (cL[2] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    y--
    return playerLocation = [z, x, y];
    }

  } else if (text == "west") {
    if (cL[3] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    x--
    return playerLocation = [z, x, y];
    }

  } else if (text == "up") {
    if (cL[4] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    z++
    return playerLocation = [z, x, y];
    }

  } else if (text == "down") {
    if (cL[5] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    z--
    return playerLocation = [z, x, y];
    }
  };
  start()
}

// Looking around
  function describe() {
  let i = 0;
    function search() {
      i++
      // Search the locationArray for the existence of the current location...
      // If the currentLocation does not exist, repeat the search and i will increase by one:
      if (i < locationArray.length && JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
          search()
      // If the locationArray Length has been exhausted, and i is undefined:
      } else if (locationArray[i] == undefined){
          console.log(`You don't see anything interesting...`); 
          start();
      // If the coordinate has been discovered in the locationArray, display the description.
      } else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation) && locationArray[i].item1) {
        console.log(`You look around and see ${locationArray[i].description}. \n You also see a ${locationArray[i].item1}`);
          start();
        }
        else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
          console.log(`You look around and see ${locationArray[i].description}`);
          start();
        }
    }
    // If the coordinate has been discovered in the locationArray at index 0, display the description.
    if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation) && locationArray[i].item1) {
      console.log(`You look around and see ${locationArray[i].description}. \n You also see a ${locationArray[i].item1}`);
      start();
    }
    if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
      console.log(`You look around and see ${locationArray[i].description}`);
      start();
    }
    // If the coordinate hasn't been found at index 0, call the search function.
    else {
      search();
    }
  }




// Use the ask function. Parse the text input to an array (separated by spaces?). Then look at the array for function words. If the array contains the word, do what needs to be done.


// if (input == "go") {
//   let goTo = await ask ('Where would you like to go?') 
//   go(goTo);
// }

// maybe... Use the ask function to feed information into a state machine, which will then call on the needed functions... 


// Add functionality to look in a direction.
}
// process.exit();

/* //! Text Input State Machine
class Command {
  constructor(name, functionCall) {
    this.name = name;
    this.functionCall = functionCall;
  }
}

// Create objects for commands
let look = new Command("look", describe());


// Build out lookup table

let locationLookUp = {
  "look": look,
}

let locationCurrent = "home"
// Build out a location state machine
let locationStates = {
  look: ["look"],
  sidewalk: ["home", "store", "park", "gym"],
  store: ["sidewalk"],
  park: ["sidewalk"],
  gym: ["sidewalk"]
};

// Write message to user on the starting location
console.log(locationLookUp[locationCurrent].description);
// Build out moveLocation function to move between locations
function moveLocation(newLocation) {
  // You code goes here:
  let validTransition = locationStates[locationCurrent]; // At first I used locationLookup, but that broke .includes()
  if (validTransition.includes(newLocation)) {
    locationCurrent = newLocation;
    console.log(locationLookUp[locationCurrent].description)
  } else {
    console.log(`Doh!\nYou can't go from ${locationCurrent} to ${newLocation}.`);
  }
}

moveLocation("sidewalk");
// Prints 'You are on the sidewalk.'
moveLocation("store");
// Prints 'You are in the store.'
moveLocation("sidewalk");
// Prints 'You are on the sidewalk.'
moveLocation("park");
// Prints 'You cannot go from sidewalk to park.'
moveLocation("sidewalk");
moveLocation("gym");
moveLocation("home");
// Prints 'You are at your house.'

//! End of Text Input State Machine Section

 */