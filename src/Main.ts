// A Room value is exactly one of these four strings.
// It is impossible for a Room variable to contain any other string.
type RoomName = "A" | "B" | "C" | "Exit";

type Direction = "north" | "south" | "east" | "west";

type DoorState = "locked" | "unlocked" | "open";

type Grid = Room[][];

function promptInput(promptMessage: string): string {
  console.warn(promptMessage);
  let input: string | null = prompt(promptMessage);
  while (input == null || input == "") {
    console.error("Invalid input.");
    input = prompt(promptMessage);
  }
  console.log(input);
  return input;
}

abstract class Room {
  
  abstract handleCommand(command: string): void;
  westDoor: DoorState;
  eastdoor: DoorState;
  constructor(WestDoor: DoorState, EastDoor: DoorState){
    this.westDoor = WestDoor;
    this.eastdoor = EastDoor;

  }
}

class TimeRoom extends Room {
  override handleCommand(command: string): void {
    switch (command) {
      case "time":
        console.log(new Date().toString());
        break;
    }
  }
}

class SwitchRoom extends Room {
  private switch: boolean = false;
  override handleCommand(command: string): void {
    switch (command) {
      case "flip switch":
        this.switch = !this.switch;
        break;
      case "look":
        if (this.switch)
          console.log("The lights are on.");
        else
          console.log("The lights are off.");
        break;
    }
  }
}

const grid: Grid = [
  [new TimeRoom("unlocked","unlocked"), new SwitchRoom("unlocked","unlocked")],
  [new SwitchRoom("unlocked","unlocked"), new TimeRoom("unlocked","unlocked")],
];

export function play(): void {
  let row: number = 0;
  let column: number = 0;

  while (true) {
    const room = grid[row][column];
    const input = promptInput("Enter a command.");
    switch (input) {
      case "east":
        column++;
        break;
      case "west":
        column--;
        break;
      case "north":
        row--;
        break;
      case "south":
        row++;
        break;
      default: room.handleCommand(input);
    }
  }
}

function handleCommand(command: any, string: any) {
  throw new Error("Function not implemented.");
}
//provided by game designer

// let currentRoom: RoomName = "A";
// let hasKey: boolean = false;
// let windowOpen: boolean = false;

// function describeRoom() {
//   switch (currentRoom) {
//     case "A":
//       console.info(
//         "You are in an empty room. There are doors on the north and west walls of this room."
//       );
//       break;
//     case "B":
//       console.info(
//         "You go through the west door. You are in a room with a table."
//       );
//       if (!hasKey) {
//         console.info("On the table there is a key.");
//       }
//       console.info("There is a door on the east wall of this room.");
//       break;
//     case "C":
//       console.info(
//         "You are in a bright room. There is a door on the south wall of this room and a window on the east wall."
//       );
//   }
// }

// function doCommand(command: string) {
//   switch (currentRoom) {
//     case "A":
//       switch (command) {
//         case "west":
//           currentRoom = "B";
//           describeRoom();
//           break;
//         case "north":
//           if (hasKey) {
//             currentRoom = "C";
//             console.info(
//               "You unlock the north door with the key and go through the door."
//             );
//             describeRoom();
//             break;
//           } else {
//             console.error("You try to open the north door, but it is locked.");
//           }
//         default:
//           console.error("Unrecognized command.");
//           break;
//       }
//       break;

//     case "B":
//       switch (command) {
//         case "east":
//           currentRoom = "A";
//           describeRoom();
//           break;
//         case "take key":
//           if (hasKey) {
//             console.error("You already have the key.");
//           } else {
//             console.info("You take the key from the table.");
//             hasKey = true;
//           }
//           break;
//         default:
//           console.error("Unrecognized command.");
//           break;
//       }
//       break;

//     case "C":
//       switch (command) {
//         case "south":
//           currentRoom = "A";
//           describeRoom();
//           break;
//         case "east":
//           if (windowOpen) {
//             currentRoom = "Exit";
//             console.info("You step out from the open window.");
//           } else {
//             console.error("The window is closed.");
//           }
//           break;
//         case "open window":
//           if (windowOpen) {
//             console.error("The window is already open.");
//           } else {
//             console.info("You open the window.");
//             windowOpen = true;
//           }
//           break;
//         default:
//           console.error("Unrecognized command.");
//           break;
//       }
//       break;
//   }
// }

// export function play(): void {
//   console.info(
//     "Welcome to the text adventure! Open your browser's developer console to play."
//   );

//   const playerName = promptInput("Please enter your name");

//   console.info("Hello, " + playerName + ".");

//   console.info("You are in a building. Your goal is to exit this building.");
//   describeRoom();

//   while (currentRoom != "Exit") {
//     let command = promptInput("Please enter a command");

//     doCommand(command);
//   }

//   console.info("You have exited the building. You win!");
//   console.info("Congratulations, " + playerName + "!");
// }
