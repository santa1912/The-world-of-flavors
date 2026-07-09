import {
    auth,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "./firebase.js";


// Elements

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const menu = document.getElementById("menu");
const gameContainer = document.querySelector(".game-container");


// ตรวจสอบ Element

if (!loginBtn || !logoutBtn || !menu || !gameContainer) {

    console.error("Login HTML element not found");

}



// ซ่อนเกมตอนเริ่มต้น

gameContainer.style.display = "none";



// ======================
// Google Login
// ======================

loginBtn.addEventListener("click", async () => {


    try {


        const result = await signInWithPopup(
            auth,
            provider
        );


        const user = result.user;


        console.log(
            "Login Success:",
            user.displayName
        );


        console.log(
            "Email:",
            user.email
        );


    } catch(error) {


        console.error(
            "Login Error:",
            error
        );


        alert(
            "Login ด้วย Gmail ไม่สำเร็จ"
        );


    }


});




// ======================
// Logout
// ======================

logoutBtn.addEventListener(
"click",
async()=>{


    try {


        await signOut(auth);


        console.log(
            "Logout Success"
        );


    } catch(error){


        console.error(error);


    }


});




// ======================
// ตรวจสอบ Login Status
// ======================

onAuthStateChanged(
auth,
(user)=>{


    if(user){


        // User Login


        console.log(
            "Current User:",
            user.email
        );


        menu.style.display =
            "none";


        gameContainer.style.display =
            "flex";


        loginBtn.style.display =
            "none";


        logoutBtn.style.display =
            "block";



        /*
            ส่งข้อมูล User ไปใช้ในเกม
        */


        window.currentUser = {

            uid:user.uid,

            name:user.displayName,

            email:user.email,

            photo:user.photoURL

        };



        // แจ้ง main.js ว่า Login แล้ว

        window.dispatchEvent(
            new CustomEvent(
                "loginSuccess",
                {
                    detail:window.currentUser
                }
            )
        );



    } else {


        // User Logout


        console.log(
            "No User"
        );


        menu.style.display =
            "flex";


        gameContainer.style.display =
            "none";


        loginBtn.style.display =
            "block";


        logoutBtn.style.display =
            "none";



        window.currentUser =
            null;


    }


});