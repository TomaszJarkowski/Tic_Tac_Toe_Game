export {
    Game
};
class Game {
    constructor() {
        this.playerX = `<i class="fas fa-times"></i>`;
        this.playerO = `<i class="far fa-circle"></i>`;
        this.winPlayer = document.querySelector(".info .win span");
        this.nextPlayer = document.querySelector(".info .next span");
        this.winsPlayerX = document.querySelector(".playerX span");
        this.winsPlayerO = document.querySelector(".playerO span");
        this.boxes = [...document.querySelectorAll(".box")];
        this.turn = "";
        this.round = 0;
        this.winX = 0;
        this.winO = 0;

        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    pick = (e) => {
        const {
            row,
            column
        } = e.target.dataset;
        if (this.round % 2 == 0) {
            if (
                e.target.innerHTML == this.playerO ||
                e.target.innerHTML == this.playerX ||
                e.target.parentNode.innerHTML == this.playerO ||
                e.target.parentNode.innerHTML == this.playerX
            ) {
                return;
            } else {
                this.nextPlayer.textContent = "O";

                e.target.innerHTML = this.playerX;
                this.turn = "X";
            }
        } else {
            if (
                e.target.innerHTML == this.playerO ||
                e.target.innerHTML == this.playerX ||
                e.target.parentNode.innerHTML == this.playerO ||
                e.target.parentNode.innerHTML == this.playerX
            ) {
                return;
            } else {
                this.nextPlayer.textContent = "X";

                e.target.innerHTML = this.playerO;
                this.turn = "O";
            }
        }
        this.round++;

        this.board[row][column] = this.turn;
        this.check();
    };
    check = () => {
        let result = this.board.reduce((total, row) => total.concat(row));
        if (
            (result[8] == "O" && result[7] == "O" && result[6] == "O") ||
            (result[3] == "O" && result[4] == "O" && result[5] == "O") ||
            (result[0] == "O" && result[1] == "O" && result[2] == "O") ||
            (result[0] == "O" && result[3] == "O" && result[6] == "O") ||
            (result[1] == "O" && result[4] == "O" && result[7] == "O") ||
            (result[2] == "O" && result[5] == "O" && result[8] == "O") ||
            (result[6] == "O" && result[4] == "O" && result[2] == "O") ||
            (result[0] == "O" && result[4] == "O" && result[8] == "O")
        ) {
            this.winPlayer.textContent = " O";
            this.winO++;
            this.winsPlayerO.textContent = this.winO;
            this.clearBoard();
        } else if (
            (result[8] == "X" && result[7] == "X" && result[6] == "X") ||
            (result[3] == "X" && result[4] == "X" && result[5] == "X") ||
            (result[0] == "X" && result[1] == "X" && result[2] == "X") ||
            (result[0] == "X" && result[3] == "X" && result[6] == "X") ||
            (result[1] == "X" && result[4] == "X" && result[7] == "X") ||
            (result[2] == "X" && result[5] == "X" && result[8] == "X") ||
            (result[6] == "X" && result[4] == "X" && result[2] == "X") ||
            (result[0] == "X" && result[4] == "X" && result[8] == "X")
        ) {
            this.winPlayer.textContent = " X";
            this.winX++;
            this.winsPlayerX.textContent = this.winX;
            this.clearBoard();
        } else if (
            result[0] !== "" &&
            result[1] !== "" &&
            result[2] !== "" &&
            result[3] !== "" &&
            result[4] !== "" &&
            result[5] !== "" &&
            result[6] !== "" &&
            result[7] !== "" &&
            result[8] !== ""
        ) {
            this.winPlayer.textContent = " -";
            this.clearBoard();
        } else {
            return;
        }
    };

    clearBoard = () => {
        this.boxes.forEach((box) => {
            box.innerHTML = "";
        });
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    };

    resetResult = (e) => {
        this.winO = 0;
        this.winX = 0;
        this.winsPlayerO.textContent = this.winO;
        this.winsPlayerX.textContent = this.winX;
        this.winPlayer.textContent = "-";
        this.clearBoard();
    };
}