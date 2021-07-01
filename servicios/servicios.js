function addDataServicios(params = {}) {
  const imagenCardEl = document.querySelector(".seccion__presentacion-img");
  // imagenCardEl.src = params.imagen;

  const tituloCardEl = document.querySelector(".servicios__card-title");
  tituloCardEl.textContent = params.titulo;

  const textoCardEl = document.querySelector(
    ".servicios__card-container-texto"
  );
  textoCardEl.textContent = params.texto;
}

function getDataServicios() {
  fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=segundaPaginaServicios"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);

      const fieldsCollections = data.items.map((item) => {
        return {
          imagen: item.fields.imagenCard.sys.id,
          titulo: item.fields.tituloCard,
          texto: item.fields.textoCard,
          includes: data.includes.Asset,
        };
      });

      fieldsCollections.forEach((el) => {
        const idEncontrado = searchAsset(el.imagen, el.includes);
        el.imagen = "https:" + idEncontrado.fields.file.url;
      });

      console.log(fieldsCollections);
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
}

main();
