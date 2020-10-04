import { Howl, Howler } from "howler";
import audioMP3 from "../music/Smooth-Jazz.mp3";
import { theme } from "./theme";
export const music = () => {
  const toggleMusic = document.querySelector(".toggleMusic");
  const icon = document.querySelector(".fas");
  const sound = new Howl({
    src: [audioMP3],
    loop: true,
  });

  let isPlaying;
  let isLoading = true;

  const timeID = setInterval(() => {
    if (sound.state() === "loaded") {
      isLoading = false;
      decoration();
      clearInterval(timeID);
    }
  }, 1000);

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
      if (isLoading) {
        toggleMusic.style.border = theme.musicLoading.buttonBorder;
        toggleMusic.style.animation = theme.musicLoading.buttonAnimation;
        icon.style.color = theme.musicLoading.buttonColor;
      } else {
        toggleMusic.style.border = theme.musicActive.buttonBorder;
        toggleMusic.style.animation = theme.musicActive.buttonAnimation;
        icon.style.color = theme.musicActive.buttonColor;
      }
    } else {
      toggleMusic.style.border = theme.musicNotActive.buttonBorder;
      toggleMusic.style.animation = theme.musicNotActive.buttonAnimation;
      icon.style.color = theme.musicNotActive.buttonColor;
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
