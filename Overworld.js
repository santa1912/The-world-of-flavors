class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.map = null;

        // Scene ปัจจุบัน
        this.currentScene = "world";

        // โหลดรูป Scene
        this.worldImage = new Image();
        this.worldImage.src = "/images/maps/Worldmap.png";

        this.cityImage = new Image();
        this.cityImage.src = "/images/maps/FlavoriaCity.png";
    }

    startGameLoop() {

        const step = () => {

            // ล้างหน้าจอ
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // -------------------------
            // Scene : World Map
            // -------------------------
            if (this.currentScene === "world") {

                const scale = Math.min(
                    this.canvas.width / this.worldImage.width,
                    this.canvas.height / this.worldImage.height
                );

                const width = this.worldImage.width * scale;
                const height = this.worldImage.height * scale;

                const x = (this.canvas.width - width) / 2;
                const y = (this.canvas.height - height) / 2;

                this.ctx.drawImage(
                    this.worldImage,
                    x,
                    y,
                    width,
                    height
                );

            }

            // -------------------------
            // Scene : Flavoria City
            // -------------------------
            else if (this.currentScene === "city") {

                this.ctx.drawImage(
                    this.cityImage,
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );

            }

            // -------------------------
            // Scene : Game
            // -------------------------
            else {

                this.map.drawLowerImage(this.ctx);

                Object.values(this.map.gameObjects).forEach(object => {

                    object.update({
                        arrow: this.directionInput.direction
                    });

                    object.sprite.draw(this.ctx);

                });

                this.map.drawUpperImage(this.ctx);

            }

            requestAnimationFrame(step);

        }

        step();

    }

    init() {

        // โหลดแผนที่จริงไว้ก่อน
        this.map = new OverworldMap(window.OverworldMaps.Kitchen);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        // เปลี่ยน Scene เมื่อคลิก
        this.canvas.addEventListener("click", () => {

            if (this.currentScene === "world") {

                this.currentScene = "city";

            }

            else if (this.currentScene === "city") {

                this.currentScene = "game";

            }

        });

        this.startGameLoop();

    }

}