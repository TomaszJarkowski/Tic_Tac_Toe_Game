import "../scss/style.scss";
import { Game } from "./Game.js";
import { music } from "./music.js";
import { toggle } from "./toggle.js";

const boxes = [...document.querySelectorAll(".box")];
const btnReset = document.querySelector("button");
const game = new Game();
toggle();
music();
if (localStorage.getItem("winO")) {
  game.getResultsFromLocalStorage();
}
boxes.forEach((box) => box.addEventListener("click", (e) => game.pick(e)));
btnReset.addEventListener("click", () => game.resetResult());
