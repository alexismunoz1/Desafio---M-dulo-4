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
          <a class="header__ventana-enlaces enlace__portfolio" href="./portfolio.html">Portfolio</a>
          <a class="header__ventana-enlaces enlace__servicios" href="./servicios.html">Servicios</a>
          <a class="header__ventana-enlaces enlace__contacto" href="./contacto.html">Contacto</a>
          <a class="header__ventana-enlaces enlace__inicio" href="./index.html">Inicio</a>
          </div>
        </div>
        
        <div class="header__enlaces-desktop-container">
        <a class="header__enlaces-desktop enlace__portfolio" href="./portfolio.html">Portfolio</a>
        <a class="header__enlaces-desktop enlace__servicios" href="./servicios.html">Servicios</a>
        <a class="header__enlaces-desktop enlace__contacto" href="./contacto.html">Contacto</a>
        <a class="header__enlaces-desktop enlace__inicio" href="./index.html">Inicio</a>
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
