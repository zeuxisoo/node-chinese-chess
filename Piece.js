var Position = require('./Position');

Array.prototype.containPoint = function(k) {
	for(p in this) {
		if(this[p].x == k.x && this[p].y == k.y) {
			return true;
		}
	}
	return false;
}

function Piece(color, name, x, y, chessBoard) {
	this.color      = color;
	this.name       = name;
	this.chessBoard = chessBoard;

	if (x instanceof Object) {
		currentPos = x;
		this.initX = currentPos.x;
		this.initY = currentPos.Y;
	}else{
		this.initX = x;
		this.initY = y;
	}

	this.setCurrentPosition(this.initX, this.initY);
}
Piece.RED   = 1;
Piece.BLACK = -1;

Piece.prototype.getColor = function() {
	return this.color;
}

Piece.prototype.getName = function() {
	return this.name;
}

Piece.prototype.getCurrentPosition = function() {
	return currentPos;
}

Piece.prototype.setCurrentPosition = function(x, y) {
	if (this.currentPos != null) {
		this.currentPos.x = parseInt(x);
		this.currentPos.y = parseInt(y);
	}else{
		this.currentPos = new Position(x, y)
	}

	this.chessBoard.setPieceAt(this, x, y)
}

Piece.prototype.move = function(x, y) {
	var target = null;

	if (this.getAvailableMovement().containPoint(new Position(x, y))) {
		this.chessBoard.setPieceAt(null, this.currentPos.x, this.currentPos.y);

		target = this.chessBoard.getPieceAt(x, y);

		if (target != null) {
			target.captured();
		}

		this.setCurrentPosition(x, y);
	}else{
		console.log("error at Piece.move()");
	}

	return target;
}

Piece.prototype.validPosition = function(x, y) {
	if (this.validRange(x, y)) {
		var target = this.chessBoard.getPieceAt(x, y)

		if (target == null || target.color != this.color) {
			return true;
		}
	}

	return false;
}

Piece.prototype.validRange = function(x, y) {
	if (x >= 0 && x <= 8 && y >= 0 && y <= 9) {
		return true;
	}
	return false;
}

Piece.prototype.captured = function() {
	this.currentPos = null;
}

Piece.prototype.reset = function() {
	this.setCurrentPosition(this.initX, this.initY);
}

Piece.prototype.toString = function() {
	if (this.color == Piece.RED) {
		return this.name.toUpperCase().substring(0, 1)
	}else{
		return this.name.toLowerCase().substring(0, 1)
	}
}

module.exports = Piece;
