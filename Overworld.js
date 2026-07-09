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

        const step = () => {

            // Clear Canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw Map
            this.map.drawLowerImage(this.ctx);

            // Draw Objects
            Object.values(this.map.gameObjects).forEach(object => {

                object.update({
                    arrow: this.directionInput.direction
                });

                object.sprite.draw(this.ctx);

            });

            // Draw Upper Layer
            this.map.drawUpperImage(this.ctx);



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