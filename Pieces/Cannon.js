var Piece = require('../Piece'),
	Position = require('../Position');

function Cannon(color, x, y, chessBoard) {
	Piece.apply(this, [color, "Cannon", x, y, chessBoard]);
}
Cannon.prototype = Object.create(Piece.prototype);

Cannon.prototype.validPosition = function(x, y) {
	if (this.validRange(x, y)) {
		return true;
	}else{
		return false;
	}
}

Cannon.prototype.getAvailableMovement = function() {
	var avail = [], x, y, count;

	x = this.currentPos.x;
	y = this.currentPos.y-1;
	count = 0;
	while(this.validPosition(x, y)) {
		var target = this.chessBoard.getPieceAt(x, y);
		if (target != null) count++;
		if (count == 0) avail.push(new Position(x, y));
		if (count == 1) { y--; continue; }
		if (count == 2) {
			if (target.color != this.getColor()) {
				avail.push(new Position(x, y));
			}
			break;
		}
		y--;
	}

	x = this.currentPos.x+1;
	y = this.currentPos.y;
	count = 0;
	while(this.validPosition(x, y)) {
		var target = this.chessBoard.getPieceAt(x, y);
		if (target != null) count++;
		if (count == 0) avail.push(new Position(x, y));
		if (count == 1) { x++; continue; }
		if (count == 2) {
			if (target.color != this.getColor()) {
				avail.push(new Position(x, y));
			}
			break;
		}
		x++;
	}

	x = this.currentPos.x;
	y = this.currentPos.y+1;
	count = 0;
	while(this.validPosition(x, y)) {
		var target = this.chessBoard.getPieceAt(x, y);
		if (target != null) count++;
		if (count == 0) avail.push(new Position(x, y));
		if (count == 1) { y++; continue; }
		if (count == 2) {
			if (target.color != this.getColor()) {
				avail.push(new Position(x, y));
			}
			break;
		}
		y++;
	}

	x = this.currentPos.x-1;
	y = this.currentPos.y;
	count = 0;
	while(this.validPosition(x, y)) {
		var target = this.chessBoard.getPieceAt(x, y);
		if (target != null) count++;
		if (count == 0) avail.push(new Position(x, y));
		if (count == 1) { x--; continue; }
		if (count == 2) {
			if (target.color != this.getColor()) {
				avail.push(new Position(x, y));
			}
			break;
		}
		x--;
	}

	return avail;
}

module.exports = Cannon;
