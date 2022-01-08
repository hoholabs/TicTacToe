//Starting All Over

//gameBoard is a module method, because it is created once

const gameBoard = (() => {

    const board = Array(9);

    const setSquare = (i,symbol) => {
        board[i] = symbol;
        return `${i} to ${symbol}`;
    };

    const getSquare = (i) => {
        return board[i];
    };

    const reset = () => {
        for(i=0; i<board.length; i++){
            board[i] = "";
            //setSquare(i,"");
        };

    };

    return{setSquare, getSquare, reset}

})();

gameBoard.reset();

//Gameplay object, because the instructions said so. IDK what it is yet

const gameController = "";

//displayController is a module I guess? For the messages/round/wins etc.

const displayController = "";

//Players is a factory function because it gets reused

const playerFactory = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;

    const getName = () =>{
        return name;
    }

    const getSymbol = () => {
        return symbol;
      };

    return {getSymbol,getName};
}

//creates 2 players
const player1 = playerFactory("johnny","X");
const player2 = playerFactory("cherry","O");

//Check win















//OLD CODE VVV

// // Set up your project with a HTML, CSS and Javascript files and get the 
// //Git repo all set up.
// //DONE

// // You’re going to store the gameboard as an array inside of a Gameboard object, 
// //so start there! 
// //I should do this as a module pattern

// const gameboard = {board:[ " ", " ", " ", " ", " ", " ", " ", " ", " "]}

// const gameBoard2 = (() => {
//     const board = ["", "", "", "", "", "", "", "", ""];

//     const setField = (index, sign) => {
//         if (index > board.length) return;
//         board[index] = sign;
//         console.log("K");
//         updateGameboard();
//       };
//     return {setField};

// })();
  

// let squares = document.getElementsByClassName("square");

// //add click event listener to each square which 
// //changes the board array entry to X and updated the gameboard
// //DONE

// for(let i = 0; i < squares.length; i++){

//     squares[i].addEventListener("click", function() {

//         if(gameboard.board[i]==" "){
//         //gameboard.board[i] = currentPlayer.Symbol;
//         gameBoard2.setField(i, currentPlayer.Symbol);
//         updateGameboard();
//         //checkWinner();
//         switchPlayer();
//         }
//         });

// }

// function updateGameboard(){

//     for(let i=0 ; i<gameboard.board.length ; i++) {
//         //let squares = document.getElementsByClassName("square");
//         //console.log(squares);
//         //console.log(squares[0]);
//         //console.log(i);
//         //console.log(squares[i]);
//         squares[i].textContent = gameboard.board[i];
//         //console.log(squares[i].textContent);

//         //put check here to see if someone won

//     }
//     return "updated";
// }

// updateGameboard();


// // Your players are also going to be stored in objects… and you’re 
// // probably going to want an object 
// // to control the flow of the game itself.

// // Your main goal here is to have as little global code as possible. 
// // Try tucking everything away inside of a module or factory. 

// // Rule of thumb: if you only ever need ONE of something 
// // (gameBoard, displayController), use a module. 


// // If you need multiples of something (players!), create them with factories.

// const Player = (playerName, Symbol) => {

//     return {playerName, Symbol};

// }

// const playerOne = Player("Player1","X");
// const playerTwo = Player("Player2","O");

// let currentPlayer = playerOne;

// function switchPlayer(){
//     if(currentPlayer == playerOne){
//         currentPlayer = playerTwo;
//         console.log(`from 1 to 2`)
//     }
//     else{currentPlayer == playerTwo
//         currentPlayer = playerOne;
//         console.log(`from 2 to 1`)
//     }
//     console.log(currentPlayer);
// }

// // Set up your HTML and write a JavaScript function that will render the contents of the 
// // gameboard array to the webpage (for now you can just manually fill 
// // in the array with "X"s and "O"s)
// //DONE

// // Build the functions that allow players to add marks to a specific spot on the board, 
// // and then tie 
// // it to the DOM, letting players click on the gameboard to place their marker. 
// //DONE

// // Don’t forget the logic that keeps players from playing in spots that are already taken!
// //DONE

// // Think carefully about where each bit of logic should reside. 
// // Each little piece of functionality should be able to fit in the game, 
// // player or gameboard objects.. 
// // but take care to put them in “logical” places. 
// // Spending a little time brainstorming here can make your life much easier later!
// // !!!!! NOT DONE IDK what logic I"m supposed to be using here... doing everything
// //without modules or factory functions for now I guess??


// // Build the logic that checks for when the game is over! Should check for 
// // 3-in-a-row and a tie.

// // Clean up the interface to allow players to put in their names, 
// // include a button to start/restart 
// // the game and add a display element that congratulates the winning player!

// // Optional - If you’re feeling ambitious create an AI so that a player can 
// // play against the computer!
// // Start by just getting the computer to make a random legal move.
// // Once you’ve gotten that, work on making the computer smart. 

// // It is possible to create an unbeatable 
// // AI using the minimax algorithm (read about it here, some googling will help you 
// // out with this one)
// // If you get this running definitely come show it off in the chatroom. 
// // It’s quite an accomplishment!
