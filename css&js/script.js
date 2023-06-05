// WRAPPERS
const wrapperForCards = document.querySelector(".cards");
const filterPage = document.querySelector("#Filters");
const cardsWrapper = document.querySelector(".cards");
const chooseTypeItem = document.querySelector("#chooseTypeItem");
// BUTTONS
const buttonForFilters = document.querySelector(".btn4OpenFilter");
const buttonForFiltering = document.querySelector(".btn4Filtering");
const closeBtnForFiltering = document.querySelector("#closeBtnForFiltering");
const button7 = document.querySelector("#last7");
const button14 = document.querySelector("#last14");
const button30 = document.querySelector("#last30");
const liveAuctioningItem = document.querySelector("#liveAuctioningItem");
// FILTER FORM
const filterTitle = document.querySelector("#filterTitle");
const wrapperForArtist = document.querySelector("#chooseArtist");
const minPrice = document.querySelector("#minPrice");
const maxPrice = document.querySelector("#maxPrice");
const wrapperForType = document.querySelector("#chooseType");

// Creating cards for visitor listing page
let PublishedItems = items.filter((el) => el.isPublished == true);
PublishedItems.forEach((el) => {
  wrapperForCards.innerHTML += `<div class="card">
                <img src="${el.image}" class="card-img-top">
                <div class="card-body">
                    <p class="card-title h3">${el.title}<button class="btn btn-sm mt-2 rounded float-right font-weight-bold">${el.price} $</button></p>
                    <p class="card-text firstp small">${el.artist}</p>
                    <p class="card-text secondp small">${el.description}</p>
                </div>
              </div>`;
});
liveAuctioningItem.addEventListener("click", () => {
  location.hash = `#auction`
});

buttonForFilters.addEventListener("click", () => {
  buttonForFilters.classList.add("d-none");
  buttonForFiltering.classList.remove("d-none");
  filterPage.classList.remove("d-none");
  cardsWrapper.classList.add("d-none");
});
closeBtnForFiltering.addEventListener("click", () => {
  buttonForFilters.classList.remove("d-none");
  buttonForFiltering.classList.add("d-none");
  filterPage.classList.add("d-none");
  cardsWrapper.classList.remove("d-none");
  filterPage.classList.remove("show");
});

buttonForFiltering.addEventListener("click", () => {
  wrapperForCards.innerHTML = ``;
  const filtered = PublishedItems.filter(
    (item) =>
      (filterTitle.value ? item.title.includes(filterTitle.value) : true) &&
      (wrapperForArtist.value
        ? item.artist === wrapperForArtist.value
        : true) &&
      (minPrice.value ? item.price >= minPrice.value : true) &&
      (maxPrice.value ? item.price <= maxPrice.value : true) &&
      (wrapperForType.value ? item.type === wrapperForType.value : true)
  );
  filtered.forEach((el) => {
    wrapperForCards.innerHTML += `<div class="card">
                                    <img src="${el.image}" class="card-img-top">
                                    <div class="card-body">
                                      <p class="card-title h3">${el.title}<button class="btn btn-sm mt-2 rounded float-right font-weight-bold">${el.price} $</button></p>
                                      <p class="card-text firstp small">${el.artist}</p>
                                      <p class="card-text secondp small">${el.description}</p>
                                    </div>
                                  </div>`;
  });
  buttonForFilters.classList.remove("d-none");
  buttonForFiltering.classList.add("d-none");
  filterPage.classList.add("d-none");
  cardsWrapper.classList.remove("d-none");
  filterTitle.value = ``;
  wrapperForArtist.value = ``;
  minPrice.value = ``;
  maxPrice.value = ``;
  wrapperForType.value = ``;
  filterPage.classList.remove("show");
});

// Adding artists and type for visitor listings filter page
function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((user) => {
        let username = document.createElement("option");
        username.innerText = `${user.name}`;
        username.setAttribute("value", `${user.name}`);
        username.classList.add("small");
        let username1 = username.cloneNode(true);
        chooseArtist.appendChild(username1);
        let username2 = username.cloneNode(true);
        chooseLanding.appendChild(username2);
      });
    });
}
function findTypes() {
  const types = new Set(items.map((obj) => obj.type));
  types.forEach((el) => {
    let option = document.createElement("option");
    option.innerHTML = el;
    wrapperForType.appendChild(option);
    let option1 = option.cloneNode(true);
    chooseTypeItem.appendChild(option1);
  });
}

window.addEventListener("load", fetchUsers);
window.addEventListener("load", findTypes);
