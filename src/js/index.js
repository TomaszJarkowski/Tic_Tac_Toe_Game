import '../scss/style.scss'
import {
    Game
} from './Game.js';


const boxes = [...document.querySelectorAll(".box")]
const btnReset = document.querySelector("button");
const game = new Game();




boxes.forEach(box => box.addEventListener('click', (e) => game.pick(e)))
btnReset.addEventListener('click', (e) => game.resetResult(e))