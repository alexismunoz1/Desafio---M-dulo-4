function addDataFondo(params = {}) {
  const fondoHeaderEl = document.querySelector(".header__container");
  const fondoMainEl = document.querySelector(".seccion__main");

  const mediaqueryList = window.matchMedia("(min-width: 769px)");

  if (mediaqueryList.matches) {
    fondoHeaderEl.style.backgroundImage = `url(${params.fondoPantalla})`;
    fondoMainEl.style.backgroundImage = `url(${params.fondoPantalla})`;
  } else {
    fondoHeaderEl.style.backgroundImage = "none";
    fondoMainEl.style.backgroundImage = "none";
  }

  window.addEventListener("resize", () => {
    if (mediaqueryList.matches) {
      fondoHeaderEl.style.backgroundImage = `url(${params.fondoPantalla})`;
      fondoMainEl.style.backgroundImage = `url(${params.fondoPantalla})`;
    } else {
      fondoHeaderEl.style.backgroundImage = "none";
      fondoMainEl.style.backgroundImage = "none";
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
        return el.fields.title == "gradient-celeste-anaranjado";
      });

      return {
        fondoPantalla: "https:" + tituloFondoPantalla.fields.file.url,
      };
    });
}

function addDataServicios(params = {}) {
  const template = document.querySelector("#seccion__servicios-template");
  const container = document.querySelector(".seccion__servicios");

  template.content.querySelector(".servicios__card-img").src = params.imagen;

  template.content.querySelector(".servicios__card-title").textContent =
    params.titulo;

  template.content.querySelector(".servicios__card-texto").textContent =
    params.texto;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getDataServicios() {
  return fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=segundaPaginaServicios"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const fieldsCollections = data.items.map((item) => {
        return {
          imagen: item.fields.imagenCard.sys.id,
          titulo: item.fields.tituloCard,
          texto: item.fields.textoCard,
          includes: data.includes.Asset,
        };
      });

      fieldsCollections.forEach((el) => {
        const idImgCard = searchAsset(el.imagen, el.includes);
        el.imagen = "https:" + idImgCard.fields.file.url;
      });

      return fieldsCollections;
    });
}

function searchAsset(assetId, includes) {
  return includes.find((inc) => {
    return inc.sys.id == assetId;
  });
}

function main() {
  headerComponent(document.querySelector(".header"));
  activarDesactivarMenu();
  footerComponent(document.querySelector(".footer"));

  getDataServicios().then((data) => {
    for (const d of data) {
      addDataServicios(d);
    }
  });

  getDataFondo().then((data) => {
    addDataFondo(data);
  });
}

main();
