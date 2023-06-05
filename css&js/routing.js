// PAGES AND ICONS
const auctionIcon = document.querySelector(".auctionIcon");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const logo = document.querySelector(".logo");
const title1 = document.querySelector(".title");
const allPages = document.querySelectorAll("section");
const landingPage = document.querySelector("#landingPage");
const visitorPage = document.querySelector("#visitorPage");
const visitorListingPage = document.querySelector("#visitorListingPage");
const visitorsFilters = document.querySelector("#visitorsFilters");
const artistHomePage = document.querySelector("#artistHomePage");
const auctionPage = document.querySelector("#auctionPage");

// BUTTONS FOR VISITOR/LISTING
// auctionIcon.addEventListener("click", () => {
//   location.reload();
// });
function clearingDom() {
  auctionIcon.classList.add("d-none");
  hamburgerMenu.classList.add("d-none");
  allPages.forEach((el) => {
    el.classList.add("d-none");
    title1.style.marginLeft = "0";
  });
  title1.innerHTML = `Street ARTists`;
}
function preparingLandingPage() {
  landingPage.classList.remove("d-none");
}
function RoutingHandler() {
  let hash = location.hash;

  switch (hash) {
    case ``:
      clearingDom();
      preparingLandingPage();
      logo.classList.add("d-none");
      landingPage.classList.remove("d-none");
      title1.style.marginLeft = "50px";
      break;
    case `#visitor`:
      if (localStorage.getItem("currentArtistPage")) {
        localStorage.removeItem("currentArtistPage");
      }
      clearingDom();
      visitorPage.classList.remove("d-none");
      auctionIcon.classList.remove("d-none");
      logo.classList.remove("d-none");
      title.innerText = `StreetArt`;
      title.style.marginRight = `60px`;
      // location.reload();
      break;
    case `#artists`:
      clearingDom();
      artistHomePage.classList.remove("d-none");
      hamburgerMenu.classList.remove("d-none");
      logo.classList.remove("d-none");
      title1.innerHTML = localStorage.getItem("currentArtistPage");
      if (title1.innerText == "Nicholas Runolfsdottir V") {
        title1.style.paddingLeft = "60px";
      }
      if (title1.innerText == "Clementina DuBuque") {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Mrs. Dennis Schulist`) {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Clementine Bauch`) {
        title1.style.paddingLeft = "40px";
      }
      break;
    case `#visitor/listing`:
      clearingDom();
      visitorListingPage.classList.remove("d-none");
      auctionIcon.classList.remove("d-none");
      title.innerText = `StreetArt`;
      title.style.marginRight = `60px`;
      break;
    case `#artists/items`:
      clearingDom();
      artistItemsPageHandler();
      artistItemsPage.classList.remove("d-none");
      hamburgerMenu.classList.remove("d-none");
      logo.classList.remove("d-none");
      title1.innerHTML = localStorage.getItem("currentArtistPage");
      if (title1.innerText == "Nicholas Runolfsdottir V") {
        title1.style.paddingLeft = "60px";
      }
      if (title1.innerText == "Clementina DuBuque") {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Mrs. Dennis Schulist`) {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Clementine Bauch`) {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Patricia Lebsack`) {
        title1.style.paddingLeft = "60px";
      }
      break;
    case `#auction`:
      clearingDom();
      if (localStorage.getItem("currentArtistPage")) {
        hamburgerMenu.classList.remove("d-none");
      }
      logo.classList.remove("d-none");
      title1.innerHTML =
        localStorage.getItem("currentArtistPage") || `StreetArt`;
      if (title1.innerText == "Nicholas Runolfsdottir V") {
        title1.style.paddingLeft = "60px";
      }
      if (title1.innerText == "Clementina DuBuque") {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Mrs. Dennis Schulist`) {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Clementine Bauch`) {
        title1.style.paddingLeft = "40px";
      }
      if (title1.innerText == `Patricia Lebsack`) {
        title1.style.paddingLeft = "40px";
      }
      auctionPage.classList.remove("d-none");
  }
}
artistLandingBtn.addEventListener("click", (e) => {
  if (choosingArtistSelect.value == ``) {
    return;
  }
  artist = choosingArtistSelect.value;
  localStorage.setItem("currentArtistPage", artist);
  location.hash = `artists`;
});

window.addEventListener("hashchange", RoutingHandler);
window.addEventListener("load", RoutingHandler);
