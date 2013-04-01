var Piece = require('../Piece'),
	Position = require('../Position');

function Soldier(color, x, y, chessBoard) {
	Piece.apply(this, [color, "Soldier", x, y, chessBoard])
}
Soldier.prototype = Object.create(Piece.prototype);

Soldier.prototype.getAvailableMovement = function() {
	var avail = [], x, y;

	if (this.getColor() == Piece.RED) {
		if (this.currentPos.y >= 5 && this.currentPos.y <= 9) {
			var allPosTmp = [
				[0, 0,  0, 0],
				[0, 0, -1, 0]
			];
			allPos = allPosTmp;
		}else{
			var allPosTmp = [
				[-1, 1,  0, 0],
				[ 0, 0, -1, 0]
			]
			allPos = allPosTmp;
		}
	}

	if (this.getColor() == Piece.BLACK) {
		if (this.currentPos.y >= 0 && this.currentPos.y <= 4) {
			var allPosTmp = [
				[0, 0, 0, 0],
				[0, 0, 0, 1]
			];
			allPos = allPosTmp;
		}else{
			var allPosTmp = [
				[-1, 1, 0, 0],
				[ 0, 0, 0, 1]
			];
			allPos = allPosTmp;
		}
	}

	for(var i=0; i<allPos[0].length; i++) {
		x = this.currentPos.x + allPos[0][i];
		y = this.currentPos.y + allPos[1][i];

		if (this.validPosition(x, y)) {
			avail.push(new Position(x, y));
		}
	}

	return avail;
}

module.exports = Soldier
