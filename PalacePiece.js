var Piece = require("./Piece");

function PalacePiece(color, name, x, y, chessBoard) {
	Piece.apply(this, [color, name, x, y, chessBoard])
}
PalacePiece.prototype = Object.create(Piece.prototype);

PalacePiece.prototype.validRange = function(x, y) {
	if (this.getColor() == 1) {
		if (x >= 3 && x <= 5 && y >= 7 && y <= 9) {
			return true;
		}else{
			return false;
		}
	}else{
		if (x >= 3 && x <= 5 && y >= 0 && y <= 2) {
			return true;
		}else{
			return false;
		}
	}
}

module.exports = PalacePiece;
