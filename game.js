import {
  auth,
  onAuthStateChanged
} from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {

  const gameContainer = document.querySelector(".game-container");

  onAuthStateChanged(auth, (user) => {

    if (!user) {
      window.location.href = "/";
      return;
    }

    gameContainer.style.display = "flex";

    const overworld = new Overworld({
      element: gameContainer,
      user: user
    });

    overworld.init();

  });

});