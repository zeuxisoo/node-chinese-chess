function Position(x, y) {
	this.x = x;
	this.y = y;
}

Position.prototype.getX = function() {
	return this.x;
}

Position.prototype.getY = function() {
	return this.y;
}

Position.prototype.equals = function(obj) {
	return this.x == obj.x && this.y == obj.y;
}

Position.prototype.toString = function() {
	return "(" + this.x + "," + this.y + ")"
}

module.exports = Position;
