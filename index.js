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
let commands = `\nMove around using "go", "walk", or "move"\nYou can try to move north, south, east, west, up, or down.\nTo return home, ask to "warp"\nLook around using "look".`
let inventory = [];
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
createLocation("start", [0,9,9], "home", "Starting Point", "You look to the north", 'You look to the south', 'You look to the east', 'You look to the west', 'You look up', 'You look down', '', '', '');
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
  let response = await ask(`\nWhat would you like? \nType help for commands.\n`)
  input.push(response);
  input = response.split(" ")
    console.log(input) 

// Help command:
  if (input.includes("help")) {
    console.log(commands)
    start()

// Look command:
  } else if (input.includes("look") || input.includes("search")) {  // Change to fix text case
    describe();
  // } else if (input.includes("look") || input.includes("search") && (input.includes("itemName"))) // Look at a specific item in the locationArray, if asked for. Finish later.
  // Move north:
  // Search input for keywords go, move, walk, north
  } 
  
// Move north:
  else if (input.includes("go") && input.includes("north")|| input.includes("move") && input.includes("north") || input.includes("walk") && input.includes("north")) {
    go("north") 

// Move without a direction requested:
  // Search input for keywords go, move, walk
  } else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
    let moveDirection = await ask("Which direction would you like to move?\n")
    go(moveDirection);

// Move south:
  // Search input for keywords go, move, walk, south
} 

// Move south:
  else if (input.includes("go") && input.includes("south")|| input.includes("move") && input.includes("south") || input.includes("walk") && input.includes("south")) {
  go("south") 

  // Move without a direction requested:
// Search input for keywords go, move, walk
// } else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
//   let moveDirection = await ask("Which direction would you like to move?\n")
//   go(moveDirection);
} 

// Move east:
  // Search input for keywords go, move, walk, south
else if (input.includes("go") && input.includes("east")|| input.includes("move") && input.includes("east") || input.includes("walk") && input.includes("east")) {
  go("east") 

// Move without a direction requested:
// Search input for keywords go, move, walk
// } else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
//   let moveDirection = await ask("Which direction would you like to move?\n")
//   go(moveDirection);
}

// Move west:
  // Search input for keywords go, move, walk, south
else if (input.includes("go") && input.includes("west")|| input.includes("move") && input.includes("west") || input.includes("walk") && input.includes("west")) {
  go("west") 
}

// Move up:
  // Search input for keywords go, move, walk, south
else if (input.includes("go") && input.includes("up")|| input.includes("move") && input.includes("up") || input.includes("walk") && input.includes("up")) {
  go("up") 
}

// Move down:
  // Search input for keywords go, move, walk, south
else if (input.includes("go") && input.includes("down")|| input.includes("move") && input.includes("down") || input.includes("walk") && input.includes("down")) {
  go("down")

// Move without a direction requested:
// Search input for keywords go, move, walk
} else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
  let moveDirection = await ask("Which direction would you like to move?\n")
  go(moveDirection);
} 

// Warp to start:
else if (input.includes("warp")) {
  let warpQuestion = await ask("Would you like to warp home?") 
  if (warpQuestion == "y" || warpQuestion == "yes") {
    go("warp");
  } else {
    start() 
  }
} 

// Exit game:
else if (input.includes("quit") || input.includes("exit")) {
  let exitQuestion = await ask ("Are you sure you want to exit the game?\n")
  if (exitQuestion == "y" || exitQuestion == "yes") {
    process.exit();
  } else {
    start();
  }
}

// Take/pick up items:
else if (input.includes("take") || input.includes("pick")) {
  let takeItemQuestion = await ask("Would you like to pick up?") 
  if (takeItem == "y" || takeItemQuestion == "yes") {
    take();
  } else {
    start() 
  }
}

// View Inventory:
else if (input.includes("inventory") || input.includes("items")) {
  if (inventory.length == 0) {
    console.log(`You have nothing in your inventory`)
    start()
  }  else {
  console.log(inventory);
    start() 
  }
} 

// Exit the game
else if (input.includes("exit" || input.includes("quit"))) {
  let quitQuestion = await ask(`Are you sure want to quit the game?`)
  if (quitQuestion == "y" || quitQuestion == "yes") {
    process.exit();
  } else {
    start();
  }
}
// Command not recognized:
else {
  console.log(`\nI don't understand what you're saying.\n`)
  start()
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
      // console.log(playerLocation);
      // console.log("here")
    }

  } else if (text == "east") {
    if (cL[1] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    x++
    playerLocation = [z, x, y];
    }

  } else if (text == "south") {
    if (cL[2] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    y--
    playerLocation = [z, x, y];
    }

  } else if (text == "west") {
    if (cL[3] == "blocked") {
      console.log("The way is blocked.")
    } else {
    console.log(`You move ${text}`);
    x--
    playerLocation = [z, x, y];
    }

  } else if (text == "up") {
    if (cL[4] != "open") {
      console.log("You can't go up from here.")
    } else {
    console.log(`You move ${text}`);
    z++
    playerLocation = [z, x, y];
    }

  } else if (text == "down") {
    if (cL[5] != "open") {
      console.log("You can't go down from here.")
    } else {
    console.log(`You move ${text}`);
    z--
    playerLocation = [z, x, y];
    }

  } else if (text == "warp") {
  if (cL[13] == "blocked") {
    console.log("You cannot warp out of here.")
  } else {
    [z, x, y] = [0, 9, 9];
    playerLocation = [z, x, y];
    console.log(`You have warped home`);
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

// 


// Use the ask function. Parse the text input to an array (separated by spaces?). Then look at the array for function words. If the array contains the word, do what needs to be done.


// if (input == "go") {
//   let goTo = await ask ('Where would you like to go?') 
//   go(goTo);
// }

// maybe... Use the ask function to feed information into a state machine, which will then call on the needed functions... 


// Add functionality to look in a direction.
}
// process.exit();