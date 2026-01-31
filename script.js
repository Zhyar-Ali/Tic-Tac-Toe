function gameBoardObject(){
    let gameboardArray = [["_","_","_"],
                          ["_","_","_"],
                          ["_","_","_"]];

    return { gameboardArray };
}

function playersObject(name, mark){
    let score = 0;

    const getScore = () => score;
    const addScore = () => {score++;};
    const resetScore = () => {score = 0};

    return { name, mark, getScore, addScore, resetScore };
}

function winCon(p1,p2,board){
    let winner = "";
    let result = [];

    function checkResult(){
        if (result.every(item => item === p1.mark)){
            winner = p1.name;
        }else if (result.every(item => item === p2.mark)){
            winner = p2.name;
        }else{
            result.length = 0;
        }
    }

    function checkWinner(){
        if (winner === ""){
            return false;
        }else {
            return true;
        }
    }

    const check = () => {

        while (true){
            for (let i = 0; i< board.length; i++){
                result.push(board[i][i]);
            }

            checkResult();
            if (checkWinner()){
                break;
            }

            for (let i = 0; i < board.length; i++){
                result.push(board[i][2-i]);
            }
            
            checkResult();
            if (checkWinner()){
                break;
            }

            for (let i = 0; i < board.length; i++){
                for(let j=0; j < board[i].length; j++){
                    result.push(board[i][j]);
                }
                checkResult();
                if (checkWinner()){
                    break;
                }
            }

            if (checkWinner() === false){
                winner = "tie";
                break;
            }
        }
    };

    const getWinner = () => winner;

    const addScoreToWinner = () => {
        if(winner === p1.name){
            p1.addScore();
        }else if(winner === p2.name){
            p2.addScore();
        }
    };

    return { winner, check, result, getWinner, addScoreToWinner };
}

const gameFlow = (function (){

    const board = gameBoardObject().gameboardArray;
    const player = (name, mark) => playersObject(name,mark);

    const gameboardUpdate = (pos,mark) => {
            if (board[pos[0]][pos[1]] === "_"){
                board[pos[0]][pos[1]] = mark;
            }
    }

    const gameBoard = () => board;

    const getGameboard = () => board.forEach(element => console.log(element));

    const resetBoard = () => { 
        for (let i=0; i<board.length;i++){
            for (let j=0; j<board[i].length;j++){
                board[i][j] = "_";
            }
        }
    };

    const reset = (p1,p2) => {
        p1.resetScore();
        p2.resetScore();
        gameFlow.resetBoard();
    };

    const winner = (p1,p2) => winCon(p1,p2, board);

    const newMatch = (win) => {
        win.addScoreToWinner();
        gameFlow.resetBoard();
    };

    return { player, gameboardUpdate,getGameboard, resetBoard, reset, winner, newMatch, gameBoard };

})();

// const win = gameFlow.winner(player,player2);

// win.check();
// console.log(win.getWinner());
// gameFlow.newMatch(win);
// gameFlow.getGameboard();
// console.log(player.getScore());
// console.log(player2.getScore());

const dom = (function() {

    const board = gameFlow.gameBoard();
    const grid = document.querySelector(".gridLayout");

    const submitButtonOne = document.getElementById("submitOne");
    const submitButtonTwo = document.getElementById("submitTwo");

    let p1 = gameFlow.player("","");
    let p2 = gameFlow.player("","");

    function submitClickOne (event){
        event.preventDefault();
        const name = document.getElementById("playerOneName").value;
        const mark = document.getElementById("playerOneMark").value;
        p1 = gameFlow.player(name,mark);
    }

    function submitClickTwo (event){
        event.preventDefault();
        const name = document.getElementById("playerTwoName").value;
        const mark= document.getElementById("playerTwoMark").value;
        p2 = gameFlow.player(name,mark);
    }

    const createDiv = () => {
        for (let i=0; i<board.length; i++){
            for (let j=0; j<board[i].length; j++){
                const div = document.createElement("div");
                div.classList.add("box");
                div.id = `${i},${j}`;
                div.textContent = board[i][j];
                grid.appendChild(div);         
            }
        }
    };

    const clickEvent = () => {
        submitButtonOne.addEventListener("click", submitClickOne);
        submitButtonTwo.addEventListener("click", submitClickTwo);
    };


    let turn = 1;
    const updateBoard = () => {
        for (let i=0; i<grid.children.length;i++){
            let arr = grid.children[i].id.split(",");
            grid.children[i].addEventListener("click", () => {
                if (turn === 1){
                    gameFlow.gameboardUpdate(arr,p1.mark);
                    grid.children[i].textContent = board[arr[0]][arr[1]];
                    turn = 2;
                }else if (turn === 2){
                    gameFlow.gameboardUpdate(arr,p2.mark);
                    grid.children[i].textContent = board[arr[0]][arr[1]];
                    turn = 1;
                }
                
            });
        }
    };

    return { createDiv, clickEvent,updateBoard};

})();

dom.createDiv();
dom.clickEvent();
dom.updateBoard();
