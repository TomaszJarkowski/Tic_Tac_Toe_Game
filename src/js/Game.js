export { Game };

import { Modal } from "./Modal.js";

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
    this.modal = new Modal();

    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }
  pick = ({ target }) => {
    const { row, column } = target.dataset;
    if (this.round % 2 == 0) {
      if (
        target.innerHTML == this.playerO ||
        target.innerHTML == this.playerX ||
        target.parentNode.innerHTML == this.playerO ||
        target.parentNode.innerHTML == this.playerX
      ) {
        return;
      } else {
        this.nextPlayer.textContent = "O";

        target.innerHTML = this.playerX;
        this.turn = "X";
      }
    } else {
      if (
        target.innerHTML == this.playerO ||
        target.innerHTML == this.playerX ||
        target.parentNode.innerHTML == this.playerO ||
        target.parentNode.innerHTML == this.playerX
      ) {
        return;
      } else {
        this.nextPlayer.textContent = "X";

        target.innerHTML = this.playerO;
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
      this.displayResult("O");
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
      this.displayResult("X");
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
      this.displayResult("-");
    } else {
      return;
    }
  };

  displayResult = (lastWin) => {
    this.modal.displayModal(lastWin);
    if (lastWin == "X") {
      this.winX++;
      this.winsPlayerX.textContent = this.winX;
    } else if (lastWin == "O") {
      this.winO++;
      this.winsPlayerO.textContent = this.winO;
    }
    this.winPlayer.textContent = lastWin;
    this.clearBoard();
    this.setResultsInLocalStorage();
  };
  setResultsInLocalStorage = () => {
    localStorage.setItem("winX", this.winX);
    localStorage.setItem("winO", this.winO);
  };
  getResultsFromLocalStorage = () => {
    this.winO = localStorage.getItem("winO");
    this.winX = localStorage.getItem("winX");
    this.winsPlayerO.textContent = this.winO;
    this.winsPlayerX.textContent = this.winX;
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

  resetResult = () => {
    this.winO = 0;
    this.winX = 0;
    this.winsPlayerO.textContent = this.winO;
    this.winsPlayerX.textContent = this.winX;
    this.winPlayer.textContent = "-";
    this.clearBoard();
    this.setResultsInLocalStorage();
  };
}
