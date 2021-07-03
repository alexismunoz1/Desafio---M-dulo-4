function formComponent(el) {
  const formEl = document.createElement("div");

  formEl.innerHTML = `
    <div class="seccion__formulario__contenedor">
    <h5 class="seccion__formulario-title">Escribime</h5>

    <form class="seccion__formulario-container">
      <label>
        <span class="seccion__formulario-label">NOMBRE</span>
        <input class="seccion__formulario__input" name="nombre" type="text" />
      </label>

      <label>
        <span class="seccion__formulario-label">EMAIL</span>
        <input class="seccion__formulario__input" name="email" type="text" />
      </label>

      <label>
        <span class="seccion__formulario-label">MENSAJE</span>
        <textarea class="seccion__formulario__input-textarea" name="mensaje"></textarea>
      </label>

      <div class="seccion__formulario__submit">
        <button class="seccion__formulario__submit-button">Enviar</button>
      </div>
    </form>
  </div> `;

  el.appendChild(formEl);
  enviarInfoForm(formEl);
}

function enviarInfoForm(formEl) {
  const formulario = formEl.querySelector(".seccion__formulario-container");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData.entries());

    var mensaje = `${dataObject.nombre} te ha enviado un mensaje! <br/>
    Mensaje: ${dataObject.mensaje} <br/>
    Mail de ${dataObject.nombre}: ${dataObject.email}`;

    fetch("https://apx-api.vercel.app/api/utils/dwf", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        to: "munozmiguelalexis@gmail.com",
        message: mensaje,
      }),
    })
      .then(() => {
        alert("Se envio el formulario");

        const inputsEl = formEl.querySelectorAll(".seccion__formulario__input");
        inputsEl.forEach((input) => {
          input.value = "";
        });

        const textareaEl = formEl.querySelector(
          ".seccion__formulario__input-textarea"
        );
        textareaEl.value = "";
      })
      .catch(() => {
        alert("Error al enviar el mensaje");
      });
  });
}
