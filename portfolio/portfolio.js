function addDataFondo(params = {}) {
  const fondoHeaderEl = document.querySelector(".header__container");
  const fondoMainEl = document.querySelector(".seccion__main");

  const mediaqueryList = window.matchMedia("(min-width: 769px)");

  if (mediaqueryList.matches) {
    fondoMainEl.style.backgroundImage = `url(${params.fondoPantalla})`;
    fondoHeaderEl.style.backgroundImage = `url(${params.fondoPantalla})`;
  } else {
    fondoHeaderEl.style.background = "inherit";
    fondoMainEl.style.background = "inherit";
  }

  window.addEventListener("resize", () => {
    if (mediaqueryList.matches) {
      fondoMainEl.style.backgroundImage = `url(${params.fondoPantalla})`;
      fondoHeaderEl.style.backgroundImage = `url(${params.fondoPantalla})`;
    } else {
      fondoHeaderEl.style.background = "inherit";
      fondoMainEl.style.background = "inherit";
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
        return el.fields.title == "gradient-celeste-azul";
      });

      return {
        fondoPantalla: "https:" + tituloFondoPantalla.fields.file.url,
      };
    });
}

function addDataTrabajos(params = {}) {
  const template = document.querySelector("#seccion__trabajos-template");
  const contenedor = document.querySelector(".seccion__trabajos");

  template.content.querySelector(".trabajos__card-img").src = params.imagen;

  template.content.querySelector(".trabajos__card-title").textContent =
    params.titulo;

  template.content.querySelector(".trabajos__card-texto").textContent =
    params.texto;

  template.content.querySelector(".trabajos__card-url").textContent =
    params.url;

  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}

function getDataTrabajos() {
  return fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=dwfM4PaginaPortfolio"
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
          url: item.fields.urlCard,
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

  getDataFondo().then((data) => {
    addDataFondo(data);
  });

  getDataTrabajos().then((data) => {
    for (const d of data) {
      addDataTrabajos(d);
    }
  });
}
main();
