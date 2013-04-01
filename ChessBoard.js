var Piece   = require('./Piece');
var Marshal = require('./Pieces/Marshal'),
	Advisor = require('./Pieces/Advisor'),
	Elephant= require('./Pieces/Elephant'),
	Horse   = require('./Pieces/Horse'),
	Rook    = require('./Pieces/Rook'),
	Cannon  = require('./Pieces/Cannon'),
	Soldier = require('./Pieces/Soldier');

function ChessBoard() {
	this.board = [
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null],
	];
	this.allPieces = [];

	// Red
	this.allPieces[0]  = new Marshal(Piece.RED, 4, 9, this);
	this.allPieces[1]  = new Advisor(Piece.RED, 3, 9, this);
	this.allPieces[2]  = new Advisor(Piece.RED, 5, 9, this);
	this.allPieces[3]  = new Elephant(Piece.RED, 2, 9, this);
	this.allPieces[4]  = new Elephant(Piece.RED, 6, 9, this);
	this.allPieces[5]  = new Horse(Piece.RED, 1, 9, this);
	this.allPieces[6]  = new Horse(Piece.RED, 7, 9, this);
	this.allPieces[7]  = new Rook(Piece.RED, 0, 9, this);
	this.allPieces[8]  = new Rook(Piece.RED, 8, 9, this);
	this.allPieces[9]  = new Cannon(Piece.RED, 1, 7, this);
	this.allPieces[10] = new Cannon(Piece.RED, 7, 7, this);
	this.allPieces[11] = new Soldier(Piece.RED, 0, 6, this);
	this.allPieces[12] = new Soldier(Piece.RED, 2, 6, this);
	this.allPieces[13] = new Soldier(Piece.RED, 4, 6, this);
	this.allPieces[14] = new Soldier(Piece.RED, 6, 6, this);
	this.allPieces[15] = new Soldier(Piece.RED, 8, 6, this);

	// Black
	this.allPieces[16] = new Marshal(Piece.BLACK, 4, 0, this);
	this.allPieces[17] = new Advisor(Piece.BLACK, 3, 0, this);
	this.allPieces[18] = new Advisor(Piece.BLACK, 5, 0, this);
	this.allPieces[19] = new Elephant(Piece.BLACK, 2, 0, this);
	this.allPieces[20] = new Elephant(Piece.BLACK, 6, 0, this);
	this.allPieces[21] = new Horse(Piece.BLACK, 1, 0, this);
	this.allPieces[22] = new Horse(Piece.BLACK, 7, 0, this);
	this.allPieces[23] = new Rook(Piece.BLACK, 0, 0, this);
	this.allPieces[24] = new Rook(Piece.BLACK, 8, 0, this);
	this.allPieces[25] = new Cannon(Piece.BLACK, 1, 2, this);
	this.allPieces[26] = new Cannon(Piece.BLACK, 7, 2, this);
	this.allPieces[27] = new Soldier(Piece.BLACK, 0, 3, this);
	this.allPieces[28] = new Soldier(Piece.BLACK, 2, 3, this);
	this.allPieces[29] = new Soldier(Piece.BLACK, 4, 3, this);
	this.allPieces[30] = new Soldier(Piece.BLACK, 6, 3, this);
	this.allPieces[31] = new Soldier(Piece.BLACK, 8, 3, this);
}

ChessBoard.prototype.getPieceAt = function(x, y) {
	if (x >= 0 && x <= 8 && y >= 0 && y <= 9 && this.board[x][y] != null) {
		return this.board[x][y];
	}else{
		return null;
	}
}

ChessBoard.prototype.setPieceAt = function(piece, x, y) {
	if (x >= 0 && x <= 8 && y >= 0 && y <= 9) {
		this.board[x][y] = piece;
	}else{
		console.log("Not Invalid Position (" + x + ", " + y + ")");
	}
}

ChessBoard.prototype.isEmpty = function(x, y) {
	if (this.board[x][y] == null) {
		return true;
	}else{
		return false;
	}
}

ChessBoard.prototype.reset = function() {
	for(var i=0; i<=9; i++) {
		for(var j=0; j<=8; j++) {
			this.board[j][i] = null;
		}
	}

	for(var i=0; i<this.allPieces.length; i++) {
		this.allPieces[i].reset();
	}
}

ChessBoard.prototype.toString = function() {
	var board = "\t   BLACK\n\n";

	for(var i=0; i<=9; i++) {
		board += i + "    "; // No of Y
		for(var j=0; j<=8; j++) {
			board += (this.getPieceAt(j, i) == null ? " " : this.getPieceAt(j, i)) + " ";
		}
		board += "\n";
	}

	board += "\n     ";
	for(var i=0; i<=8; i++) {
		board += i + " ";	 // No of X
	}
	board += "\n\n\t    RED\n\n";

	return board;
}

module.exports = ChessBoard
