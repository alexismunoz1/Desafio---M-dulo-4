function addDataBienvenidaPresentacion(params = {}) {
  const titulo = document.querySelector(".main__title");
  titulo.textContent = params.titulo;

  const imgPresentacion = document.querySelector(".seccion__presentacion-img");
  imgPresentacion.src = params.imgPresentacion;

  const seccionUnoSubtitulo = document.querySelector(
    ".seccion__presentacion-title"
  );
  seccionUnoSubtitulo.textContent = params.subtitulo;

  const textoPresentacion = document.querySelector(
    ".seccion__presentacion-parrafo"
  );
  textoPresentacion.textContent = params.texto;

  const fondoBienvenidaHeader = document.querySelector(".header__container");
  fondoBienvenidaHeader.style.backgroundImage = `url(${params.imagenFondo})`;

  const fondoBienvenidaMain = document.querySelector(".main");
  fondoBienvenidaMain.style.backgroundImage = `url(${params.imagenFondo})`;

  const fondoServicios = document.querySelector(".seccion__servicios");
  fondoServicios.style.backgroundImage = `url(${params.imagenFondo})`;
}

function getDataBienvenidaPrecentacion() {
  return fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=dwfM4BinevenidaPresentacin"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const fieldsCollections = data.items.map((item) => {
        return {
          titulo: item.fields.titulo,
          subtitulo: item.fields.subtitulo,
          texto: item.fields.textoPresentacion,
          imagenFondo: item.fields.fondoBienvenida.sys.id,
          imgPresentacion: item.fields.userPresentacion.sys.id,
          includes: data.includes.Asset,
        };
      });

      fieldsCollections.forEach((el) => {
        const idImagenFondo = searchAsset(el.imagenFondo, el.includes);
        el.imagenFondo = "https:" + idImagenFondo.fields.file.url;

        const idImgPresentacion = searchAsset(el.imgPresentacion, el.includes);
        el.imgPresentacion = "https:" + idImgPresentacion.fields.file.url;
      });

      return fieldsCollections;
    });
}

function addDataServicios(params = {}) {
  const tituloServicios = document.querySelector(".seccion__servicios-title");
  tituloServicios.textContent = params.titulo;

  const template = document.querySelector(
    "#seccion__servicios__cards-template"
  );
  const container = document.querySelector(
    ".seccion__servicios__cards-content"
  );

  template.content.querySelector(".seccion__servicios__card-img").src =
    params.imagen;

  template.content.querySelector(
    ".seccion__servicios__card-title"
  ).textContent = params.subtitulo;

  template.content.querySelector(".seccion__servicios__card-text").textContent =
    params.texto;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getDataServicios() {
  return fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=dwfM4Servicios"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const fieldsCollections = data.items.map((item) => {
        return {
          titulo: item.fields.tituloServicios,
          subtitulo: item.fields.subtituloCardServicios,
          texto: item.fields.textoCardServicios,
          imagen: item.fields.imagenCardServicios.sys.id,
          includes: data.includes.Asset,
        };
      });

      fieldsCollections.forEach((el) => {
        const idEncontrado = searchAsset(el.imagen, el.includes);
        el.imagen = "https:" + idEncontrado.fields.file.url;
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
  getDataBienvenidaPrecentacion().then((data) => {
    for (const d of data) {
      addDataBienvenidaPresentacion(d);
    }
  });

  getDataServicios().then((data) => {
    for (const d of data) {
      addDataServicios(d);
    }
  });

  headerComponent(document.querySelector(".header"));
  activarDesactivarMenu();
  formComponent(document.querySelector(".seccion__formulario"));
  footerComponent(document.querySelector(".footer"));
}
main();
