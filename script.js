function Game(options) {
    this.gameBox = document.querySelector(options.gameBox);
    this.playersPoints = [document.querySelector(options.playerX), document.querySelector(options.playerO)];
    this.buttons = {
        newGameBtn: document.querySelector(options.newGameBtn),
        continueBtn: document.querySelector(options.continueBtn),
    };
    this.messageBox = document.querySelector(options.messageBox);
    this.players = ['X', 'O'];
    this.board = {};
    this.turn = Math.round(Math.random());
    this.combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    this.endRound = false;
    this.points = [0,0];
}

Game.prototype.createNewField = function () {
    const field = document.createElement("div");
    field.classList.add("box");
    return field;
};

Game.prototype.init = function () {
    this.draw();
    this.addEvents();
};

Game.prototype.draw = function() {
    this.gameBox.innerHTML = '';
    this.board = {};
    const fields = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
        const field = this.createNewField();
        field.dataset.index = i.toString();

        fields.appendChild(field);
    }

    this.gameBox.append(fields);
    this.gameBox.classList.remove("deactivated");
    this.buttons.continueBtn.classList.add("hide");
    this.messageBox.classList.add("hide");
};

Game.prototype.addEvents = function() {
    this.gameBox.addEventListener("click", this.fieldClickEvent.bind(this));
    this.buttons.continueBtn.addEventListener("click", this.continueGameEvent.bind(this));
    this.buttons.newGameBtn.addEventListener("click", this.newGameEvent.bind(this));
};

Game.prototype.fieldClickEvent = function(e) {
    if (this.endRound || !e.target || e.target.nodeName !== "DIV")
        return false;

    const fieldId = parseInt(e.target.dataset.index);

    if (this.board.hasOwnProperty(fieldId))
        return false;

    this.board[fieldId] = this.turn;
    e.target.innerHTML = this.players[this.turn];
    e.target.classList.add("clicked");
    this.turn = (this.turn === 0 ? 1 : 0);

    this.checkWin();
};

Game.prototype.continueGameEvent = function() {
    this.draw();
    this.endRound = false;
};

Game.prototype.newGameEvent = function() {
    this.points = [0,0];
    this.update();
    this.draw();
    this.endRound = false;
};

Game.prototype.checkWin = function () {
    if(Object.keys(this.board).length === 9){
        this.endOfTheRound(null, true);
        return;
    }
    this.combinations.forEach(function (c) {
        if (!this.board.hasOwnProperty(c[0]) || !this.board.hasOwnProperty(c[1]) || !this.board.hasOwnProperty(c[2]))
            return false;

        if (this.board[c[0]] === this.board[c[1]] && this.board[c[1]] === this.board[c[2]])
            this.endOfTheRound(this.board[c[0]], false);
    }.bind(this));
};

Game.prototype.endOfTheRound = function(player, isDraw) {
    this.gameBox.classList.add("deactivated");

    if(!isDraw) {
        this.points[player]++;
        this.messageBox.innerHTML = "Wygrał gracz: <b>" + this.players[player] + "</b>";
    }
    else
        this.messageBox.innerHTML = "Remis !";

    this.messageBox.classList.remove("hide");
    this.endRound = true;
    this.update();
};

Game.prototype.update = function() {
    this.buttons.continueBtn.classList.toggle("hide");
    this.playersPoints[0].innerHTML = this.points[0];
    this.playersPoints[1].innerHTML = this.points[1];
    this.playersPoints[0].parentElement.classList.remove("winner");
    this.playersPoints[0].parentElement.classList.remove("loser");
    this.playersPoints[1].parentElement.classList.remove("winner");
    this.playersPoints[1].parentElement.classList.remove("loser");

    if(this.points[0] > this.points[1]) {
        this.playersPoints[0].parentElement.classList.add("winner");
        this.playersPoints[1].parentElement.classList.add("loser");
    }
    else if(this.points[1] > this.points[0]) {
        this.playersPoints[1].parentElement.classList.add("winner");
        this.playersPoints[0].parentElement.classList.add("loser");
    }
};

const game = new Game({
    gameBox: "#game",
    playerX: "#playerXPoints",
    playerO: "#playerOPoints",
    newGameBtn: "#newGameBtn",
    continueBtn: "#continueBtn",
    messageBox: ".messageBox"
});
game.init();