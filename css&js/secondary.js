const artistLandingBtn = document.querySelector(".vector1");
const visitorLandingBtn = document.querySelector(".vector2");
const choosingArtistSelect = document.querySelector("#chooseLanding");
const hamburgerMenu1 = document.querySelector(".hamburgerMenu");
const collapseNav = document.querySelector("#collapseNav");
const logo1 = document.querySelector(".logo");
const title = document.querySelector(".title");
const totalItemsSold = document.querySelector("#totalItemsSold");
const totalIncome = document.querySelector("#totalIncome");
const cardsAristItem = document.querySelector("#cardsAristItem");
const addingNewItem = document.querySelector("#addingNewItem");
const adingItemForm = document.querySelector("#adingItemForm");
const btnCards = document.querySelector("#btnCards");
const cancelBtn = document.querySelector("#cancel");
let navItems = document.querySelectorAll(".navItem");
const takeASnapshot = document.querySelector("#takeASnapshot");
const CapturePage = document.querySelector("#artistCaptureImage");
const addNewItem = document.querySelector("#addNewItem");
const updateItem = document.querySelector("#updateItem");
const titleValue = document.querySelector("#titleValue");
const descValue = document.querySelector("#descValue");
const priceValue = document.querySelector("#priceValue");
const chooseTypeItemValue = document.querySelector("#chooseTypeItem");
const isPublished = document.querySelector("#isPublished");
const biddingForm = document.querySelector(".bidding");
let wholeAuction = document.querySelector(".auction");
let noAuction = document.querySelector(".noAuction");
let closeBtnForForm = document.querySelector("#closeBtnForForm");
let tASnapshot = document.querySelector(".width-90");
function updateItems() {
  localStorage.setItem("items", JSON.stringify(items));
}
updateItems();

artistLandingBtn.addEventListener("click", (e) => {
  if (choosingArtistSelect.value == ``) {
    return;
  }
  artist = choosingArtistSelect.value;
  localStorage.setItem("currentArtistPage", artist);
  localStorage.setItem("userType", "artist");
  location.hash = `artist`;
  artistPageHandler();
});
navItems.forEach((el) => {
  el.addEventListener("click", () => {
    collapseNav.classList.remove("show");
  });
});
visitorLandingBtn.addEventListener("click", () => {
  localStorage.setItem("userType", "visitor");
  location.hash = `#visitor`;
});

function artistPageHandler() {
  let artist = localStorage.getItem("currentArtistPage");
  title.innerHTML = artist;
  const allPicsByArtist = items.filter((el) => el.artist == artist);
  allSoldPicsByArtist = allPicsByArtist.filter((el) => el.dateSold);
  priceForSoldPics = 0;
  allSoldPicsByArtist.forEach((el) => {
    priceForSoldPics += el.priceSold;
  });
  totalItemsSold.innerText = `${allSoldPicsByArtist.length}/${allPicsByArtist.length}`;
  totalIncome.innerText = `${priceForSoldPics}$`;

  const ctx = document.getElementById("myChart");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "06.05.2023",
        "05.05.2023",
        "04.05.2023",
        "Green",
        "Purple",
        "Orange",
      ],
      datasets: [
        {
          label: "Sales Amount",
          data: [],
          backgroundColor: "#a26a5e",
          hoverBackgroundColor: "#D44C2E",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  const last7 = document.querySelector("#last7");
  last7.addEventListener("click", function () {
    const labels = generateLabels(7);
    myChart.data.labels = labels;

    const chartData = labels.map((label) =>
      allSoldPicsByArtist.reduce((acc, item) => {
        if (label === formatDate(item.dateSold)) {
          return (acc += item.priceSold);
        }

        return acc;
      }, 0)
    );
    myChart.data.datasets[0].data = chartData;
    myChart.update();
  });

  const last14 = document.querySelector("#last14");
  last14.addEventListener("click", function () {
    const labels = generateLabels(14);
    myChart.data.labels = labels;

    const chartData = labels.map((label) =>
      allSoldPicsByArtist.reduce((acc, item) => {
        if (label === formatDate(item.dateSold)) {
          return (acc += item.priceSold);
        }

        return acc;
      }, 0)
    );
    myChart.data.datasets[0].data = chartData;
    myChart.update();
  });

  const last30 = document.querySelector("#last30");
  last30.addEventListener("click", function () {
    const labels = generateLabels(30);
    myChart.data.labels = labels;

    const chartData = labels.map((label) =>
      allSoldPicsByArtist.reduce((acc, item) => {
        if (label === formatDate(item.dateSold)) {
          return (acc += item.priceSold);
        }
        return acc;
      }, 0)
    );
    myChart.data.datasets[0].data = chartData;
    myChart.update();
  });
  const lastYear = document.querySelector("#lastYear");
  lastYear.addEventListener("click", function () {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear() - 1, today.getMonth(), 1);
    const endOfYear = new Date(today.getFullYear(), today.getMonth(), 0);

    const labels = generateMonthLabels(startOfYear, endOfYear);
    myChart.data.labels = labels;
    const chartData = labels.map((label) => {
      let sum = 0;

      allSoldPicsByArtist.forEach((item) => {
        if (isInLastYear(item.dateSold) && isInMonth(item.dateSold, label)) {
          sum += item.priceSold;
        }
      });

      return sum;
    });
    myChart.data.datasets[0].data = chartData;
    myChart.update();
  });
  function generateMonthLabels(start, end) {
    const arr = [];
    let current = new Date(start);
    while (current <= end) {
      arr.push(
        current.toLocaleString("en-us", { month: "short", year: "numeric" })
      );
      current.setMonth(current.getMonth() + 1);
    }
    return arr;
  }
  function isInLastYear(date) {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear() - 1, today.getMonth(), 1);
    const endOfYear = new Date(today.getFullYear(), today.getMonth(), 0);
    return date >= startOfYear && date <= endOfYear;
  }
}
function generateLabels(daysAgo) {
  let arr = [];
  for (let i = 0; i < daysAgo; i++) {
    const today = new Date();
    const startDate = today.getDate();
    const currentDate = today.setDate(startDate - i);
    const formattedDate = formatDate(currentDate);
    arr.push(formattedDate);
  }
  return arr;
}
function formatDate(dateNumber) {
  const date = new Date(dateNumber);
  return date.toLocaleDateString("en-gb");
}

function artistItemsPageHandler() {
  let artist = localStorage.getItem("currentArtistPage");
  const allPicsByArtist = items.filter((el) => el.artist == artist);
  allPicsByArtist.forEach((item) => {
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    let img = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let btn3 = document.createElement("button");
    let btn4 = document.createElement("button");
    let btn5 = document.createElement("button");

    div1.append(img);
    div1.append(div2);
    div1.append(div3);
    div2.append(div4);
    div4.append(p1);
    div4.append(btn5);
    div2.append(p1);
    div2.append(p2);
    div2.append(p3);
    div3.append(btn1);
    div3.append(btn2);
    div3.append(btn3);
    div3.append(btn4);

    div1.classList.add("card", "my-3");
    img.classList.add("card-img-top");
    div2.classList.add("card-body");
    p1.classList.add("card-title", "h3");
    btn5.classList.add(
      "priceBtn",
      "btn",
      "btn-sm",
      "mt-2",
      "rounded",
      "float-right",
      "font-weight-bold"
    );
    p2.classList.add("small");
    p3.classList.add("card-text", "secondp", "small");
    div3.classList.add(
      "itemBtns",
      "d-flex",
      "justify-content-around",
      "py-2",
      "px-1"
    );
    btn1.classList.add("btn", "bg-primary", "text-white", "rounded", "px-2");
    if (item.isPublished) {
      btn2.classList.add("btn", "bg-success", "text-white", "rounded", "px-2");
    } else {
      btn2.classList.add("btn", "bg-dark", "text-white", "rounded", "px-2");
    }
    btn3.classList.add("btn", "bg-danger", "text-white", "rounded", "px-2");
    btn4.classList.add("btn", "editBtn", "rounded", "px-2");

    const dateString = item.dateCreated;
    const dateArray = dateString.split("T");
    const dateOnly = dateArray[0];

    img.src = item.image;
    p1.innerText = item.title;
    btn5.innerText = `${item.price}$`;
    p2.innerText = dateOnly;
    p3.innerText = item.description;
    if (localStorage.getItem("itemForAuctioning")) {
      btn1.disabled = true;
    }
    btn1.innerText = `Send to Auction`;
    if (item.isPublished) {
      btn2.innerText = "Unpublish";
    } else {
      btn2.innerText = "Publish";
    }
    btn3.innerText = `Remove`;
    btn4.innerText = `Edit`;
    cardsAristItem.append(div1);

    // BTN LISTENERS
    btn4.addEventListener("click", () => {
      titleValue.value = item.title;
      priceValue.value = item.price;
      descValue.value = item.description;
      chooseTypeItemValue.value = item.type;
      urlValue.value = item.image;
      priceValue.value = item.price;
      dateCreated = item.dateCreated;
      isPublished.value = item.isPublished;
      addNewItem.classList.add("d-none");
      updateItem.classList.remove("d-none");
      btnCards.classList.add("d-none");
      adingItemForm.classList.remove("d-none");
      updateItem.addEventListener("click", () => {
        items.splice(item.id - 1, 1, {
          id: item.id,
          title: titleValue.value,
          price: priceValue.value,
          description: descValue.value,
          type: chooseTypeItemValue.value,
          image: urlValue.value,
          price: priceValue.value,
          artist: localStorage.getItem("currentArtistPage"),
          dateCreated: new Date(),
          isPublished: isPublished.checked,
        });
        updateItems();
        location.reload();
        btnCards.classList.remove("d-none");
        adingItemForm.classList.add("d-none");
      });
    });
    btn3.addEventListener("click", () => {
      if (
        confirm("Are you sure you want to permanently delete the item?") ==
        false
      ) {
        return;
      }
      idx = items.findIndex((thing) => thing.id == item.id);
      localStorage.setItem("deletedItem", item.id);
      items.splice(idx, 1);
      updateItems();
      location.reload();
    });
    btn2.addEventListener("click", () => {
      idxPI = items.findIndex((thing) => thing.id == item.id);
      items[idxPI].isPublished = !items[idxPI].isPublished;

      if (item.isPublished == false) {
        btn2.classList = ``;
        btn2.classList.add("btn", "bg-dark", "text-white", "rounded", "px-2");
        btn2.innerText = "Publish";
      } else {
        btn2.classList = ``;
        btn2.classList.add(
          "btn",
          "bg-success",
          "text-white",
          "rounded",
          "px-2"
        );
        btn2.innerText = "Unpublish";
      }
      updateItems();
    });
    btn1.addEventListener("click", () => {
      idxPI = items.findIndex((thing) => thing.id == item.id);
      items[idxPI].isAuctioning = true;
      localStorage.setItem("itemForAuctioning", idxPI);
      location.hash = `#auction`;
      updateItems();
      location.reload();
    });
  });
}
function initCaptureImage() {
  const liveCaptureCanvas = document.querySelector("#liveCapture");
  const captureImageBtn = document.querySelector("#captureImage");
  const urlValue = document.querySelector("#urlValue");
  let newImg = document.createElement("img");
  newImg.id = `capturedImage`;
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
      },
    })
    .then((stream) => {
      liveStream.srcObject = stream;
    });
  liveStream.addEventListener("canplay", function () {
    liveCaptureCanvas.width = liveStream.videoWidth;
    liveCaptureCanvas.height = liveStream.videoHeight;
  });
  captureImageBtn.addEventListener("click", function () {
    const ctx = liveCaptureCanvas.getContext("2d");
    ctx.drawImage(liveStream, 0, 0);
    const imageDataUrl = liveCaptureCanvas.toDataURL("image/png");
    newImg.src = imageDataUrl;
    adingItemForm.classList.remove("d-none");
    CapturePage.classList.add("d-none");
    takeASnapshot.innerHTML = ``;
    takeASnapshot.append(newImg);
    urlValue.value = imageDataUrl;
  });
}

addingNewItem.addEventListener("click", () => {
  btnCards.classList.add("d-none");
  adingItemForm.classList.remove("d-none");
  tASnapshot.classList.remove("d-none");
});
closeBtnForForm.addEventListener("click", () => {
  btnCards.classList.add("d-none");
  adingItemForm.classList.remove("d-none");
  tASnapshot.classList.add("d-none");
});

// const titleValue = document.querySelector("#titleValue");
// const descValue = document.querySelector("#descValue");
// const priceValue = document.querySelector("#priceValue");
// const isPublished = document.querySelector("#isPublished");
addNewItem.addEventListener("click", (e) => {
  items.push({
    id: new Date().valueOf(),
    title: titleValue.value,
    price: priceValue.value,
    description: descValue.value,
    type: chooseTypeItemValue.value,
    image: urlValue.value,
    price: priceValue.value,
    artist: localStorage.getItem("currentArtistPage"),
    dateCreated: new Date(),
    isPublished: isPublished.checked,
  });
  updateItems();
  location.hash = `#artists/items`;
  location.reload();
  btnCards.classList.remove("d-none");
  adingItemForm.classList.add("d-none");
});
cancelBtn.addEventListener("click", () => {
  btnCards.classList.remove("d-none");
  adingItemForm.classList.add("d-none");
  takeASnapshot.innerHTML = ` <i class="fa-solid fa-camera fa-3x"></i>
                              <p class="m-0">Take a snapshot</p>`;
  urlValue.value = ``;
  titleValue.value = ``;
  descValue.value = ``;
  priceValue.value = ``;
  isPublished.checked = false;
});
takeASnapshot.addEventListener("click", () => {
  adingItemForm.classList.add("d-none");
  initCaptureImage();
  CapturePage.classList.remove("d-none");
  tASnapshot.classList.remove("d-none");
});
if (!localStorage.getItem("itemForAuctioning")) {
  wholeAuction.classList.add("d-none");
  noAuction.classList.remove("d-none");
}

let allBiddingItems = [];
let indx;
const timer = document.querySelector(".timer");
function auctionPageHandler() {
  if (!localStorage.getItem("itemForAuctioning")) {
    return;
  }
  updateItems();
  wholeAuction.classList.remove("d-none");
  let auctionDone = document.querySelector(".auction-finished");
  noAuction.classList.add("d-none");
  const elForAuction = document.querySelector(".elForAuction");
  let currentAuctioningItem = items.find((item) => item.isAuctioning);
  let biddingInput = document.querySelector("#biddingInput");
  const initialBiddingPrice = Math.floor(currentAuctioningItem.price / 2);
  indx = localStorage.getItem("itemForAuctioning");
  elForAuction.innerHTML = `
  <div class="card">
    <img src="${items[indx].image}" class="card-img-top">
    <div class="card-body">
      <p class="card-title h3">${items[indx].title}<button class="btn btn-sm mt-2 rounded float-right font-weight-bold">${initialBiddingPrice} $</button></p>
      <p class="card-text firstp small">${items[indx].artist}</p>
      <p class="card-text secondp small">${items[indx].description}</p>
    </div>
  </div>`;
  if (localStorage.getItem("userType") == "artist") {
    biddingForm.style.display = "none";
  } else {
    biddingForm.style.display = "block";
  }
  if (currentAuctioningItem) {
    biddingInput.min = initialBiddingPrice;
    biddingInput.value = initialBiddingPrice;
    allBiddingItems.push(+biddingInput.value);
    localStorage.setItem("allBiddingItems", allBiddingItems);
    const livePrice = document.querySelector(".livePrice");
    livePrice.innerText = initialBiddingPrice;
    initAuction();
  } else {
    document.querySelector(".live-auction-container").style.display = "none";
    auctionHeader.classList.remove("d-none");
    biddingWrapper.classList.add("d-none");
    auctionCardContainer.classList.add("d-none");
  }
  function initAuction() {
    idx = items.findIndex((item) => item.id == currentAuctioningItem.id);
    if (localStorage.getItem("allBiddingItems")) {
      allBiddingItems = [JSON.parse(localStorage.getItem("allBiddingItems"))];
      allBiddingItems.forEach((bid, idx) => {
        const li = document.createElement("li");
        li.textContent = `I bid ${bid}`;
        if (idx > 0) {
          if (idx % 2 == 1) {
            li.classList.add("user");
          } else {
            li.classList.add("me");
          }
          biddingHistory.appendChild(li);
        }
      });
    } else {
      allBiddingItems = [];
    }
  }
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    const secondsDisplay =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    return `${minutesDisplay} : ${secondsDisplay}`;
  }
  function clearAuction() {
    items[idx].dateSold = new Date();
    items[idx].priceSold = allBiddingItems[allBiddingItems.length - 1];
    items[idx].isAuctioning = false;
    // biddingForm.style.display = "none";
    auctionDone.style.display = `block`;
    localStorage.removeItem("allBiddingItems");
    localStorage.removeItem("auctionTimer");
  }
  if (currentAuctioningItem) {
    initAuctionTimer();
  }
  function initAuctionTimer() {
    let time;
    const valueFromLs = +localStorage.getItem("auctionTimer");
    if (valueFromLs) {
      time = +valueFromLs;
    } else {
      time = 120;
      localStorage.setItem("auctionTimer", time);
      timer.textContent = `${formatTime(time)}`;
    }
    const timerInterval = setInterval(function () {
      time -= 1;
      timer.textContent = `${formatTime(time)}`;
      localStorage.setItem("auctionTimer", time);

      if (time == 0) {
        clearInterval(timerInterval);
        clearAuction();
      }
    }, 1000);
    biddingBtn.addEventListener("click", function () {
      time = 60;
    });
  }
  biddingBtn.addEventListener("click", function () {
    if (biddingInput.value == allBiddingItems[allBiddingItems.length - 1]) {
      alert("you have to bid higher price");
      return;
    }
    biddingHistory.innerHTML += `<li class='left'>${biddingInput.value}$</li>`;
    allBiddingItems.push(+biddingInput.value);
    localStorage.setItem("allBiddingItems", JSON.stringify(allBiddingItems));
    const formData = new FormData();
    formData.set("amount", biddingInput.value);
    fetch(`https://projects.brainster.tech/bidding/api`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((items) => {
        if (items.isBidding) {
          biddingHistory.innerHTML += `<li class='right'>${items.bidAmount}$</li>`;
          biddingInput.min = items.bidAmount;
          biddingInput.value = items.bidAmount;
          allBiddingItems.push(+items.bidAmount);
        } else {
          biddingBtn.setAttribute("disabled", true);
          auctionDone.classList.remove("d-none");
          biddingHistory.innerHTML += `<li class="right">No bid</li>`;
        }
      });
  });
}

if (location.hash === `#artists/items` && cardsAristItem == ``) {
  artistItemsPageHandler();
}
if (location.hash === `#auction`) {
  auctionPageHandler();
}
window.addEventListener("hashchange", () => {
  if (location.hash === `#auction`) {
    location.reload();
  }
});

window.addEventListener("load", artistPageHandler);
