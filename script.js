let xLoc = []
let oLoc = []
let playCounter = 0
const gameBoard = (() => {
    let topLane = ['','','']
    let midLane = ['','','']
    let botLane = ['','','']
    return {topLane, midLane, botLane}
  })();
const displayController = (() => {
    const topLeft = document.getElementById('1')
    const topMiddle = document.getElementById('2')
    const topRight = document.getElementById('3')
    const midLeft = document.getElementById('4')
    const midMiddle = document.getElementById('5')
    const midRight = document.getElementById('6')
    const botLeft = document.getElementById('7')
    const botMiddle = document.getElementById('8')
    const botRight = document.getElementById('9')
    return {topLeft,topMiddle,topRight,midLeft,midMiddle,midRight,botLeft,botMiddle,botRight}
})();

const playerFactory = (name, isX) => {
    const placeMarker = function(){
        if(isX == true && this.innerHTML == ''){
            this.innerHTML = 'X'
            if(this.id == 1 || this.id == 2 || this.id == 3){
                gameBoard.topLane[this.id-1] = 'x'
                xLoc.push(this.id)
                const box = document.querySelectorAll('.cell');
                [].forEach.call(box,function(el){
                    el.removeEventListener('click', player.placeMarker)
                    el.addEventListener('click', player2.placeMarker)
                });
            }
            else if(this.id == 4 || this.id == 5 || this.id == 6){
                xLoc.push(this.id)
                gameBoard.midLane[this.id-4] = 'x'
                const box = document.querySelectorAll('.cell');
                [].forEach.call(box,function(el){
                    el.removeEventListener('click', player.placeMarker)
                    el.addEventListener('click', player2.placeMarker)
                });
            }
            else{
                xLoc.push(this.id)
                gameBoard.botLane[this.id-7] = 'x'
                const box = document.querySelectorAll('.cell');
                [].forEach.call(box,function(el){
                    el.removeEventListener('click', player.placeMarker)
                    el.addEventListener('click', player2.placeMarker)
                });
            }
            checkWin()
        }
        else if(isX == false && this.innerHTML == ''){
            this.innerHTML = 'O'
            if(this.id == 1 || this.id == 2 || this.id == 3){
                oLoc.push(this.id)
                gameBoard.topLane[this.id-1] = 'o'
                const box = document.querySelectorAll('.cell');
                [].forEach.call(box,function(el){
                    el.removeEventListener('click', player2.placeMarker)
                    el.addEventListener('click', player.placeMarker)
                });
            }
            else if(this.id == 4 || this.id == 5 || this.id == 6){
                oLoc.push(this.id)
                gameBoard.midLane[this.id-4] = 'o'
                const box = document.querySelectorAll('.cell');
                [].forEach.call(box,function(el){
                    el.removeEventListener('click', player2.placeMarker)
                    el.addEventListener('click', player.placeMarker)
                });
            }
            else{
                oLoc.push(this.id)
                gameBoard.botLane[this.id-7] = 'o'
                const box = document.querySelectorAll('.cell');
                [].forEach.call(box,function(el){
                    el.removeEventListener('click', player2.placeMarker)
                    el.addEventListener('click', player.placeMarker)
                });
            }
            checkWin()
        }
    }
    return { name, isX, placeMarker };
  };

let player = playerFactory(prompt('Name?'), 1)
let player2 = playerFactory(prompt('Name?'), 0)

function renderBoard(){
    displayController.topLeft.innerHTML = gameBoard.topLane[0]
    displayController.topMiddle.innerHTML = gameBoard.topLane[1]
    displayController.topRight.innerHTML = gameBoard.topLane[2]
    displayController.midLeft.innerHTML = gameBoard.midLane[0]
    displayController.midMiddle.innerHTML = gameBoard.midLane[1]
    displayController.midRight.innerHTML = gameBoard.midLane[2]
    displayController.botLeft.innerHTML = gameBoard.botLane[0]
    displayController.botMiddle.innerHTML = gameBoard.botLane[1]
    displayController.botRight.innerHTML = gameBoard.botLane[2]
    const box = document.querySelectorAll('.cell');
    [].forEach.call(box,function(el){
        el.addEventListener('click', player.placeMarker)
    });
}
function checkWin(){
    console.log('checking')
    const winningMoves = 
    [["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]];
    winningMoves.forEach(ch => {
        const countX = [];
        const countO = [];
            ch.forEach(num => {
                if(xLoc.includes(num)) {
                    countX.push(num)
                    if(countX.length === 3) {
                        document.getElementById(countX[0]).classList.add('winBlocks')
                        document.getElementById(countX[1]).classList.add('winBlocks')
                        document.getElementById(countX[2]).classList.add('winBlocks')
                        alert("X Wins!")
                    }
                }
                else if(oLoc.includes(num)) {
                    countO.push(num)
                    if(countO.length === 3) {
                        document.getElementById(countO[0]).classList.add('winBlocks')
                        document.getElementById(countO[1]).classList.add('winBlocks')
                        document.getElementById(countO[2]).classList.add('winBlocks')
                        alert("O Wins!")
                    }
                }
                else if(playCounter == 9){
                    alert('stalemate')
                }
    })
})
}
function checkX(element){
    if(element == "x"){
        return true
    }
    return false
}
function checkO(element){
    if(element == "o"){
        return true
    }
    return false
}
renderBoard()