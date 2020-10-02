import { Howl } from "howler";
import audio from "../music/Smooth-Jazz.mp3";
export const music = () => {
  const toggleMusic = document.querySelector(".toggleMusic");
  const icon = document.querySelector(".fas");
  const sound = new Howl({
    src: [audio],
    loop: true,
  });
  let isPlaying;

  if (localStorage.getItem("isPlaying") == "true") {
    isPlaying = true;
  } else if (localStorage.getItem("isPlaying") == "false") {
    isPlaying = false;
  } else {
    isPlaying = true;
    localStorage.setItem("isPlaying", isPlaying);
  }

  const setItemInLocalStorage = () => {
    localStorage.setItem("isPlaying", isPlaying);
  };

  const decoration = () => {
    if (isPlaying) {
      toggleMusic.style.border = "3px solid #6ac540";
      icon.style.color = "#6ac540";
      icon.style.textDecoration = "none";
    } else {
      toggleMusic.style.border = "3px solid gray";
      icon.style.color = "gray";
    }
  };
  const handleMusic = () => {
    if (isPlaying) {
      sound.play();
    } else {
      sound.stop();
    }
  };

  decoration();
  handleMusic();
  toggleMusic.addEventListener("click", () => {
    isPlaying = !isPlaying;
    setItemInLocalStorage();
    decoration();
    handleMusic();
  });
};
