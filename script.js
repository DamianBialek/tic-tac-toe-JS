function Game(options) {
    this.gameBox = document.querySelector(options.gameBox);
    this.playersPoints = [document.querySelector(options.playerX), document.querySelector(options.playerO)];
    this.players = ['X', 'O'];
    this.board = {};
    this.turn = Math.round(Math.random());
    this.combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    this.endGame = false;
    this.points = [0,0];
}

Game.prototype.createNewField = function () {
    const field = document.createElement("div");
    field.classList.add("box");
    return field;
};

Game.prototype.init = function () {
    const fields = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
        const field = this.createNewField();
        field.dataset.index = i.toString();

        fields.appendChild(field);
    }

    this.gameBox.append(fields);
    this.gameBox.addEventListener("click", function (e) {
        if (this.endGame || !e.target || e.target.nodeName !== "DIV")
            return false;

        const fieldId = parseInt(e.target.dataset.index);

        if (this.board.hasOwnProperty(fieldId))
            return false;

        this.board[fieldId] = this.turn;
        e.target.innerHTML = this.players[this.turn];
        e.target.classList.add("clicked");
        this.turn = (this.turn === 0 ? 1 : 0);

        this.checkWin();
    }.bind(this));
};

Game.prototype.checkWin = function () {
    this.combinations.forEach(function (c) {
        if (!this.board.hasOwnProperty(c[0]) || !this.board.hasOwnProperty(c[1]) || !this.board.hasOwnProperty(c[2]))
            return false;

        if (this.board[c[0]] === this.board[c[1]] && this.board[c[1]] === this.board[c[2]]) {
            this.points[this.board[c[0]]]++;
            this.endGame = true;
            this.update();
        }
    }.bind(this));
};

Game.prototype.update = function() {
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
    playerO: "#playerOPoints"
});
game.init();