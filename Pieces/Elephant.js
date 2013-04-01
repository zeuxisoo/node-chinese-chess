var Piece = require('../Piece'),
	Position = require('../Position');

function Elephant(color, x, y, name) {
	Piece.apply(this, [color, "Elephant", x, y, name]);
}
Elephant.prototype = Object.create(Piece.prototype);

Elephant.prototype.validRange = function(x, y) {
	if (this.getColor() == 1) {
		if (x >= 0 && x <= 8 && y >= 5 && y <= 9) {
			return true;
		}
		return false;
	}else{
		if (x >= 0 && x <= 8 && y >= 0 && y <= 4) {
			return true;
		}
		return false;
	}
}

Elephant.prototype.getAvailableMovement = function() {
	var avail = [], x, y, bx, by;
	var allPos = [
		[2, -2,  2, -2],
		[2, -2, -2,  2]
	];
	var allPosBreak = [
		[1, -1,  1, -1],
		[1, -1, -1,  1]
	];

	for(var i=0; i<allPos[0].length; i++) {
		x  = this.currentPos.x + allPos[0][i];
		y  = this.currentPos.y + allPos[1][i];
		bx = this.currentPos.x + allPosBreak[0][i];
		by = this.currentPos.y + allPosBreak[1][i];

		if (this.validPosition(x, y) && this.chessBoard.getPieceAt(bx, by) == null) {
			avail.push(new Position(x, y));
		}
	}

	return avail;
}

module.exports = Elephant;
