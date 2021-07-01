function headerComponent(el) {
  const headerEl = document.createElement("div");

  headerEl.innerHTML = `
        <div class="header__container">
        <div class="header__container-logo">
          <p class="header__logo">ALEXIS</p>
        </div>
        <div class="header__menu-btn">
         <i></i>
         <i></i>
         <i></i>
        </div>

        <div class="header__ventana">
          <div class="header__ventana-container">
            <a class="header__ventana-enlaces" href="./index.html">Portfolio</a>
            <a class="header__ventana-enlaces" href="./servicios.html">Servicios</a>
            <a class="header__ventana-enlaces" href="#">Contacto</a>
          </div>
        </div>
        
        <div class="header__enlaces-desktop-container">
          <a class="header__enlaces-desktop" href="./index.html">Portfolio</a>
          <a class="header__enlaces-desktop" href="./servicios.html">Servicios</a>
          <a class="header__enlaces-desktop" href="">Contacto</a>
        </div>
      </div>`;

  el.appendChild(headerEl);
}

function activarDesactivarMenu() {
  const boton = document.querySelector(".header__menu-btn");
  const ventana = document.querySelector(".header__ventana");

  boton.addEventListener("click", () => {
    boton.classList.toggle("active");

    if (boton.className == "header__menu-btn active") {
      ventana.style.right = 0;
    } else {
      ventana.style.right = "-200vh";
    }
  });
}