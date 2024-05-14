function Gameboard() {
  const board = [];
  for (let i = 0; i < 3; i++){
    board[i] = [];
    for(let j = 0; j < 3; j++){
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
  const showBoard = () => {
    const filledBoard = board.map((row => row.map((cell) => cell.getMarker())))
    console.log(filledBoard);
  }
  
  const addMarker = (marker, row, column) => {
    board[row][column].placeMarker(marker); 
    showBoard();
  }

  return{showBoard, addMarker, getBoard};
}

function Cell () {
  let value = ' ';
  const placeMarker = (marker) => value = marker;
  const getMarker = () => value;
  return {getMarker,placeMarker};
}


function PlayHandler() {
  // update these to fetch player names
  const playerOneName = 'P1';
  const playerTwoName = 'P2';
  const players = [
    {
      name: playerOneName,
      marker: 'X'
    },
    {
      name: playerTwoName,
      marker: 'O'
    }
  ]
  let activePlayer = players[0];

  const board = Gameboard();
  const initialize = board.showBoard;

  const placeMarker = (row,column) => {
    board.addMarker(activePlayer.marker, row, column)
    checkWinner();
    activePlayer = activePlayer === players[0] ? players[1]:players[0];
  }

  const checkWinner = () =>{
    // returns array of concatenated rows eg OXX,X X,  X
    const rows = board.getBoard().map((row => row.map((cell) => cell.getMarker()).join('')))
    // console.log(rows);
    const columns = [];
      for(let i = 0; i < 3; i++){
        columns[i] = (board.getBoard().map((row) => row[i].getMarker()).join(''));
      
      }
    const diagonals = ["",""];
    for (let i = 0;i < 3; i++){
      diagonals[0] += board.getBoard()[i][i].getMarker();
      diagonals[1] += board.getBoard()[i][2-i].getMarker();
    }
    const allLines = rows.concat(columns).concat(diagonals);
    const winCondition = allLines.filter((line) => line === 'XXX' || line === "OOO");
    if (winCondition.length > 0){
      console.log(winCondition);
      gameOver(true, winCondition[0].charAt(0));
    }
    }
    function gameOver(hasWinner,winner) {
      if(hasWinner){
        console.log(`Winner is: ${winner}`);
      }
    }
    

  return{initialize, placeMarker, checkWinner};
  }

  const play = PlayHandler();