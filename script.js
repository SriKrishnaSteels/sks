// ===========================================
// SRI KRISHNA STEELS 
// script.js
// ===========================================

// ================= NAVBAR SCROLL =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

// ================= MOBILE MENU =================

const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navLinks.classList.toggle("active");

});

// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navLinks.classList.remove("active");

    });

});

// ================= BACK TO TOP =================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ================= SCROLL ANIMATION =================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:0.15

});

document.querySelectorAll(

".card, .feature-card, .gallery-item, .testimonial-card, .stat-card"

).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ================= CONTACT FORM =================

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you! Your message has been received.");

form.reset();

});

}

// ================= HERO PARALLAX =================

const hero=document.querySelector(".hero");

window.addEventListener("scroll",()=>{

let offset=window.pageYOffset;

if(hero){

hero.style.backgroundPositionY=offset*0.45+"px";

}

});

// ================= BUTTON RIPPLE =================

document.querySelectorAll(".primary-btn").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

const radius=diameter/2;

circle.style.width=circle.style.height=`${diameter}px`;

circle.style.left=`${e.clientX-this.getBoundingClientRect().left-radius}px`;

circle.style.top=`${e.clientY-this.getBoundingClientRect().top-radius}px`;

circle.classList.add("ripple");

const ripple=this.getElementsByClassName("ripple")[0];

if(ripple){

ripple.remove();

}

this.appendChild(circle);

});

});

// ================= PAGE LOADED =================

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

console.log("Sri Krishna Steels Loaded Successfully!");
// =============== GTRANSLATE ========================
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en', 
        // Removing InlineLayout.SIMPLE prevents the broken "Translate" button markup generation
        autoDisplay: false
    }, 'google_translate_element');
}
// script.js
import { auth, db } from "./firebase-config.js"; 
import { onAuthStateChanged } from "firebase/auth";

// Track login state to update your UI
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in.");
    // Example: Show a "Logout" button, hide "Login" button
  } else {
    console.log("No user signed in.");
    // Example: Show "Login" button, hide "Write Data" forms
  }
});
