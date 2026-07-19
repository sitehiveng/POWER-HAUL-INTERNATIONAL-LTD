/* ==========================================================================
   Power Haul International Ltd — site script
   - Injects shared header/footer (fetches components/*.html, same-origin,
     works on GitHub Pages)
   - Mobile nav + dropdown toggle
   - Floating WhatsApp button + cookie consent banner (injected globally)
   - Forms submit as a pre-filled WhatsApp message (no backend required)
   - Simple client-side site search
   - FAQ accordion
   ========================================================================== */

/* ==========================================================================
   Power Haul International Ltd — site script
   - Header/footer are now plain HTML directly in every page (no fetching)
   - Mobile nav + dropdown toggle
   - Floating WhatsApp button + cookie consent banner (injected globally)
   - Forms submit as a pre-filled WhatsApp message (no backend required)
   - Simple client-side site search
   - FAQ accordion
   ========================================================================== */

const WHATSAPP_NUMBER = "2348038144331";

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function initLayout(){
  markActiveNavLink();
  bindNavToggle();
  injectWaFloat();
  initCookieBanner();
}

function markActiveNavLink(){
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === current) a.classList.add("active");
  });
}

function bindNavToggle(){
  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if(burger && links){
    burger.addEventListener("click", ()=> links.classList.toggle("open"));
  }
  document.querySelectorAll(".has-dropdown > a").forEach(a=>{
    a.addEventListener("click", (e)=>{
      if(window.innerWidth <= 900){
        e.preventDefault();
        a.parentElement.classList.toggle("open");
      }
    });
  });
  const searchForm = document.querySelector("#nav-search-form");
  if(searchForm){
    searchForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      const q = searchForm.querySelector("input").value.trim();
      if(q) location.href = `products.html?q=${encodeURIComponent(q)}`;
    });
  }
}

/* ---------- Floating WhatsApp button ---------- */
function injectWaFloat(){
  if(document.querySelector(".wa-float")) return;
  const a = document.createElement("a");
  a.href = waLink("Hello Power Haul International, I'd like to enquire about your diesel engines.");
  a.className = "wa-float";
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label","Chat with us on WhatsApp");
  a.innerHTML = "&#9742;"; // simple phone glyph, replace with SVG/icon font if desired
  document.body.appendChild(a);
}

/* ---------- Cookie consent ---------- */
function initCookieBanner(){
  if(localStorage.getItem("phi_cookie_consent")) return;
  const bar = document.createElement("div");
  bar.className = "cookie-banner";
  bar.innerHTML = `
    <p>We use cookies to improve your experience and understand site traffic. By continuing, you agree to our
      <a href="privacy.html" style="color:var(--amber)">Privacy Policy</a>.</p>
    <div class="btn-row" style="margin:0;">
      <button class="btn btn-outline" id="cookie-decline" style="color:#fff;border-color:#fff;">Decline</button>
      <button class="btn btn-primary" id="cookie-accept">Accept</button>
    </div>`;
  document.body.appendChild(bar);
  requestAnimationFrame(()=> bar.classList.add("show"));
  bar.querySelector("#cookie-accept").addEventListener("click", ()=>{
    localStorage.setItem("phi_cookie_consent","accepted");
    bar.classList.remove("show");
    setTimeout(()=>bar.remove(),300);
  });
  bar.querySelector("#cookie-decline").addEventListener("click", ()=>{
    localStorage.setItem("phi_cookie_consent","declined");
    bar.classList.remove("show");
    setTimeout(()=>bar.remove(),300);
  });
}

/* ---------- Forms -> WhatsApp ---------- */
function bindWhatsAppForm(formId, buildMessage){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const msg = buildMessage(data);
    window.open(waLink(msg), "_blank");
    form.reset();
    const note = form.querySelector(".form-success");
    if(note) note.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initLayout();

  bindWhatsAppForm("quote-form", d => (
    `*New Quote Request*\n`+
    `Name: ${d.name||"-"}\n`+
    `Company: ${d.company||"-"}\n`+
    `Phone: ${d.phone||"-"}\n`+
    `Email: ${d.email||"-"}\n`+
    `Engine Type Needed: ${d.engine_type||"-"}\n`+
    `Quantity: ${d.quantity||"-"}\n`+
    `Message: ${d.message||"-"}`
  ));

  bindWhatsAppForm("contact-form", d => (
    `*New Contact Enquiry*\n`+
    `Name: ${d.name||"-"}\n`+
    `Email: ${d.email||"-"}\n`+
    `Phone: ${d.phone||"-"}\n`+
    `Message: ${d.message||"-"}`
  ));

  bindWhatsAppForm("enquiry-form", d => (
    `*Product Enquiry*\n`+
    `Product: ${d.product||"-"}\n`+
    `Name: ${d.name||"-"}\n`+
    `Phone: ${d.phone||"-"}\n`+
    `Message: ${d.message||"-"}`
  ));

  bindWhatsAppForm("careers-form", d => (
    `*Job Application*\n`+
    `Name: ${d.name||"-"}\n`+
    `Role: ${d.role||"-"}\n`+
    `Phone: ${d.phone||"-"}\n`+
    `Email: ${d.email||"-"}\n`+
    `Message: ${d.message||"-"}`
  ));

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(q=>{
    q.addEventListener("click", ()=> q.parentElement.classList.toggle("open"));
  });
});
