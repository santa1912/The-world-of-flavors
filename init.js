import {
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged
} from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const loginScreen = document.getElementById("loginScreen");

  // ถ้าไม่ได้อยู่หน้า Login ก็ไม่ต้องทำอะไร
  if (!loginBtn || !loginScreen) return;

  // กด Login
  loginBtn.addEventListener("click", async () => {
    try {

      await signInWithPopup(auth, provider);

      // Login สำเร็จ ไปหน้า World Map
      window.location.href = "/worldmap.html";

    } catch (error) {

      console.error(error);
      alert("Login ไม่สำเร็จ");

    }
  });

  // ถ้า Login อยู่แล้ว ให้ข้ามไปหน้า World Map
  onAuthStateChanged(auth, (user) => {

    if (user) {

      window.location.href = "/worldmap.html";

    } else {

      loginScreen.style.display = "flex";

    }

  });

});