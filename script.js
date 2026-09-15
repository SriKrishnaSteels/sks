// ===========================================
// SRI KRISHNA STEELS
// script.js
//
// NOTE: This file uses ES module `import` statements, so it must be
// loaded from HTML as <script type="module" src="script.js"></script>
// (not a plain <script src="..."> tag) or every line below silently
// fails to run.
// ===========================================

import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// ================= NAVBAR SCROLL =================

const navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// ================= MOBILE MENU =================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {
        const isOpen = hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}

// ================= BACK TO TOP =================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 500 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ================= SCROLL ANIMATION =================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(
    ".card, .feature-card, .gallery-item, .testimonial-card, .stat-card"
).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
        // If the target section doesn't exist, let the browser follow
        // the link normally instead of doing nothing.
    });
});

// ================= CONTACT FORM =================

// Paste the /exec URL from your Apps Script deployment (Deploy > Manage deployments) here.
const CONTACT_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxREveYF5J8dphkzFjSVDiUVUay1h3TgtNk1bjC3qJXY08V4NqBVmy1qrzzbcNek6fj/exec";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const msgDiv = document.getElementById("contactFormMsg");
        const submitBtn = contactForm.querySelector("button[type='submit']");

        if (!CONTACT_FORM_ENDPOINT || CONTACT_FORM_ENDPOINT.includes("PASTE_YOUR")) {
            console.warn("Contact form endpoint isn't set yet — see CONTACT_FORM_ENDPOINT in script.js.");
            if (msgDiv) {
                msgDiv.style.color = "red";
                msgDiv.textContent = "Form isn't connected yet. Please contact us by phone or email instead.";
            }
            return;
        }

        const payload = {
            website: contactForm.website.value, // honeypot — should stay empty
            name: contactForm.name.value.trim(),
            email: contactForm.email.value.trim(),
            phone: contactForm.phone.value.trim(),
            message: contactForm.message.value.trim()
        };

        const originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
        }
        if (msgDiv) msgDiv.textContent = "";

        try {
            // Content-Type must stay "text/plain" here — it keeps this a "simple request"
            // so the browser skips a CORS preflight, which Apps Script doesn't handle.
            const res = await fetch(CONTACT_FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

            if (msgDiv) {
                msgDiv.style.color = "green";
                msgDiv.innerHTML = "";

                const successText = document.createElement("div");
                successText.textContent = "Thank you! Your message has been received.";

                const waLink = document.createElement("a");
                waLink.href = `https://wa.me/919944468655?text=${encodeURIComponent(
                    `Hi, I just sent a message on your website: "${payload.message}"`
                )}`;
                waLink.target = "_blank";
                waLink.rel = "noopener noreferrer";
                waLink.textContent = "Continue on WhatsApp →";
                waLink.style.display = "inline-block";
                waLink.style.marginTop = "8px";
                waLink.style.color = "#25D366";
                waLink.style.fontWeight = "600";
                waLink.style.textDecoration = "none";

                msgDiv.append(successText, waLink);
            }
            contactForm.reset();
        } catch (err) {
            console.error("Contact form submission failed:", err);
            if (msgDiv) {
                msgDiv.style.color = "red";
                msgDiv.textContent = "Something went wrong sending your message. Please try again or contact us by phone.";
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// ================= HERO PARALLAX =================

const hero = document.querySelector(".hero");

if (hero) {
    window.addEventListener("scroll", () => {
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = `${offset * 0.45}px`;
    });
}

// ================= BUTTON RIPPLE =================

document.querySelectorAll(".primary-btn").forEach(button => {
    button.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");

        const existingRipple = this.querySelector(".ripple");
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(circle);
    });
});

// ================= LIVE CHAT WIDGET =================
// Reuses the same Apps Script endpoint as the contact form, with a "chat"
// type flag so the backend knows to just answer and reply, not log a lead.

const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatCloseBtn = document.getElementById("chatCloseBtn");
const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function addChatMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `chat-msg chat-msg-${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
}

if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener("click", () => {
        chatWindow.classList.toggle("open");
        if (chatWindow.classList.contains("open")) chatInput.focus();
    });
}

if (chatCloseBtn && chatWindow) {
    chatCloseBtn.addEventListener("click", () => chatWindow.classList.remove("open"));
}

if (chatForm) {
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        addChatMessage(text, "user");
        chatInput.value = "";

        const typingMsg = addChatMessage("Typing...", "bot");
        typingMsg.classList.add("chat-msg-typing");

        if (!CONTACT_FORM_ENDPOINT || CONTACT_FORM_ENDPOINT.includes("PASTE_YOUR")) {
            typingMsg.textContent = "Chat isn't connected yet — please use WhatsApp or call us instead.";
            typingMsg.classList.remove("chat-msg-typing");
            return;
        }

        try {
            const res = await fetch(CONTACT_FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ type: "chat", message: text })
            });
            const data = await res.json();
            typingMsg.textContent = data.reply || "Sorry, I couldn't get an answer just now.";
        } catch (err) {
            console.error("Chat request failed:", err);
            typingMsg.textContent = "Sorry, something went wrong. Please try WhatsApp or call us instead.";
        } finally {
            typingMsg.classList.remove("chat-msg-typing");
        }
    });
}

// ================= DARK MODE =================

const themeToggle = document.getElementById("themeToggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggle) themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Shared with shop/index.html via the same localStorage key, so the choice carries over
applyTheme(localStorage.getItem("sks-theme") === "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
        localStorage.setItem("sks-theme", isDark ? "dark" : "light");
    });
}

// ================= PAGE LOADED =================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

console.log("Sri Krishna Steels Loaded Successfully!");

// ================= FIREBASE AUTH CHECK =================
// firebase-config.js must export `auth` (in addition to `db`) for this to work.

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in.");
        // Example: Show a "Logout" button, hide "Login" button
    } else {
        console.log("No user signed in.");
        // Example: Show "Login" button, hide "Write Data" forms
    }
});
