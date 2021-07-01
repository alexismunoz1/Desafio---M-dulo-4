function footerComponent(el) {
  const footerEl = document.createElement("div");

  footerEl.innerHTML = `
    <div class="footer__container">
    <div class="footer__logo-container">
      <p class="footer__logo">ALEXIS</p>
    </div>
    <div class="footer__social-media-container">
      <img class="footer__social-media instagram" src="" alt="">
      <img class="footer__social-media linkedin" src="" alt="">
      <img class="footer__social-media github" src="" alt="">
    </div>
  </div>`;

  el.appendChild(footerEl);
}

function addDataSocialMedia(params = {}) {
  const instagramEl = document.querySelector(".instagram");
  instagramEl.src = params.instagram;

  const linkedinEl = document.querySelector(".linkedin");
  linkedinEl.src = params.linkedin;

  const githubEl = document.querySelector(".github");
  githubEl.src = params.gitHub;
}

function getDataSocialMedia() {
  return fetch(
    "https://cdn.contentful.com/spaces/ljcia83x15yc/environments/master/entries?access_token=v_nPdvAEDrj2nnIiY0knN-VNduD6kd2ggsIn-_LXxFc&content_type=dwfM4SocialMedia"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const assetCollections = data.includes.Asset;

      const instagramEl = assetCollections.find((el) => {
        return el.fields.title == "instagram";
      });

      const linkedinEl = assetCollections.find((el) => {
        return el.fields.title == "linkedin";
      });

      const gitHubEl = assetCollections.find((el) => {
        return el.fields.title == "github";
      });

      return {
        instagram: "https:" + instagramEl.fields.file.url,
        linkedin: "https:" + linkedinEl.fields.file.url,
        gitHub: "https:" + gitHubEl.fields.file.url,
      };
    });
}

function main() {
  getDataSocialMedia().then((data) => {
    addDataSocialMedia(data);
  });
}
main();
