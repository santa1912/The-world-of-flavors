import {
    auth,
    signOut,
    onAuthStateChanged
} from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {

    // =========================
    // Canvas
    // =========================

    const canvas = document.getElementById("worldCanvas");
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;

    const worldMap = new Image();
    worldMap.src = "/images/maps/Worldmap.png";

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        draw();

    }

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            worldMap,
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

    worldMap.onload = () => {

        resizeCanvas();

    };

    window.addEventListener("resize", resizeCanvas);

    // =========================
    // Menu
    // =========================

    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    menuButton.addEventListener("click", (e) => {

        e.stopPropagation();

        dropdownMenu.style.display =
            dropdownMenu.style.display === "flex"
                ? "none"
                : "flex";

    });

    document.addEventListener("click", (e) => {

        if (
            !dropdownMenu.contains(e.target) &&
            !menuButton.contains(e.target)
        ) {
            dropdownMenu.style.display = "none";
        }

    });

    // =========================
    // Login
    // =========================

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.href = "/";

        }

    });

    // =========================
    // Enter City
    // =========================

    document.getElementById("enterCityBtn")
        .addEventListener("click", () => {

            window.location.href = "/game.html";

        });

    // =========================
    // Logout
    // =========================

    document.getElementById("logoutBtn")
        .addEventListener("click", async () => {

            try {

                await signOut(auth);

                window.location.href = "/";

            } catch (error) {

                console.error(error);

            }

        });

});