import { theme } from "./theme";

export const toggle = () => {
  const toggleLight = document.querySelector(".toggle__light");
  const toggleDark = document.querySelector(".toggle__dark");
  const conteiner = document.querySelector(".conteiner");
  const checktoggle = document.querySelector("#checktoggle");
  const board = document.querySelector(".board");
  const info = document.querySelector(".info");
  const button = document.querySelector(".info button");
  const header = document.querySelector("header");
  const modal = document.querySelector(".modalDiv");
  let dark = localStorage.getItem("dark");
  dark = JSON.parse(dark);

  checktoggle.addEventListener("click", () => {
    dark = !dark;
    localStorage.setItem("dark", JSON.stringify(dark));
    changeColor(dark);
  });

  const changeColorInHtml = (
    toggleDarkOpacity,
    toggleLightOpacity,
    bgColor,
    shadow,
    boardColor,
    fontColor,
    buttonBorder,
    bgColorButton,
    bgColorHeader
  ) => {
    toggleLight.style.opacity = toggleLightOpacity;
    toggleDark.style.opacity = toggleDarkOpacity;

    conteiner.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;

    header.style.backgroundColor = bgColorHeader;
    header.style.boxShadow = shadow;

    board.style.backgroundColor = boardColor;
    board.style.boxShadow = shadow;

    modal.style.backgroundColor = boardColor;

    info.style.backgroundColor = boardColor;
    info.style.boxShadow = shadow;

    button.style.backgroundColor = bgColorButton;
    button.style.border = buttonBorder;
    button.style.color = fontColor;
  };

  const changeColor = (dark) => {
    let toggleDarkOpacity,
      toggleLightOpacity,
      bgColor,
      shadow,
      boardColor,
      fontColor,
      buttonBorder,
      bgColorButton,
      bgColorHeader;

    if (dark) {
      toggleDarkOpacity = "1";
      toggleLightOpacity = "0.5";
      bgColor = theme.dark.bgColor;
      shadow = theme.dark.shadow;
      boardColor = theme.dark.boardColor;
      fontColor = theme.dark.fontColor;
      buttonBorder = theme.dark.buttonBorder;
      bgColorButton = theme.dark.bgColorButton;
      bgColorHeader = theme.dark.bgColorHeader;
    } else {
      toggleDarkOpacity = "0.5";
      toggleLightOpacity = "1";
      bgColor = theme.light.bgColor;
      shadow = theme.light.shadow;
      boardColor = theme.light.boardColor;
      fontColor = theme.light.fontColor;
      buttonBorder = theme.light.buttonBorder;
      bgColorButton = theme.light.bgColorButton;
      bgColorHeader = theme.light.bgColorHeader;
    }
    changeColorInHtml(
      toggleDarkOpacity,
      toggleLightOpacity,
      bgColor,
      shadow,
      boardColor,
      fontColor,
      buttonBorder,
      bgColorButton,
      bgColorHeader
    );
  };
  const changePosition = (flague) => {
    if (flague) {
      const input = document.querySelector("#checktoggle");
      input.checked = true;
    }
  };
  changeColor(dark);
  changePosition(dark);
};
