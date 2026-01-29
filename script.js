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

    const getGameboard = () => board.forEach(element => console.log(element));

    const resetBoard = () => { 
        for (let i=0; i<board.length;i++){
            for (let j=0; j<board[i].length;j++){
                board[i][j] = "_";
            }
        }
    };

    const reset = (inputPlayer) => {
        inputPlayer.resetScore();
        gameFlow.resetBoard();
    };

    const winner = (p1,p2) => winCon(p1,p2, board);

    const newMatch = (win) => {
        win.addScoreToWinner();
        gameFlow.resetBoard();
    };

    return { player, gameboardUpdate,getGameboard, resetBoard, reset, winner, newMatch };

})();

const player = gameFlow.player("zhyar","x");
const player2 = gameFlow.player("wa","o");
const win = gameFlow.winner(player,player2);

gameFlow.gameboardUpdate([0,0],player.mark);
gameFlow.gameboardUpdate([1,1],player.mark);
gameFlow.gameboardUpdate([2,2],player.mark);


gameFlow.getGameboard();

win.check();
console.log(win.getWinner());
gameFlow.newMatch(win);
gameFlow.getGameboard();
console.log(player.getScore());
console.log(player2.getScore());







