function gameBoardObject(){
    const gameboardArray = [["_","_","_"],
                            ["_","_","_"],
                            ["_","_","_"]];

    return { gameboardArray };
}

function playersObject(name, mark){
    let score = 0;

    const getScore = () => score;
    const addScore = () => {score++;};

    return { name, mark, getScore, addScore };
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

    //win/tie condition function && new match/reset function then move onto DOM

    return {player, gameBoard, gameboardUpdate,getGameboard};

})();

const player = gameFlow.player("zhyar","x");
const gameBoard = gameFlow.gameBoard();
gameFlow.gameboardUpdate([0,1],player.mark);
gameFlow.getGameboard();
