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

const Player = (name, display) => {
    let score = 0
    const movesArr = []

    const getDisplay = () => display;
    const getName  = () => name;
    const updateMove = (move) => {
      // update moves array
        console.log('updating moves array')
        movesArr.push(move)
        return movesArr
    };
    const updateScore = () => {
        ++score
        console.log(score)
        return score
    };
    return {getName, getDisplay, updateScore, updateMove};
};

const player1 = Player('player1', 'x');
const computer = Player('computer', 'o');
let continueGame = true


function displayGame(e, player) {

    let tileLocation = e.target
    if (tileLocation.innerText === "") {

        //how to determine whose move it is computer vs player?
        tileLocation.innerText = player.getDisplay()
        tileLocation.classList.add('displayMove')

        let currentMove = e.target.classList[1].match(/\d+/g)[0]
        console.log(currentMove)

        // add current move to the moves list
        const movesArr = player.updateMove(parseInt(currentMove))
        console.log(movesArr)

        // determine if winning move
        const win = evaluateWin(player, movesArr)

        if (movesArr.length >= 5 && !win) {
            console.log("it's a tie")
            continueGame = false
            return false
        }

        return true

    } else {
        console.log('move already taken. Try again!')
        return false
    }
}


function evaluateWin(player, movesArr) {
    console.log('evaluate if move in winning combo')

    for (let winningMove of winningCombo) {
        let i = 0
        for (let playerMove of movesArr) {
            if (!winningMove.includes(playerMove)) {
                break
            } else {
                i++
            } 
            if (i >=3) {
                console.log('winning move found')
                continueGame = false;
                userscore = player.updateScore()
                console.log('winner is: ' + player.getName() + ', with score:' + userscore)
                return true
            }
        }
    }
}

function playGame(player) {

    let gameTiles = document.querySelectorAll('.btnMove');
    gameTiles.forEach(tile => tile.addEventListener('click', (e) => {

        //tie event, if one player has 5 moves and game is not over
        if (!continueGame) {
            console.log('game over')
        }
        else if (player.getName() === 'player1') {
            console.log('player1s turn')

            //if displaygame returns true (valid move), then next player's turn
            if (displayGame(e, player1)) {
                player = computer
            }

        } else {
            console.log('computers turn')
            if (displayGame(e, computer)) {
                player = player1
            }
        }
    }))

}

playGame(player1)


