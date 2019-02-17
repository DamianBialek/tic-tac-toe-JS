function Game() {
    this.players = ['X', 'O'];
    this.board = [];
    this.turn = Math.round(Math.random());
    this.combinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
}

Game.prototype.createNewField = function() {
    const field = document.createElement("div");
    field.classList.add("box");
    return field;
};

Game.prototype.init = function() {
    const fields = document.createDocumentFragment();
    for(let i = 0; i < 9; i++) {
        const field = this.createNewField();
        field.dataset.index = i.toString();

        fields.appendChild(field);
    }

    document.querySelector("main").append(fields);
};

const game = new Game();
game.init();