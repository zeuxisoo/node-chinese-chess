var Piece = require('../Piece'),
	Position = require('../Position');

function Horse(color, x, y, chessBoard) {
	Piece.apply(this, [color, "Horse", x, y, chessBoard]);
}
Horse.prototype = Object.create(Piece.prototype);

Horse.prototype.getAvailableMovement = function() {
	var avail = [], x, y, bx, by;
	var allPos = [
		[
			[ 1, -1],
			[-2, -2]
		],
		[
			[ 2, 2],
			[-1, 1],
		],
		[
			[1, -1],
			[2,  2]
		],
		[
			[-2, -2],
			[ 1, -1]
		]
	];
	var allPosBreak = [
		[ 0, 1, 0, -1],
		[-1, 0, 1,  0]
	];

	for(var i=0; i<allPos.length; i++) {
		for(var j=0; j<allPos[i].length; j++) {
			x  = this.currentPos.x + allPos[i][0][j];
			y  = this.currentPos.y + allPos[i][1][j];
			bx = this.currentPos.x + allPosBreak[0][i];
			by = this.currentPos.y + allPosBreak[1][i];

			if (this.validPosition(x, y) && this.chessBoard.getPieceAt(bx, by) == null) {
				avail.push(new Position(x, y));
			}
		}
	}

	return avail;
}

module.exports = Horse;
