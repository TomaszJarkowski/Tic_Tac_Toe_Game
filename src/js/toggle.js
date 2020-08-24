export const toggle = () => {
  let dark = false;

  const toggleLight = document.querySelector(".toggle__light");
  const toggleDark = document.querySelector(".toggle__dark");
  const conteiner = document.querySelector(".conteiner");
  const checktoggle = document.querySelector("#checktoggle");
  const board = document.querySelector(".board");
  const boxs = document.querySelectorAll(".box");
  const info = document.querySelector(".info");
  const button = document.querySelector(".info button");
  const header = document.querySelector("header");
  const modal = document.querySelector(".modalDiv");
  const modalH1 = document.querySelector(".modalH1");

  checktoggle.addEventListener("click", () => {
    dark = !dark;

    if (dark) {
      toggleLight.style.opacity = "0.5";
      toggleDark.style.opacity = "1";
      conteiner.style.backgroundColor = "#242526";
      document.body.style.backgroundColor = "#242526";

      header.style.backgroundColor = "#242526";
      header.style.boxShadow = "0 0 7px 2px black";

      board.style.backgroundColor = "#18191A";
      board.style.boxShadow = "0 0 7px 2px black";

      modal.style.backgroundColor = "#18191A";
      modalH1.style.color = "white";

      info.style.backgroundColor = "#18191A";
      info.style.boxShadow = "0 0 7px 2px black";
      info.style.color = "white";

      button.style.backgroundColor = "#18191A";
      button.style.border = "2px solid gray";
      button.style.color = "white";
    } else {
      toggleLight.style.opacity = "1";
      toggleDark.style.opacity = "0.5";

      conteiner.style.backgroundColor = "#F7F7F7";
      document.body.style.backgroundColor = "#F7F7F7";

      board.style.backgroundColor = "gray";
      board.style.boxShadow = "0 0 7px 0 black";

      header.style.backgroundColor = "gray";
      header.style.boxShadow = "0 0 7px 0 black";

      info.style.backgroundColor = "gray";
      info.style.boxShadow = "0 0 7px 0px black";

      modal.style.backgroundColor = "gray";
      modalH1.style.color = "white";

      button.style.backgroundColor = "white";
      button.style.border = "2px solid black";
      button.style.color = "black";

      boxs.forEach((box) => {
        box.style.boxShadow = "0 0 7px 0px black";
      });
    }
  });
};
