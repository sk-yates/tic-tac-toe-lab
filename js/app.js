//* file://wsl.localhost/Ubuntu/home/sk-yates/code/ga/labs/tic-tac-toe-lab/tic-tac-toe-lab/index.html


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], // top row winCombo
    [3, 4, 5], // middle row winCombo
    [6, 7, 8], // bottom row winCombo
    [0, 3, 6], // left column winCombo
    [1, 4, 7], // middle column winCombo
    [2, 5, 8], // right column winCombo
    [0, 4, 8], // diag t-left => b-right winCombo
    [2, 4, 6], // diag t-right => b-left winCombo
];

// board = [
//     "0", "1", "2",
//     "3", "4", "5", 
//     "6", "7", "8"



/*---------------------------- Variables (state) ----------------------------*/


let board = [     // board array - with empty strings to be editted later.
    "", "", "",
    "", "", "", 
    "", "", ""
];


let turn = "x";


let winner = false;


let tie = false;


/*------------------------ Cached Element References ------------------------*/


const squareEls = document.querySelectorAll(".sqr");
console.log(squareEls);


let messageEl = document.querySelector("#message");
console.log(messageEl);


const resetButtonEl = document.querySelector("#reset");


/*-------------------------------- Functions --------------------------------*/


const switchPlayer = () => {
    if (winner === true) {
        return;
    } else if (turn === "x") {
        turn = "o";
    } else {
        turn = "x";
    }
};

const updateBoard = () => {
    board.forEach((square, index) => {
        if (square === "x") {
            squareEls[index].textContent = "x";
        } else if (square === "o") {
            squareEls[index].textContent = "o";
        } else {
            squareEls[index].textContent = "";
        }
    });
};


const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's ${turn}'s turn...`;
        console.log(`It's ${turn}'s turn...`)
    } else if (winner === false && tie === true) {
        messageEl.textContent = "You're tied!"
    } else {
        messageEl.textContent = `${turn} is the winner!`;
    }
};


const render = () => {
    updateBoard();
    updateMessage();
}; 


const placePiece = (index) => {
    board[index] = turn;
    console.log(board);
};

const checkForWinner = () => {
    winningCombos.forEach(winCombo => {
        const [a, b, c] = winCombo;
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
        }
    });
};


const checkForTie = () => {
    if (winner === true) {
        return
    } else if (board.includes("")) {
        return
    } else {
        tie = true;
    }
};


const handleClick = (event) => {
    const squareIndex = parseInt(event.target.id);
    console.log(squareIndex);
    if (board[squareIndex] !== "" || winner === true) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    console.log(winner);
    checkForTie();
    console.log(tie);
    switchPlayer();
    console.log(turn);
    render();
};


const init = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "x";
    winner = false;
    tie = false;
    render();
};


init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
    square.addEventListener("click", handleClick);
});

resetButtonEl.addEventListener("click", init);
