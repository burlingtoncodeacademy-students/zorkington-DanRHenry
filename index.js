const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


// Text Decoration Codes
let bold = "\u001b[1m"
// Font Colors
  let black = "\u001b[30m"
  let red = "\u001b[31m"
  let green = "\u001b[32m"
  let yellow = "\u001b[33m"
  let blue = "\u001b[34m"
  let magenta = "\u001b[35m"
  let cyan = "\u001b[36m"
  let white = "\u001b[37m"
  let brightYellow = "\u001b[33;1m";
  let brightBlack =  "\u001b[30;1m";
  let brightRed = "\u001b[31;1m";
  let brightGreen = "\u001b[32;1m";
  let brightBlue = "\u001b[34;1m";
  let brightMagenta = "\u001b[35;1m";
  let brightCyan = "\u001b[36;1m";
  let brightWhite = "\u001b[37;1m";
  let reset = "\u001b[0m";
// Background Color Codes
  let backgroundBlack = "\u001b[40m";
  let backgroundRed = "\u001b[41m";
// Cursor Navigation Codes
  let up = "\u001b[{n}A" // n = number of spaces
  let down = "\u001b[{n}B"
  let right = "\u001b[{n}C"
  let left = "\u001b[{n}D"
// Backspace Code
  let backspace = "\u001b[010"
// Clear Screen Codes
  let clearScreen = "\u001b[2J"
  // "\u001b[{n}J"
  // n=0 clears from cursor until end of screen,
  // n=1 clears from cursor to beginning of screen
  // n=2 clears entire screen
// Clear Line Codes
// "\u001b[{n}K"
  // n=0 clears from cursor to end of line
  // n=1 clears from cursor to start of line
  // n=2 clears entire line

const welcomeMessage = `Welcome to the\n${brightYellow}UprightEd ${brightGreen}Zorkington${reset}${white} ${brightYellow}Project${reset}${white}!\nBefore we get started...\nPlease enter your ${brightYellow}name?${reset}${white}\n`

let nameInput;

async function askName() {
  if (nameInput == undefined) {
    nameInput = await ask(welcomeMessage)
    // start()
  }
}
let z = 0;
let x = 9;
let y = 9;
let playerLocation = [z, x, y];
let cL;
let i = 0;
// let itemToUse;
let commands = `\nTo ${brightGreen}move:${reset}, type ${brightYellow}go${reset}, ${brightYellow}"walk"${reset}, or ${brightYellow}"move"${reset}\nYou can also use ${brightYellow}move north${reset}, etc.\nTo return home, ask to "warp"\nLook around using "look".`
let inventory = [];
//Location Class Constructor
class Location {
  constructor(coordinate, name, description, north, east, south, west, up, down, item1, item2, item3, lock, funct) {
        this.coordinate = coordinate; // Location on map
        this.description = description; // wordy description from looking around
        this.north = north; 
        this.east = east;
        this.south = south;
        this.west = west;
        this.up = up;// Default directions to closed?
        this.down = down;// Default directions to closed?
        this.name = name; // quick name of location
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
        this.lock = lock; // holds a string that matches a key used to unlock it
        this.funct = funct;
  }
}

// This will store all constructed location objects
let locationArray = [];

// createLocation function to construct each location and push them to the locationArray
function createLocation(newLocation, coordinate, name, description, north, east, south, west, up, down, item1, item2, item3, lock, funct) {
  newLocation = new Location(coordinate, name, description, north, east, south, west, up, down, item1, item2, item3, lock, funct);
return locationArray.push(newLocation)
}

/* Locations indices
  0 = newLocation variable
  1 = coordinate
  2 = name
  3 = description
  4 = north
  5 = east
  6 = south
  7 = west
  8 = up
  9 = down
  10 = itemOne // Change this to a single item array.
  11 = itemTwo
  12 = itemThree
  13 = lock
  14 = funct
 */

  // Create Start Location
createLocation(
  "start", // 0
  [0,9,9], // 1
  "home", // 2
  `\nYou're at the entrance to the ${brightYellow}PTSB January Cohort${reset}.\nYou see a ${brightGreen}magnetic stripe reader${reset}.`, // 3
  "blocked",  // 4
  undefined,  // 5
  undefined,  // 6
  undefined, 
  undefined, 
  undefined, 
  `keycard`, 
  undefined, 
  undefined, 
  "keycard",
  // undefined,
  // undefined,
  // undefined,
  );

  // Create Hallway
createLocation(
  "hallway", // 0 newLocation Variable
  [0,9,10], // 1 name
  'hallway', //2 description
  `\nThere are doors up and down the hallway.\nThrough a window to your left, you can see ${green}Morgan Walker${reset}.\nShe appears to be meeting with a ${green}student${reset}.\nBest not disturb them.\nTo the right is a door to an ${yellow}office${reset}.`,
  undefined, //4 north
  undefined, //5 east
  undefined, //6 south
  "blocked", //7 west
  undefined, //8 up
  undefined, //9 down
  undefined, //10 itemOne
  undefined, //11 itemTwo
  undefined, //12 itemThree
  undefined, //13 lock
  );

  // Create topOfStairway
createLocation(
  "stairwell",
  [0,8,11],
  `stairwell`,
  `\nYou are at a stairwell going ${yellow}down${reset}.`,
  "blocked",
  undefined,
  "blocked",
  "blocked",
  undefined,
  "open"
)

createLocation(
  "dungeon",
  [-1,8,11],
  `stairwell`,
  `\nYou have stumbled on a ${green}dungeon${reset}.\nThere is a narrow path to your ${yellow}right${reset}`,
  "blocked",
  undefined,
  "blocked",
  "blocked",
  "open",
  undefined,
)

  // Create Traproom
  createLocation(
    "trapRoom", // 0 newLocation Variable
    [-1,9,11], // 1 name
    'trapRoom', //2 description
    `\nIt's a ${yellow}trap!${reset}\n"The door ${green}closes and locks${reset} behind you!\nYou see a ${yellow}note${reset} that reads: Speak the magic word, and you may exit.`,
    "blocked", //4 north
    "blocked", //5 east
    "blocked", //6 south
    "blocked", //7 west
    undefined, //8 up
    undefined, //9 down
    undefined, //10 itemOne
    undefined, //11 itemTwo
    undefined, //12 itemThree
    undefined, //13 lock
    );

// createLocation(
//   "",
//   []
// )

createLocation(
  "katesOffice",
  [0,9,12], 
  'katesOffice', 
  `${green}Kate${reset} waiving hello.\na${green} desklamp${reset} on Kate's desk.`,
  "blocked",
  "blocked",
  undefined,
  "blocked",
  undefined,
  undefined,
  );

createLocation(
  "endOfHall",
  [0,9,11],
  "endOfHall",
  `You reach the end of the hall.\nIn front of you is ${green}Kate's${reset} office.\nTo the left is a ${yellow}stairwell${reset}`,
  undefined,
  "blocked",
  undefined,
  "blocked"
)

createLocation(
  "bensOffice", //0
  [0,10,10], //1
  'bensOffice', //2
  `\nYou enter the office.\nYou see${green} Ben${reset} sitting at his computer leading a help session.\nHe offers you ${yellow}sympathy${reset}`,//3
  "blocked",//4
  "blocked",//5
  undefined,//6
  undefined,//7
  "open",//8
  undefined,//9
  "tissue",//10
  undefined,//11
  undefined,//12
  undefined,//13
  );

begin();

async function begin() {
  await askName();
  console.log(`\nHi, ${brightYellow}${nameInput}${reset}!\nWe are happy that you have come to take a tour of our ${brightGreen}Zorkington${reset} project!\nYou're at the entrance to the ${brightYellow}PTSB January Cohort${reset}.\nYou see a ${brightGreen}magnetic stripe reader${reset}.`)
  start()}


async function start() {

// Get input, split it into an array, search the array for keywords, call functions based on those keywords.
// async function getInput() {
  let input = []
  let response = await ask(`\nWhat would you like to do?\n`)
  // let response = await ask(`\nWhat would you like to do? \nType help for commands.\n`)
  input.push(response);
  input = response.split(" ")
  // console.log("input:",input)
// Search input for keywords
// Help command:
  if (input.includes("help")) {
    console.log("\nThis is unfinished\n",commands)
    start()
 
  } else if (input.includes("location")) {
      console.log(playerLocation,"\n",locationArray);
      start()

// Look command:
  } else if (input.includes("look") || input.includes("search")) {  // Change to fix text case
    describe();

  // Where am I?:
    } 
  else if (input.includes("where")) {
    // console.log(playerLocation);
  console.log("playerLocation:",playerLocation)
  if (locationArray[i].coordinate) {
  console.log("locationArray[i].coordinate:",locationArray[i].coordinate)
  console.log("cL:",cL);
}
    start();
  }
  
// Move north:
  else if (input.includes("go") && input.includes("north")|| input.includes("move") && input.includes("north") || input.includes("walk") && input.includes("north")|| input.includes("go") && input.includes("forward")|| input.includes("move") && input.includes("forward") || input.includes("walk") && input.includes("forward")) {
    go("north") 
  } 
  
  // Move south:
// Search input for keywords go, move, walk, south
// Move south:
  else if (input.includes("go") && input.includes("south")|| input.includes("move") && input.includes("south") || input.includes("walk") && input.includes("south") || input.includes("go") && input.includes("backward")|| input.includes("move") && input.includes("backward") || input.includes("walk") && input.includes("backward")) {
  go("south") 

  // Move without a direction requested:
// Search input for keywords go, move, walk
// } else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
//   let moveDirection = await ask("Which direction would you like to move?\n")
//   go(moveDirection);
} 

// Move east:
  // Search input for keywords go, move, walk, south
else if (input.includes("go") && input.includes("east")|| input.includes("move") && input.includes("east") || input.includes("walk") && input.includes("east")|| input.includes("go") && input.includes("right")|| input.includes("move") && input.includes("right") || input.includes("walk") && input.includes("right")) {
  go("east") 
}

// Move west:
  // Search input for keywords go, move, walk, south
else if (input.includes("go") && input.includes("west")|| input.includes("move") && input.includes("west") || input.includes("walk") && input.includes("west")|| input.includes("go") && input.includes("left")|| input.includes("move") && input.includes("left") || input.includes("walk") && input.includes("left")) {
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


// Move without a direction requested:
  // Search input for keywords go, move, walk
else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
  let moveDirection = await ask("Which direction would you like to move?\n")
  go(moveDirection); }

// Warp to start:
else if (input.includes("please")|| input.includes("abracadabra" || input.includes("hocus"))) {
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
/* 
Check to see if an item exists in the current location
If it does, add it to the inventory and remove it from the current location object.
*/
else if (input.includes("take") || input.includes("pick")) {
  take();
}

// Drop Item:
// Use the splice command to remove the dropped item from the inventory
else if (input.includes("drop") || input.includes("leave")) {
  let itemToDrop;
  if (input.includes("drop")) {
    itemToDrop = input[input.indexOf("drop")+1]
    drop (itemToDrop)

  } else if (input.includes("leave")) {
    let itemToDrop = input[input.indexOf("leave")+1] // Takes the next word in the input index to use as an item argument
    itemToDrop = input[indexOf("leave")+1]
    drop(itemToDrop);
  }
}

// This works for unlocking doors, but doesn't work for detecting if there is nothing to unlock
else if (input.includes("unlock")|| input.includes("swipe")) {
  // async function take() {
    let i = 0;
      async function search() {
          i++
          // Search the locationArray for the existence of the current location...
          // If the currentLocation does not exist, repeat the search and i will increase by one:
          // if (i >= locationArray.length) {
            // console.log(`There's nothing to unlock.`)
          // }
          if (i < locationArray.length && JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
              search()
          // If the locationArray Length has been exhausted, and i is undefined:
          } else if (locationArray[i] == undefined){
              // console.log(``); 
              start();
          // If the coordinate has been discovered in the locationArray, display the description.
          } else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
            if (locationArray[i].lock == undefined) {
              console.log("There's nothing to unlock.")
            } else {
              if (inventory.includes(locationArray[i].lock)) {
                if (locationArray[i].north == "blocked") {
                  locationArray[i].north = undefined
                } else if (locationArray[i].east == "blocked") {
                  locationArray[i].east = undefined
                } else if (locationArray[i].south == "blocked") {
                  locationArray[i].south = undefined
                } else if (locationArray[i].west == "blocked") {
                  locationArray[i].west = undefined
                }
                inventory.splice(inventory.indexOf(locationArray[i].lock), 1)
                locationArray[i].lock = undefined
              }
              // console.log("you've got the key, use it, dude.")
            }
        }
      }
        if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
          if (locationArray[i].lock == undefined) {
            console.log("There's nothing to unlock.")
          } else {
            if (inventory.includes(locationArray[i].lock)) {
              console.log(`You hear a mechanism ${blue}click${reset}.`)
                if (locationArray[i].north == "blocked") {
                  locationArray[i].north = undefined
                } else if (locationArray[i].east == "blocked") {
                  locationArray[i].east = undefined
                } else if (locationArray[i].south == "blocked") {
                  locationArray[i].south = undefined
                } else if (locationArray[i].west == "blocked") {
                  locationArray[i].west = undefined
                }
                inventory.splice(inventory.indexOf(locationArray[i].lock), 1)
                locationArray[i].lock = undefined
              }
          }
      start();
      } else {
      search()
      }
  }
// }

// View Inventory:
else if (input.includes("inventory") || input.includes("items") || input.includes("i")) {
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

// Open the door
else if (locationArray[i].funct && input.includes("open")) {
  locationArray[i].funct()
  start()
} else if (!locationArray[i].funct && input.includes("open")) {
  console.log(`There's nothing to ${brightYellow}open${reset} here!`)
  start()
}

// Command not recognized:
else {
  console.log(`\nI don't understand what you're saying.\n`)
  start()
}

// Take Items function:
async function take() {
  let i = 0;
    async function search() {
        i++
        // Search the locationArray for the existence of the current location...
        // If the currentLocation does not exist, repeat the search and i will increase by one:
        if (i < locationArray.length && JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
            search()
        // If the locationArray Length has been exhausted, and i is undefined:
        } else if (locationArray[i] == undefined || !locationArray[i].item1){
            console.log(`There's nothing you can pick up...`); 
            start();
        // If the coordinate has been discovered in the locationArray, display the description.
        } else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation) && locationArray[i].item1) {
        {
          inventory.push(locationArray[i].item1);
          locationArray[i].item1 = undefined;
          start();
        }
      }
    }
      if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation) && locationArray[i].item1) {
        if (!input.includes(locationArray[i].item1)) {
          console.log("You can't take that.")
          start();
        }
          let takeItemQuestion = await ask(`Would you like to pick up ${yellow}${locationArray[i].item1}${reset}?`) 
    if (takeItemQuestion == "y" || takeItemQuestion == "yes") {
      inventory.push(locationArray[i].item1);
      locationArray[i].item1 = undefined;
    start();
    } else {
    start() 
    }
  } // If there is nothing to pick up
  else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation) && !locationArray[i].item1){
    console.log(`There's nothing to pick up here.`)
    start();
  }
  // If the coordinate hasn't been found at index 0, call the search function.
  else {
    search();
  }
}

async function drop(item) {
  let i = 0;
  let dropItemQuestion = await ask(`Are you sure you want to drop ${item}?`);
  if (dropItemQuestion == "y" || dropItemQuestion == "yes") {
    
    // In this section, locationArray[i].coordinate is unable to be read in the nested ifs
    async function search() {
        i++
        // Search the locationArray for the existence of the current location...
        // If the currentLocation does not exist, repeat the search and i will increase by one:
        //! if there is a locationArray.coordinate do this... else do something else... place this correctly later::: }
        if (locationArray[i] != undefined) {
          if (i < locationArray.length && JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
            search()
          // If the coordinate has been discovered in the locationArray, display the description.
          } else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
          // Search the locationArray for full item slots and skip them
          if (locationArray[i].item1 != undefined) {
            // console.log("I think there's something at item1")
            console.log("existing item1", locationArray[i].item1)
            if (locationArray[i].item2 != undefined) {
              // console.log("I think there's something at item2")
              if (locationArray[i].item3 != undefined) {
                console.log("you can't drop anything more here");
                start()
              } else { //! may need to add logic here to prevent overwriting existing items // Change the item slot to an array of its own, and then push items to it... later...
                locationArray[i].item3 = item;
                
                // search inventory for the dropItemQuestion and delete it.
                inventory[inventory.indexOf(item)] = undefined 
                start()
              } 
            } else {
              locationArray[i].item2 = item;
              inventory[inventory.indexOf(item)] = undefined
              start()
          } 
        } else {
            console.log("here")
            locationArray[i].item1 = item;
            inventory.splice([inventory.indexOf(item)], 1)
            start()
        }
      }
// If the locationArray Length has been exhausted, and i is undefined:
      } else if (locationArray[i] == undefined){
          let newLocation = (`_${playerLocation}`)
          createLocation(newLocation, playerLocation, undefined, "nothing special about this area",undefined,undefined,undefined,undefined,undefined,undefined)
          // console.log(locationArray)
          locationArray[locationArray.length-1].item1 = item
          // locationArray[i].item1 = item;
          inventory.splice([inventory.indexOf(item)], 1)
          // start()
          // console.log(locationArray);
          start();
        }         
  }


    
    if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
            if (locationArray[i].item1 != undefined) {
              if (locationArray[i].item2 != undefined) {
                if (locationArray[i].item3 != undefined) {
                  console.log("you can't drop anything more here");
                } else {
                  locationArray[i].item3 = item;
                  inventory[indexOf(item)] = undefined
                  // search inventory for the dropItemQuestion and delete it.
                  inventory
                }
              } else {
                locationArray[i].item2 = item;
                inventory[indexOf(item)] = undefined
              }
            } else {
            locationArray[i].item1 = item;
            inventory[inventory.indexOf(item)] = undefined
          }
      start();
    }
    // If the coordinate hasn't been found at index 0, call the search function.
    else {
      // console.log("about to search")
      search();
    }
  }
  else {
    start();
  }
}

async function go(text) {
  // create a variable to hold current locations info
  // let cL = [];
  cL = [];
  // let i = 0;
  // console.log("i:",i)
  // Iterate over the locationArray for the currentLocation coordinates 
  // If nothing is found at the index, keep searching.

  //! Look for locationArray[i].coordinate and if it exists, do this:
  // Problem: If there is no locationArray index, the cL has nothing to push
  // Iterate through the locationArray, and if locationArray at index i is not the player's location:
    if (i < locationArray.length && JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
    i++
  //If found, push directions (4, 5, 6, 7, 8, 9) at the current index to the cL array.
    } else if (locationArray[i] && JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
    cL.push(locationArray[i].north); // index 4
    cL.push(locationArray[i].east); // index 5
    cL.push(locationArray[i].south); // index 6
    cL.push(locationArray[i].west); // index 7
    cL.push(locationArray[i].up); // index 8
    cL.push(locationArray[i].down); // index 9
    }
  //If the text is "blocked", do not move, but display a message.
    if (text == "north" || text == "forward") {
      // console.log("cL599:",cL)
      if (cL[0] == 'blocked') {
        console.log("The way is blocked.")
        // playerLocation = locationArray[i].coordinate;
      } else {
      console.log(`You move ${text}`);
      y++
      playerLocation = [z, x, y];
      // console.log(locationArray[i])
    }

  } else if (text == "east" || text == "right") {
    if (cL[1] == "blocked") {
      console.log("The way is blocked.");
      playerLocation = locationArray[i].coordinate;
    } else {
    console.log(`You move ${text}`);
    x++
    playerLocation = [z, x, y];
    }

  } else if (text == "south" || text == "backward") {
    if (cL[2] == "blocked") {
      console.log("The way is blocked.");
      playerLocation = locationArray[i].coordinate;
    } else {
    console.log(`You move ${text}`);
    y--
    playerLocation = [z, x, y];
    }

  } else if (text == "west" || text == "left") {
    if (cL[3] == "blocked") {
      console.log("The way is blocked.")
      playerLocation = locationArray[i].coordinate;
    } else {
    console.log(`You move ${text}`);
    x--
    playerLocation = [z, x, y];
    }

  } else if (text == "up") {
    if (cL[4] != "open") {
      console.log("You can't go up from here.")
      if(locationArray[i]) {playerLocation = locationArray[i].coordinate;}
    } else {
    console.log(`You move ${text}`);
    z++
    playerLocation = [z, x, y];
    }

  } else if (text == "down") {
    if (cL[5] != "open") {
      console.log("You can't go down from here.")
      if (locationArray[i]) {playerLocation = locationArray[i].coordinate;}
    } else {
    console.log(`You move ${text}`);
    z--
    // console.log(z, x, y)
    playerLocation = [z, x, y];
    }

  } else if (text == "warp") {
  if (cL[6] == "blocked") {
    console.log("You cannot warp out of here.")
    playerLocation = locationArray[i].coordinate;
console.log("locationArray[i].coordinate:",locationArray[i].coordinate)
  } else {
    [z, x, y] = [0, 9, 9];
    playerLocation = [z, x, y];
    console.log(`You have ${green}warped${reset} to safety. ${yellow}Congratulations${reset}, ${blue}${nameInput}${reset}, on escaping!`);
  }
};
  describe()
}

// Looking around
  function describe() 
  {
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
        console.log(`You look around and see ${locationArray[i].description}. \n You also see a ${yellow}${locationArray[i].item1}${reset}`);
          start();
        }
        else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
          console.log(`You look around and see ${locationArray[i].description}`);
          start();
        }
    }
    // If the coordinate has been discovered in the locationArray at index 0, display the description.
    if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation) && locationArray[i].item1) {
      console.log(`You look around and see ${locationArray[i].description}. \n You also see a ${yellow}${locationArray[i].item1}${reset}`);
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
}