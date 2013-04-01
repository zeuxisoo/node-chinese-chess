var PalacePiece = require('../PalacePiece'),
	Position = require('../Position');

function Advisor(color, x, y, chessBoard) {
	PalacePiece.apply(this, [color, "Advisor", x, y, chessBoard]);
}
Advisor.prototype = Object.create(PalacePiece.prototype);

Advisor.prototype.getAvailableMovement = function() {
	var avail = [], x, y;
	var allPos = [
		[1, -1,  1, -1],
		[1, -1, -1,  1]
	];

	for(var i=0; i<allPos[0].length; i++) {
		x = this.currentPos.x + allPos[0][i];
		y = this.currentPos.y + allPos[1][i];

		if (this.validPosition(x, y)) {
			avail.push(new Position(x, y));
		}
	}

	return avail;
}

module.exports = Advisor;
