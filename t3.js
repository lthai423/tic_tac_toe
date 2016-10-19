var inquirer = require('inquirer');

class T3 {
	constructor(){
		this.board = this.initBoard();
		this.isPlayer1 = true;
	}

	initBoard() {
		return [
			[' ',' ',' '],
			[' ',' ',' '],
			[' ',' ',' ']
		];
	}

	inputMove(xCoordinate, yCoordinate){
		if (this.board[xCoordinate - 1][yCoordinate - 1] !== ' ') {
			console.log('Already taken');
		} else {
			var playerIcon = this.isPlayer1 ? 'X' : 'O';
			this.board[xCoordinate - 1][yCoordinate - 1] = playerIcon;
			if (this.checkBoard()){
				console.log('someone one, ill tell u later who it is');
				this.displayBoard();
				process.exit();
			}
			this.isPlayer1 = !this.isPlayer1;
		}
	}

	displayBoard(){
		this.board.forEach((row, index) => {
			console.log('=======');
			var concat_row = '';
			row.forEach((box, index) => {
				concat_row += ('|' + box);
				if (index === 2)
					concat_row += '|';
			});
			console.log(concat_row);
		});
		console.log('=======');
	}

	checkBoard(){
		if(this.checkColumns() || this.checkRows() || this.checkDiagonals())
			return true;
		return false;
	}

	checkColumns(){
		for(var col = 0; col < 3; col++){
			var col_winner = true;
			var curr = this.board[0][col];
			if (curr === ' ')
				col_winner = false;
			for(var row = 1; row < 3; row++){
				if (this.board[row][col] !== curr)
					col_winner = false;
			}
			if (col_winner){
				return true;
			}
		}
		return false;
	}

	checkRows(){
		for(var row = 0; row < 3; row++){
			var row_winner = true;
			var curr = this.board[row][0];
			if (curr === ' ')
				row_winner = false;
			for(var col = 1; col < 3; col++){
				if (this.board[row][col] !== curr)
					row_winner = false;
			}
			if (row_winner){
				return true;
			}
		}
		return false;
	}

	checkDiagonals(){
		//top left - bottom right
		var diag_winner = true;
		var curr = this.board[1][1]
		diag_winner = this.board[0][0] === curr && this.board[2][2] === curr ? true : false;
		if (!diag_winner)
			return false;

		//top right - bottom left
		diag_winner = this.board[0][2] === curr && this.board[2][0] === curr ? true : false;
		if (!diag_winner)
			return false;
		return true;
	}

	promptUser(){
		console.log(this.isPlayer1 ? 'Player 1 Turn' : 'Player 2 Turn');
		this.displayBoard();
		var questions =  [{
		    type: 'input',
		    name: 'xCoordinate',
		    message: 'Input xCoordinate',
		    default: false
		  },
		  {
		    type: 'input',
		    name: 'yCoordinate',
		    message: 'Input yCoordinate',
		    default: false
		  }]
		inquirer.prompt(questions).then((coordinate) => {
			this.inputMove(coordinate.xCoordinate, coordinate.yCoordinate);
			this.promptUser();
		});
	}
}

module.exports = T3
