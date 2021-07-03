function addDataFondoContacto(params = {}) {
  const tituloEl = document.querySelector(".seccion__formulario-title");
  tituloEl.textContent = "Contacto";

  const fondoHeaderEl = document.querySelector(".header__container");
  const fondoContactoEl = document.querySelector(".seccion__formulario__contenedor");

  const mediaqueryList = window.matchMedia("(min-width: 769px)");

  if (mediaqueryList.matches) {
    fondoContactoEl.style.backgroundImage = `url(${params.fondoPantalla})`;
    fondoHeaderEl.style.backgroundImage = `url(${params.fondoPantalla})`;
  } else {
    fondoHeaderEl.style.background = "#000000";
    fondoContactoEl.style.background = "#000000";
  }

  window.addEventListener("resize", () => {
    if (mediaqueryList.matches) {
      fondoContactoEl.style.backgroundImage = `url(${params.fondoPantalla})`;
      fondoHeaderEl.style.backgroundImage = `url(${params.fondoPantalla})`;
    } else {
      fondoHeaderEl.style.background = "#000000";
      fondoContactoEl.style.background = "#000000";
    }
  });
}

function getDataFondo() {
  return fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=dwfM4Fondos"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const assetCollections = data.includes.Asset;

      const tituloFondoPantalla = assetCollections.find((el) => {
        return el.fields.title == "gradient-violeta-rojo-naranja";
      });

      return {
        fondoPantalla: "https:" + tituloFondoPantalla.fields.file.url,
      };
    });
}

function main() {
  headerComponent(document.querySelector(".header"));
  activarDesactivarMenu();
  formComponent(document.querySelector(".seccion__form"));
  footerComponent(document.querySelector(".footer"));

  getDataFondo().then((data) => {
    addDataFondoContacto(data);
  });
}
main();
