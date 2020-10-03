export { Modal };
class Modal {
  constructor() {
    const body = document.querySelector("body");
    this.div = document.createElement("div");
    this.h1 = document.createElement("h1");
    this.div.classList.add("modalDiv");
    this.h1.classList.add("modalH1");
    body.appendChild(this.div);
    this.div.appendChild(this.h1);
    this.time = 3000;
  }

  displayModal(winner) {
    if (winner == "-") {
      this.h1.innerHTML = `Hard game! Draw`;
    } else {
      this.h1.innerHTML = `Congratulations!!! Player <span>${winner}</span> won`;
    }
    this.div.style.display = "flex";

    setTimeout(() => {
      this.div.style.display = "none";
    }, this.time);
  }
}
