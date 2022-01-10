//gameBoard is a module method, because it is created once
//the gameBoard exists behind the scenes, it just stores the values
// and stores the functions to edit those values

const gameBoard = (() => {

    //create the board array
    const board = Array(9);
    let rounds = 0;

    //set a square's contents
    const setSquare = (i,symbol) => {
        if(board[i]==""){
        board[i] = symbol;
        if(checkWin()){
            return 0;
        }
        else{
            gameController.switchPlayer();
        }
        return `${i} to ${symbol}`;
        }
        else{
            return "not ok";
        }
    };
    //return a square's contents
    const getSquare = (i) => {
        return board[i];
    };
    //resets gameboard array to blanks
    const reset = () => {
        for(i=0; i<board.length; i++){
            board[i] = "";
        };
        rounds = 0;
    };
    //checks for a winner
    const checkWin = () => {
        let winner = false;

        let winConditions = [
            [0,1,2], //across
            [3,4,5],
            [6,7,8],
            [0,3,6], //down
            [1,4,7],
            [2,5,8],
            [0,4,8], //diagonal
            [2,4,6]
        ]

        winConditions.forEach(function(array){

            if (board[array[0]] != "" && board[array[0]] === board[array[1]] && board[array[0]] === board[array[2]]){
                let winIndex = winConditions.indexOf(array);//checks which win condition happened
                gameController.winState(gameController.getPlayer(),array,winIndex); //send win info to gameController
                winner = true;
            }
            
        });
        rounds++
        if(rounds == 9 && winner == false){
            gameController.winState("Nobody",[0,1,2,3,4,5,6,7,8]);
            winner = true;
        }
        return winner;

    };

    return{setSquare, getSquare, reset, checkWin, board, rounds }

})();

//Gameplay object, because the instructions said so. IDK what it is yet
const gameController = (() =>{

    let player = true;

    //set player's turn
    const switchPlayer = () =>{
        player = !player;
        displayController.setMessage(`${gameController.getPlayer()}'s turn`);
        return player;
    };

    //get current player true = X false = O
    const getPlayer = () => {
        return player ?  player1.getName() :  player2.getName();
    }
    //get current player's symbol
    const getSymbol = () => {
        return player ? player1.getSymbol() : player2.getSymbol();
    }

    //call this when a round ends
    const winState = (winner,squares,winIndex) => {
        displayController.setMessage(`${winner} wins!`);
        displayController.colorSquares(squares);
        displayController.unclickable();
        displayController.winLine(winIndex);
        
        return winner;
    }

    //restarts, maybe increment round

    return{switchPlayer, getPlayer, getSymbol, winState} //gameController

})();

//displayController is a module to control what is displayed
const displayController = (() => {

    const round = document.getElementById("round");
    const message = document.getElementById("message");
    const displayP1 = document.getElementById("p1-name");
    const displayP2 = document.getElementById("p2-name");

    let winDisplay = document.getElementById("win-display");

    const restartButton = document.getElementById("restart-button")
    restartButton.textContent = "rematch";

    restartButton.addEventListener('click', () => {
        gameBoard.reset();
        displayController.reset();
        restartButton.style.display = "none";
    });

    //get all squares, and add click event to them
    const squares = document.querySelectorAll('.square');

    function clicker (element){
            gameBoard.setSquare(element.target.dataset.index,gameController.getSymbol())
            displayController.Update();
        }

    const clickable = (element) => {
        squares.forEach((element) =>
            element.addEventListener("click", clicker)
        );
    }

    const unclickable = () => {
        squares.forEach((element) =>
            element.removeEventListener("click", clicker)
        );
    }

    const setName = () => {
        if(player1.getName() == "X"){
            //display.P1.style.display = "none";
            return;
        }
        else{displayP1.textContent = player1.getName();}

        if(player2.getName() == "O"){
            return;
        }
        else{displayP2.textContent = player2.getName();  }

    };

    const setMessage = (input) => {
        message.textContent = input;
    }

    const Update = () => {
        //update square contents
        for(i=0;i<squares.length;i++){
            squares[i].textContent = gameBoard.getSquare(i);
        }
    }

    const colorSquares = (array) => {
        //color the squares from winstate
        array.forEach(element => squares[element].style.backgroundColor = "var(--mylightgreen)");
        restartButton.style.display = "inline";
        displayController.unclickable();
    }
    
    const reset = () =>{
        //reset square colors
        for(i=0;i<squares.length;i++){
            squares[i].style.backgroundColor = "var(--bgcolor2)";
        }
        //move win display back, erase win line. 
        winDisplay.style.zIndex = "-1";
        let winLines = document.querySelectorAll(".win-line");
        winLines.forEach((element) => {element.style.display = "none"} );

        //switch players, make squares clickable, update display of gameboard array
        gameController.switchPlayer();
        clickable();
        Update();
    }

    const winLine = (winIndex) => {
        winDisplay.style.zIndex = "1";
        let winLine = document.getElementById(`win${winIndex}`);
        winLine.style.display = "inline";

    }

    return {setName, Update, setMessage, colorSquares, reset, clickable, unclickable, winLine};//, squares, message, round, displayP1, displayP2}; //displayController

})();

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

//starts game

startButton = document.getElementById("start-button");
startButton.textContent = "GO!";

nameInput = document.querySelectorAll(".name-input");
nameInput[0].value="";
nameInput[1].value="";
let player1 = playerFactory("Player 1","X");
let player2 = playerFactory("Player 2","O");

startButton.addEventListener("click",() => {
    displayController.clickable();
    startButton.style.display = "none";
    if(nameInput[0].value==""){
        nameInput[0].value = "X";
    }
    if(nameInput[1].value==""){
        nameInput[1].value = "O";
    }
    player1 = playerFactory(nameInput[0].value,"X");
    player2 = playerFactory(nameInput[1].value,"O");
    displayController.setMessage(`${gameController.getPlayer()}'s turn`);
    nameInput[0].style.display = "none";
    nameInput[1].style.display = "none";
    displayController.setName();
    gameBoard.reset();
})


// // Optional - If you’re feeling ambitious create an AI so that a player can 
// // play against the computer!
// // Start by just getting the computer to make a random legal move.
// // Once you’ve gotten that, work on making the computer smart. 

// // It is possible to create an unbeatable 
// // AI using the minimax algorithm (read about it here, some googling will help you 
// // out with this one)
// // If you get this running definitely come show it off in the chatroom. 
// // It’s quite an accomplishment!
