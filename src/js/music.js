import { Howl, Howler } from "howler";
import audioMP3 from "../music/Smooth-Jazz.mp3";
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
        toggleMusic.style.border = "3px solid orange";
        toggleMusic.style.animation = "sk-scaleout 1.0s infinite ease-in-out";
        icon.style.color = "orange";
      } else {
        toggleMusic.style.border = "3px solid #6ac540";
        toggleMusic.style.animation = "0";
        icon.style.color = "#6ac540";
      }
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
