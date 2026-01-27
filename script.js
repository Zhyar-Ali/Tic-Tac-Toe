function gameBoard(pick,mark){
    const gameboardArray = [["_","_","_"],
                            ["_","_","_"],
                            ["_","_","_"]];

    const gameboardUpdate = () => { 
        if (gameboardArray [pick[0]][pick[1]] === "_"){
            gameboardArray [pick[0]][pick[1]] = mark;
        }
    };

    const getGameboardArray = () => gameboardArray.forEach(inner => {
        console.log(inner);
    });
    ;

    return {gameboardUpdate, getGameboardArray};
}

function players(name, mark){
    const score = 0;

    const getScore = () => score;
    const addScore = () => {score++;};

    return { name, mark, getScore, addScore};
}

const gameFlow = (function (){
    const player = (name, mark) => players(name,mark);
    const gameBoardd = (pick,mark) => gameBoard(pick,mark);

    return {player, gameBoard};

})();

const player1 = gameFlow.player('A','x');
const player2 = gameFlow.player('B','o');
const gameBoardd = gameFlow.gameBoard([0,1],player1.mark);
gameBoardd.gameboardUpdate();
gameBoardd.getGameboardArray();

