var Piece = require('../Piece'),
	Position = require('../Position');

function Rook(color, x, y, chessBoard) {
	Piece.apply(this, [color, "Rook", x, y, chessBoard]);
}
Rook.prototype = Object.create(Piece.prototype);

Rook.prototype.getAvailableMovement = function() {
	var avail = [], x, y;

	x = this.currentPos.x;
	y = this.currentPos.y+1;
	while(this.validPosition(x, y)) {
		avail.push(new Position(x, y));
		var target = this.chessBoard.getPieceAt(x,y);
		if (target != null && target.color != this.color) {
			break;
		}
		y++;
	}

	x = this.currentPos.x+1;
	y = this.currentPos.y;
	while(this.validPosition(x, y)) {
		avail.push(new Position(x, y));
		var target = this.chessBoard.getPieceAt(x,y);
		if (target != null && target.color != this.color) {
			break;
		}
		x++;
	}

	x = this.currentPos.x;
	y = this.currentPos.y-1;
	while(this.validPosition(x, y)) {
		avail.push(new Position(x, y));
		var target = this.chessBoard.getPieceAt(x,y);
		if (target != null && target.color != this.color) {
			break;
		}
		y--;
	}

	x = this.currentPos.x-1;
	y = this.currentPos.y;
	while(this.validPosition(x, y)) {
		avail.push(new Position(x, y));
		var target = this.chessBoard.getPieceAt(x,y);
		if (target != null && target.color != this.color) {
			break;
		}
		x--;
	}

	return avail;
}

module.exports = Rook;
