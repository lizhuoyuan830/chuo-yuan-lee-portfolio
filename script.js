const view = document.querySelector("#view");
const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector(".menu-button");
const menuLinks = [...document.querySelectorAll(".menu a")];
const languageButtons = [...document.querySelectorAll(".language-toggle")];
const siteNameNodes = [...document.querySelectorAll(".site-name")];
const refreshIndicator = document.createElement("div");

let language = localStorage.getItem("portfolio-language") || "zh";
let pullStartY = 0;
let pullDistance = 0;
let isPulling = false;

const labels = {
  zh: {
    home: "\u9996\u9801",
    biography: "\u5c65\u6b77",
    artworks: "\u4f5c\u54c1",
    films: "\u5f71\u7247",
    contact: "\u806f\u7d61",
    language: "\u4e2d / EN",
    previous: "\u4e0a\u4e00\u5f35",
    next: "\u4e0b\u4e00\u5f35",
    role: "\u651d\u5f71\u5e2b   /   \u5c0e\u6f14",
    based: "\u5e38\u99d0\u5730  \u4e0a\u6d77  \u897f\u5b89",
    selectedWorks: "\u7cbe\u9078\u4f5c\u54c1",
    viewSeries: "\u9032\u5165\u7cfb\u5217",
    imageCount: "\u5f35\u7167\u7247",
    refresh: "\u9b06\u958b\u5237\u65b0",
    back: "\u8fd4\u56de",
  },
  en: {
    home: "HOME",
    biography: "BIOGRAPHY",
    artworks: "ARTWORKS",
    films: "FILMS",
    contact: "CONTACT",
    language: "EN / \u4e2d",
    previous: "Previous",
    next: "Next",
    role: "Photographer   /   Director",
    based: "Based in  Shanghai  Xi'an",
    selectedWorks: "Selected Works",
    viewSeries: "Enter Series",
    imageCount: "images",
    refresh: "Release to refresh",
    back: "Back",
  },
};

const photoRoot = "\u7167\u7247";
const homeImage = `${photoRoot}/\u4e3b\u9875\u7167\u7247/bdf75453aa8ade51069aa63dacc5dbfe.jpg`;
const bioImage = `${photoRoot}/\u5c65\u5386\u7167\u7247/\u5fae\u4fe1\u56fe\u7247_20241031012412.jpg`;
const mainlandDir = `${photoRoot}/\u4f5c\u54c1-\u4e2d\u56fd\u5185\u5730\u62cd\u6444`;
const taiwanHongKongDir = `${photoRoot}/\u4f5c\u54c1-\u4e2d\u56fd\u53f0\u6e7e\u9999\u6e2f\u62cd\u6444`;
const japanDir = `${photoRoot}/\u4f5c\u54c1-\u65e5\u672c\u62cd\u6444`;
const southeastAsiaDir = `${photoRoot}/\u4f5c\u54c1-\u4e1c\u5357\u4e9a\u62cd\u6444`;
const filmDir = "\u5f71\u7247/\u5f71\u7247\u4f5c\u54c1";

const mainlandImages = [
  `${mainlandDir}/0a78cef6d743c6a693f4c4066d918ca7.jpg`,
  `${mainlandDir}/5ea1bd3283e8128904b1eac851b5d1e5.jpg`,
  `${mainlandDir}/bdf75453aa8ade51069aa63dacc5dbfe.jpg`,
  `${mainlandDir}/e717fdade3e72b6f97cabeb60262bf75.jpg`,
  `${mainlandDir}/fbd344b5218865a35cbc9ccf692a68df.jpg`,
];

const taiwanHongKongImages = [
  `${taiwanHongKongDir}/3e494e660ad74b7e413ad05829653627.jpg`,
  `${taiwanHongKongDir}/DSC06418.jpg`,
  `${taiwanHongKongDir}/DSC06424.jpg`,
  `${taiwanHongKongDir}/DSC06534.jpg`,
  `${taiwanHongKongDir}/DSC06700.jpg`,
  `${taiwanHongKongDir}/DSC06701.jpg`,
  `${taiwanHongKongDir}/DSC06735.jpg`,
  `${taiwanHongKongDir}/DSC07693.jpg`,
  `${taiwanHongKongDir}/DSC07805.jpg`,
  `${taiwanHongKongDir}/DSC07808.jpg`,
  `${taiwanHongKongDir}/DSC07816.jpg`,
  `${taiwanHongKongDir}/DSC08009.jpg`,
  `${taiwanHongKongDir}/DSC08059.jpg`,
];

const japanImages = [
  `${japanDir}/DSC00897.jpg`,
  `${japanDir}/DSC00779.jpg`,
  `${japanDir}/DSC00787.jpg`,
  `${japanDir}/DSC00803.jpg`,
  `${japanDir}/DSC00828.jpg`,
  `${japanDir}/DSC00855.jpg`,
  `${japanDir}/DSC00859.jpg`,
  `${japanDir}/DSC00863.jpg`,
  `${japanDir}/DSC00870.jpg`,
  `${japanDir}/DSC00874.jpg`,
  `${japanDir}/DSC00885.jpg`,
  `${japanDir}/DSC00889.jpg`,
  `${japanDir}/DSC00892.jpg`,
  `${japanDir}/DSC00894.jpg`,
  `${japanDir}/DSC00912.jpg`,
  `${japanDir}/DSC00918.jpg`,
  `${japanDir}/DSC00945.jpg`,
  `${japanDir}/DSC00997.jpg`,
  `${japanDir}/DSC01011.jpg`,
  `${japanDir}/DSC01013.jpg`,
  `${japanDir}/DSC01034.jpg`,
  `${japanDir}/DSC01048.jpg`,
  `${japanDir}/DSC01115.jpg`,
  `${japanDir}/DSC01116.jpg`,
  `${japanDir}/DSC01118.jpg`,
  `${japanDir}/DSC01119.jpg`,
  `${japanDir}/DSC01126.jpg`,
  `${japanDir}/DSC01137.jpg`,
  `${japanDir}/DSC01140.jpg`,
  `${japanDir}/DSC01144.jpg`,
  `${japanDir}/DSC01173.jpg`,
  `${japanDir}/DSC01186.jpg`,
  `${japanDir}/DSC01211.jpg`,
  `${japanDir}/DSC01218.jpg`,
  `${japanDir}/DSC01223.jpg`,
  `${japanDir}/DSC01239.jpg`,
  `${japanDir}/DSC01247.jpg`,
];

const southeastAsiaImages = [
  `${southeastAsiaDir}/DSC01556.jpg`,
  `${southeastAsiaDir}/0a25a71059a71c368b1b90f837db737c.jpg`,
  `${southeastAsiaDir}/255f93b6f86fa710d99dc36e843c73b0.jpg`,
  `${southeastAsiaDir}/68fe8a9942cd76c12a7985503369a503.jpg`,
  `${southeastAsiaDir}/fccf208003695f31b98e874f1ab78d10.jpg`,
];

const artworks = [
  {
    id: "MainlandChina",
    value: { zh: "\u4e2d\u570b\u5167\u5730\u62cd\u651d", en: "Mainland China" },
    name: "Mainland China",
    cover: mainlandImages[0],
    images: mainlandImages,
  },
  {
    id: "TaiwanHongKong",
    value: { zh: "\u4e2d\u570b\u81fa\u7063/\u9999\u6e2f\u62cd\u651d", en: "Taiwan / Hong Kong, China" },
    name: "Taiwan / Hong Kong, China",
    cover: taiwanHongKongImages[0],
    images: taiwanHongKongImages,
  },
  {
    id: "Japan",
    value: { zh: "\u65e5\u672c\u62cd\u651d", en: "Japan" },
    name: "Japan",
    cover: japanImages[0],
    images: japanImages,
  },
  {
    id: "SoutheastAsia",
    value: { zh: "\u6771\u5357\u4e9e\u62cd\u651d", en: "Southeast Asia" },
    name: "Southeast Asia",
    cover: southeastAsiaImages[0],
    images: southeastAsiaImages,
  },
];

const films = [
  { title: { zh: "\u5f71\u7247\u4f5c\u54c1 01", en: "Film Work 01" }, url: `${filmDir}/01.mp4` },
  { title: { zh: "\u5f71\u7247\u4f5c\u54c1 02", en: "Film Work 02" }, url: `${filmDir}/02.mp4` },
  { title: { zh: "\u5f71\u7247\u4f5c\u54c1 03", en: "Film Work 03" }, url: `${filmDir}/03.mp4` },
];

const contact = [
  ["Email", "lizhuoyuan830@gmail.com", "mailto:lizhuoyuan830@gmail.com"],
  ["Instagram", "lizhuoyuan830", "https://www.instagram.com/lizhuoyuan830"],
];

const nameMarkup = () =>
  language === "zh"
    ? `<span class="name-lockup"><span class="name-zh">\u674e\u5353\u9060</span><span class="name-en">Chuo-y\u00fcan Lee</span></span>`
    : `<span class="name-lockup name-lockup-en"><span class="name-zh">Chuo-y\u00fcan Lee</span></span>`;

const text = (value) => (typeof value === "string" ? value : value[language] || value.en || value.zh);

const image = (src, alt = "") =>
  `<div class="thumb" data-placeholder=""><img src="${src}" alt="${alt}"></div>`;

const getRoute = () => {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, queryString = ""] = raw.split("?");
  const query = Object.fromEntries(new URLSearchParams(queryString));
  return { path, query };
};

const pageTitle = (key) => `<h1 class="page-title">${labels[language][key] || key}<span>${language === "zh" ? labels.en[key] || key : ""}</span></h1>`;

const artworkMeta = (item) => `
  <h2>${text(item.value)}</h2>
  <div>${item.name}</div>
`;

const carousel = (images, index = 0) => {
  const safeIndex = Math.max(0, Math.min(Number(index) || 0, images.length - 1));
  const currentImage = images[safeIndex];
  return `
    <div class="carousel" data-index="${safeIndex}">
      <figure class="carousel-frame">
        <img src="${currentImage}" alt="">
      </figure>
      <div class="carousel-controls">
        <button type="button" data-carousel="prev">${labels[language].previous}</button>
        <span>${safeIndex + 1} / ${images.length}</span>
        <button type="button" data-carousel="next">${labels[language].next}</button>
      </div>
    </div>
  `;
};

const renderHome = () => `
  <section class="home">
    <div class="home-copy">
      <div>
        <h1 class="home-name">${language === "zh" ? "\u674e\u5353\u9060" : `<span class="nowrap">Chuo-y\u00fcan</span><br>Lee`}</h1>
        ${language === "zh" ? `<div class="home-name-en">Chuo-y\u00fcan Lee</div>` : ""}
      </div>
      <div class="home-meta">
        <div>${labels[language].role}</div>
        <div>${labels[language].based}</div>
      </div>
    </div>
    <figure class="home-frame">
      <img src="${homeImage}" alt="home">
    </figure>
  </section>
`;

const renderBiography = () => `
  <article class="max-page">
    ${pageTitle("biography")}
    <div class="bio-layout">
      <img class="bio-photo" src="${bioImage}" alt="profile">
      <section class="bio-section">
        <h1 class="page-title">${nameMarkup()}</h1>
        <div class="bio-role">${labels[language].role}</div>
        <ul>
          <li>${language === "zh" ? "\u897f\u5317\u653f\u6cd5\u5927\u5b78  \u672c\u79d1" : "Northwest University of Political Science and Law  Bachelor"}</li>
          <li>${language === "zh" ? "\u4e16\u65b0\u5927\u5b78  \u7814\u4fee" : "Shih Hsin University  Visiting Study"}</li>
          <li>${labels[language].based}</li>
        </ul>
      </section>
    </div>
  </article>
`;

const renderArtworks = () => `
  <section class="page artworks">
    ${pageTitle("artworks")}
    <div class="artwork-index">
      ${artworks
        .map((item) => `
          <a class="artwork-card" href="#/artwork-group/${item.id}">
            <div class="row-preview"><img src="${item.cover}" alt="${item.name}"></div>
            <div class="tile-caption">
              <h2 class="row-title">${text(item.value)}</h2>
              <div class="row-en">${item.name}</div>
            </div>
          </a>
        `)
        .join("")}
    </div>
  </section>
`;

const renderArtworkGroup = (id) => {
  const item = artworks.find((artwork) => artwork.id === id) || artworks[0];
  return `
    <section class="detail-wrap">
      <a class="back-link" href="#/artworks">${labels[language].back}</a>
      <h1 class="detail-head"><a href="#/artworks">${labels[language].artworks}</a><span>${labels[language].viewSeries}</span></h1>
      <div class="group-meta">${artworkMeta(item)}</div>
      <div class="thumb-strip">
        ${item.images.map((src, index) => `<a href="#/artwork/${item.id}?index=${index}"><img class="strip-image" src="${src}" alt=""></a>`).join("")}
      </div>
    </section>
  `;
};

const renderArtworkDetail = (id, query) => {
  const item = artworks.find((artwork) => artwork.id === id) || artworks[0];
  return `
    <section class="detail-wrap">
      <a class="back-link" href="#/artwork-group/${item.id}">${labels[language].back}</a>
      <h1 class="detail-head"><a href="#/artwork-group/${item.id}">${text(item.value)}</a><span>${item.name}</span></h1>
      <div class="detail-layout">
        <aside class="detail-meta">${artworkMeta(item)}</aside>
        <div class="detail-media">${carousel(item.images, query.index)}</div>
      </div>
    </section>
  `;
};

const renderFilms = () => `
  <section class="page films">
    ${pageTitle("films")}
    <div class="video-grid">
      ${films.map((item) => `
        <article class="video-card">
          <video src="${item.url}" controls preload="metadata"></video>
          <h2><a href="${item.url}" target="_blank">${text(item.title)}</a></h2>
        </article>
      `).join("")}
    </div>
  </section>
`;

const renderContact = () => `
  <section class="max-page">
    ${pageTitle("contact")}
    <ul class="contact-list">
      ${contact.map(([name, value, url]) => `
        <li>
          <strong>${name}:</strong>
          ${url ? `<a href="${url}" target="_blank">${value}</a>` : `<span>${value || ""}</span>`}
        </li>
      `).join("")}
    </ul>
  </section>
`;

const markLoadedImages = () => {
  document.querySelectorAll(".thumb").forEach((thumb) => {
    const img = thumb.querySelector("img");
    if (!img) return;
    const loaded = () => thumb.classList.add("loaded");
    if (img.complete && img.naturalWidth > 0) loaded();
    img.addEventListener("load", loaded, { once: true });
  });
};

const wireCarousel = () => {
  document.querySelectorAll(".carousel").forEach((carouselNode) => {
    const frame = carouselNode.querySelector(".carousel-frame");
    const buttons = carouselNode.querySelectorAll("[data-carousel]");
    const currentRoute = getRoute();
    const id = currentRoute.path.split("/").pop();
    const source = artworks.find((item) => item.id === id);
    if (!source) return;

    let index = Number(carouselNode.dataset.index) || 0;
    const draw = () => {
      frame.innerHTML = `<img src="${source.images[index]}" alt="">`;
      carouselNode.querySelector(".carousel-controls span").textContent = `${index + 1} / ${source.images.length}`;
      history.replaceState(null, "", `#/artwork/${source.id}?index=${index}`);
    };
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        index += button.dataset.carousel === "next" ? 1 : -1;
        if (index < 0) index = source.images.length - 1;
        if (index >= source.images.length) index = 0;
        draw();
      });
    });
  });
};

const setActiveMenu = (path) => {
  const root = path.split("/")[1] || "";
  menuLinks.forEach((link) => {
    const menuRoot = link.hash.replace("#/", "").split("/")[0];
    link.classList.toggle("active", menuRoot === root || (root === "" && menuRoot === ""));
  });
};

const syncLanguageUI = () => {
  document.documentElement.lang = language === "zh" ? "zh-Hant" : "en";
  document.title = language === "zh" ? "\u674e\u5353\u9060 Chuo-y\u00fcan Lee | Photographer" : "Chuo-y\u00fcan Lee | Photographer";
  languageButtons.forEach((button) => {
    button.textContent = labels[language].language;
  });
  menuLinks.forEach((link) => {
    const key = link.dataset.key;
    link.textContent = labels[language][key];
  });
  siteNameNodes.forEach((node) => {
    node.innerHTML = nameMarkup();
  });
};

const setupPullRefresh = () => {
  refreshIndicator.className = "pull-refresh";
  refreshIndicator.textContent = labels[language].refresh;
  document.body.appendChild(refreshIndicator);

  window.addEventListener("touchstart", (event) => {
    if (window.scrollY !== 0 || event.touches.length !== 1) return;
    pullStartY = event.touches[0].clientY;
    pullDistance = 0;
    isPulling = true;
  }, { passive: true });

  window.addEventListener("touchmove", (event) => {
    if (!isPulling) return;
    pullDistance = event.touches[0].clientY - pullStartY;
    if (pullDistance <= 18) {
      refreshIndicator.classList.remove("visible");
      return;
    }
    refreshIndicator.classList.add("visible");
    refreshIndicator.style.transform = `translateX(-50%) translateY(${Math.min(pullDistance - 18, 58)}px)`;
  }, { passive: true });

  window.addEventListener("touchend", () => {
    if (!isPulling) return;
    isPulling = false;
    refreshIndicator.classList.remove("visible");
    refreshIndicator.style.transform = "";
    if (pullDistance > 96 && window.scrollY === 0) window.location.reload();
  });
};

const render = () => {
  syncLanguageUI();
  refreshIndicator.textContent = labels[language].refresh;
  const { path, query } = getRoute();
  const parts = path.split("/").filter(Boolean);
  const [section, id] = parts;
  document.body.classList.toggle("route-home", !section);

  if (!section) view.innerHTML = renderHome();
  else if (section === "biography") view.innerHTML = renderBiography();
  else if (section === "artworks") view.innerHTML = renderArtworks();
  else if (section === "artwork-group") view.innerHTML = renderArtworkGroup(id);
  else if (section === "artwork") view.innerHTML = renderArtworkDetail(id, query);
  else if (section === "films") view.innerHTML = renderFilms();
  else if (section === "contact") view.innerHTML = renderContact();
  else view.innerHTML = renderHome();

  setActiveMenu(path);
  sidebar.classList.remove("open");
  window.scrollTo(0, 0);
  markLoadedImages();
  wireCarousel();
};

menuButton.addEventListener("click", () => sidebar.classList.toggle("open"));
languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    language = language === "zh" ? "en" : "zh";
    localStorage.setItem("portfolio-language", language);
    render();
  });
});
window.addEventListener("hashchange", render);
setupPullRefresh();
render();
