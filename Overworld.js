class Overworld {
    constructor(config) {
        this.element = config.element;

        this.canvas = this.element.querySelector(".game-canvas");

        // ตั้งค่าความละเอียด Canvas
        this.canvas.width = 1920;
        this.canvas.height = 1080;

        this.ctx = this.canvas.getContext("2d");

        // ป้องกันภาพเบลอสำหรับ Pixel Art
        this.ctx.imageSmoothingEnabled = false;

        this.map = null;
    }


    startGameLoop() {

        const SCALE = 4; // ปรับเป็น 2, 3, 4 ได้

        const step = () => {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.save();

            // ขยายทุกอย่าง
            this.ctx.scale(SCALE, SCALE);

            // วาดแผนที่
            this.map.drawLowerImage(this.ctx);

            // วาดตัวละคร
            Object.values(this.map.gameObjects).forEach(object => {

                object.update({
                    arrow: this.directionInput.direction
                });

                object.sprite.draw(this.ctx);

            });

            // วาดชั้นบน
            this.map.drawUpperImage(this.ctx);

            this.ctx.restore();

            requestAnimationFrame(step);

        }

        step();

    }

    init() {


        this.map = new OverworldMap(window.OverworldMaps.Kitchen);

        this.directionInput = new DirectionInput();
        this.directionInput.init();



        this.startGameLoop();

    }

}

window.Overworld = Overworld;