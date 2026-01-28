function gameBoardObject(){
    let gameboardArray = [["_","_","_"],
                            ["_","_","_"],
                            ["_","_","_"]];

    return { gameboardArray };
}

function playersObject(name, mark){
    let score = 3;

    const getScore = () => score;
    const addScore = () => {score++;};
    const resetScore = () => {score = 0};

    return { name, mark, getScore, addScore, resetScore };
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

    //win/tie condition function
    
    const newMatch = () => { 
        for (let i=0; i<board.length;i++){
            for (let j=0; j<board[i].length;j++){
                board[i][j] = "_";
            }
        }
    };

    const reset = (inputPlayer) => {
        inputPlayer.resetScore();
        gameFlow.newMatch();
    };

    return {player, gameboardUpdate,getGameboard, newMatch, reset};

})();

const player = gameFlow.player("zhyar","x");
gameFlow.gameboardUpdate([0,1],player.mark);
gameFlow.getGameboard();
gameFlow.reset(player);
gameFlow.getGameboard();

