var readline = require('readline');
var ChessBoard = require("./ChessBoard"),
	Piece = require("./Piece"),
	Position = require("./Position");

Array.prototype.containPoint = function(k) {
	for(p in this) {
		if(this[p].x == k.x && this[p].y == k.y) {
			return true;
		}
	}
	return false;
}

function ChineseChessBoard() {
	this.playerCounter = 1,
	this.playerColorInt = 0,
	this.chessBoard = new ChessBoard(),

	this.buf = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	this.loop();
}

ChineseChessBoard.prototype.loop = function() {
	var self = this;
	this.askHeader(function() {
		self.askNormalMove(function() {
			self.askTargetMove(function() {
				self.movePiece(function() {
					self.checkWinner(function() {
						self.loop();
					});
				});
			});
		});
	})
}

ChineseChessBoard.prototype.askHeader = function(next_step) {
	if (this.playerCounter % 2 == 0) {
		this.playerColorName = "BLACK";
		this.playerColorInt  = Piece.BLACK;
	}else{
		this.playerColorName = "RED";
		this.playerColorInt  = Piece.RED;
	}

	this.showMessage(this.chessBoard.toString());
	this.showMessage("[" + this.playerColorName + "]\n");

	next_step();
}

ChineseChessBoard.prototype.askNormalMove = function(next_step) {
	var self = this;

	this.buf.question("Please choose a chess to move (x y): ", function(answer) {
		var tempPos = answer.split(" ");

		if (tempPos[0] == "-1") {
			process.exit(1);
		}else if (tempPos.length != 2) {
			self.showError("Please enter a X and Y");
			self.askNormalMove(next_step);
		}else if (/^[0-9]+$/.test(tempPos[0]) === false) {
			self.showError("x is not a digi");
			self.askNormalMove(next_step);
		}else if (/^[0-9]+$/.test(tempPos[1]) === false) {
			self.showError("y is not a digi");
			self.askNormalMove(next_step);
		}else{
			self.selfX = tempPos[0];
			self.selfY = tempPos[1];

			if (self.chessBoard.getPieceAt(self.selfX, self.selfY) == null) {
				self.showError("(" + self.selfX + "," + self.selfY + ") not a piece");
				self.askNormalMove(next_step);
			}else if (self.chessBoard.getPieceAt(self.selfX, self.selfY).getColor() != self.playerColorInt) {
				self.showError("This is not your piece");
				self.askNormalMove(next_step);
			}else{
				var name = self.chessBoard.getPieceAt(self.selfX, self.selfY).getName();

				self.showMessage("\nYou have chosen a " + name + ", the " + name + " can move to\n");

				self.availableMovement = self.chessBoard.getPieceAt(self.selfX, self.selfY).getAvailableMovement();

				if (self.availableMovement.length <= 0) {
					self.showError("Not position can move");
					self.askNormalMove(next_step);
				}else{
					self.showMessage(self.availableMovement.join(" "));
					next_step();
				}
			}
		}
	});
}

ChineseChessBoard.prototype.askTargetMove = function(next_step) {
	var self = this;

	this.buf.question("\nPlease enter the target position (x y): ", function(answer) {
		var tempPos = answer.split(" ");

		if (tempPos[0] == "-1") {
			process.exit(1);
		}else if (tempPos.length != 2) {
			self.showError("Please enter a X and Y");
			self.askTargetMove(next_step);
		}else if (/^[0-9]+$/.test(tempPos[0]) === false) {
			self.showError("x is not a digi");
			self.askTargetMove(next_step);
		}else if (/^[0-9]+$/.test(tempPos[1]) === false) {
			self.showError("y is not a digi");
			self.askTargetMove(next_step);
		}else{
			self.targetX = tempPos[0];
			self.targetY = tempPos[1];

			if (!self.availableMovement.containPoint(new Position(self.targetX, self.targetY))) {
				self.showError("X and Y is can not go to (" + self.targetX + "," + self.targetY + ")");
				self.askTargetMove(next_step);
			}else{
				next_step();
			}
		}
	});
}

ChineseChessBoard.prototype.movePiece = function(next_step) {
	this.piece = this.chessBoard.getPieceAt(this.targetX, this.targetY);
	this.flag  = false;
	if (!this.chessBoard.isEmpty(this.targetX, this.targetY)) {
		this.showMessage("*** a "+ (this.piece.getColor() == Piece.BLACK ? "BLACK" : "RED")  + " "+ this.piece.getName() +" was captured ***\n\n");
		this.piece.captured();
		this.flag = true;
	}

	this.chessBoard.getPieceAt(this.selfX, this.selfY).move(this.targetX, this.targetY);

	next_step();
}

ChineseChessBoard.prototype.checkWinner = function(next_step) {
	if (this.flag && this.piece.getName() == "Marshal") {
		this.showMessage(this.chessBoard+"\n\n");
		this.showMessage("*** " + this.playerColorName + " WIN ***\n\n");
		process.exit(1);
	}

	this.playerCounter++;

	next_step();
}

ChineseChessBoard.prototype.showMessage = function(message) {
	console.log(message);
}

ChineseChessBoard.prototype.showError = function(message) {
	console.log("[Error]: " + message);
}

new ChineseChessBoard();
