const winningCombo = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7], 
    [2,5,8], 
    [3,6,9], 
    [1,5,9], 
    [3,5,7]
]

const Player = (playerName, display) => {
    let score = 0
    const movesArr = []

    const getDisplay = () => display;
    const updateName  = (name) => { 
        playerName = name.charAt(0).toUpperCase() + name.slice(1)
        return playerName
        };

    const getName = () => {
        return playerName
    }
    const updateMove = (move) => {
      // update moves array
        console.log('updating moves array')
        movesArr.push(move)
        return movesArr
    }
    const reset = () => {
        movesArr.splice(0, movesArr.length);
        console.log(movesArr)
    }
    const updateScore = () => {
        ++score
        return score
    }
    const getScore = () => {
        return score
    }
    return {getName, getDisplay, updateScore, updateMove, reset, getName, updateName, getScore};
};

const player1 = Player('Player1', 'x');
const computer = Player('Computer', 'o');

let round = 1
let continueGame = true
let startBtn = document.querySelector('.startBtn');
let gameTiles = document.querySelectorAll('.btnMove');
gameTiles.forEach(tile => {
    tile.disabled = true;
    tile.addEventListener('click', playGame);
});


startBtn.addEventListener('click', () => {
    console.log('new game')
    resetBoard()
    let playerName = document.querySelector('.playerName').value
    player1.updateName(playerName)
    document.querySelector('#gameMsg').innerText = 'Alright ' + player1.getName() + ", what's your move?"
    gameTiles.forEach(tile => tile.disabled = false);

})

function displayGame(e, player) {

    let tileLocation = e.target
    if (tileLocation.innerText === "") {

        tileLocation.innerText = player.getDisplay()
        tileLocation.classList.add('displayMove')

        let currentMove = e.target.classList[1].match(/\d+/g)[0]

        // add current move to the moves list
        const movesArr = player.updateMove(parseInt(currentMove))

        // determine if winning move
        const win = evaluateWin(player, movesArr)

        if (movesArr.length >= 5 && !win) {
            document.querySelector('#gameMsg').innerText = "It's a Tie! Press Start to Play Again"
            console.log("it's a tie")
            continueGame = false
            gameOver()
            return;
        }

        return true

    } else {
        console.log(tileLocation.innerText)
        document.querySelector('#gameMsg').innerText = "Move already taken. Try again!"
        return false
    }
}


function evaluateWin(player, movesArr) {
    console.log('evaluate if move in winning combo')

    for (let winningMove of winningCombo) {
        let i = 0
        for (let playerMove of movesArr) {
            if (winningMove.includes(playerMove)) {
                ++i
            } 

            if (i >=3) {
                console.log('winning move found')
                continueGame = false;
                userscore = player.updateScore()
                console.log('winner is: ' + player.getName() + ', with score:' + userscore)
                document.querySelector('#gameMsg').innerText = 'Game Over! Winner is: ' + player.getName()
                gameOver()
                return true
            }
        }
    }
}


function gameOver() {
    console.log('game over')
    console.log(player1.getScore(), computer.getScore())
    gameTiles.forEach(tile => tile.disabled = true);
}


function playGame(e) {
    console.log("round: "+round)
    console.log(e)
    console.log('btnMove clicked')

    //button seems to be clicked multiple times based on the number of times i "restart" may be accidently creating additional loops within?
    if (!continueGame) {
        gameOver()
        return;

    } else {

        if (round % 2 === 1) {
            //differentiate whose turn it is
            console.log('player1s turn')
            //if displaygame returns true (valid move), then next player/computers turn
            if (displayGame(e, player1) && continueGame) {
                round++

                document.querySelector('#gameMsg').innerText = computer.getName() + "'s Turn"
            } 

        } else if (round % 2 === 0) {
            console.log('computers turn')

            if (displayGame(e, computer) === true && continueGame) {
                round++
                //hand over to player 1
                document.querySelector('#gameMsg').innerText = player1.getName() + "'s Turn"
            }
        }
    }
}

function resetBoard() {
    gameTiles.forEach(tile => {
        tile.innerText = "";
        tile.classList.remove('displayMove');
        tile.disabled = false
    })

    player1.reset()
    computer.reset()
    continueGame = true
    round = 1
}




// gameTiles.forEach(tile => tile.removeEventListener('click', gameFunction))