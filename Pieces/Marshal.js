var PalacePiece = require('../PalacePiece'),
	Position = require('../Position');

function Marshal(color, x, y, chessBoard) {
	PalacePiece.apply(this, [color, "Marshal", x, y, chessBoard]);
}
Marshal.prototype = Object.create(PalacePiece.prototype);

Marshal.prototype.getAvailableMovement = function() {
	var avail = [], x, y;
	var allPos = [
		[-1, 1, 0,  0],
		[ 0, 0, 1, -1]
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

module.exports = Marshal;
