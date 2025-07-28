//your JS code here. If required.
const submit=document.getElementById("submit");
const message=document.getElementsByClassName(".message");
//const reset=document.getElementById("reset");
const board=document.getElementsByClassName(".board");
const cells = document.querySelectorAll(".cell");

let players=["",""];
let turn=0;
let boardState=Array(9).fill(null);
const wins=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

submit.addEventListener("click",startGame);

function startGame(){
    const p1=document.getElementById("player-1").value.trim();
    const p2=document.getElementById("player-2").value.trim();

    if(!p1 || !p2){
        alert("Please enter both names");
        return;
    }

    players=[p1,p2];
    document.querySelector(".setup").style.display="none";
    document.querySelector(".message").style.display="block";
    console.log(message.value);
    //document.querySelector(".scoreboard").style.display='flex';
    //document.querySelector("reset").style.display="inline-block";
    document.querySelector(".board").style.display="grid";
    message.innerText=`${players[turn]} you are up`;
    //board.style.display="grid";

    renderBoard();
}

function renderBoard(){
    boardState.fill(null);
  turn = 0;
  cells.forEach((cell, index) => {
    cell.innerText = "";
    cell.classList.remove("winner", "disabled");
    cell.addEventListener("click", handleMove, { once: true });
  });
}
function handleMove(e){
    const id = parseInt(e.target.id) - 1;
    if (boardState[id] !== null) return;

    const mark= turn === 0 ? 'X' : 'O';
    boardState[id-1] =mark;
    e.target.innerText=mark;
    e.target.classList.add('disabled');
    const winningLine=wins.find(line=>line.every(i=>boardState[i]===mark));
    if(winningLine){
        winningLine.forEach(i=>{
            document.getElementById((i+1).toString()).classList.add("winner");
        })
        message.innerTeat=`${players[turn]} congratulations! you are the winner`;
        return;
    }
    turn = 1-turn;
    updateMessage();
}
function updateMessage(){
    message.innerText=`${players[turn]} you are up`
}