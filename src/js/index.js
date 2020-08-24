import "../scss/style.scss";
import { Game } from "./Game.js";

import { toggle } from "./toggle.js";

const boxes = [...document.querySelectorAll(".box")];
const btnReset = document.querySelector("button");
const game = new Game();
toggle();

boxes.forEach((box) => box.addEventListener("click", (e) => game.pick(e)));
btnReset.addEventListener("click", () => game.resetResult());
