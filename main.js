let overworld = null;


window.addEventListener(
"loginSuccess",
(e)=>{


    console.log(
        "Start Game:",
        e.detail.name
    );


    if(!overworld){


        overworld = new Overworld({

            element:
            document.querySelector(".game-container")

        });


        overworld.init();


    }


});