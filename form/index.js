function formComponent(el) {
  const formEl = document.createElement("div");

  formEl.innerHTML = `
    <div class="seccion__formulario__contenedor">
    <h5 class="seccion__formulario-title">Escribime</h5>

    <div class="seccion__formulario-container">
      <label>
        <h6 class="seccion__formulario-label">NOMBRE</h6>
        <input class="seccion__formulario__input" type="text" />
      </label>

      <label>
        <h6 class="seccion__formulario-label">EMAIL</h6>
        <input class="seccion__formulario__input" type="text" />
      </label>

      <label>
        <h6 class="seccion__formulario-label">MENSAJE</h6>
        <textarea class="seccion__formulario__input-textarea"></textarea>
      </label>

      <div class="seccion__formulario__submit">
        <button class="seccion__formulario__submit-button">Enviar</button>
      </div>
    </div>
  </div> `;

  const formulario = formEl.querySelector(".seccion__formulario-container");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("El formulario se envió");
  });

  el.appendChild(formEl);
}
