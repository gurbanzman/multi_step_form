let multiSteps = document.querySelector(".multi__step-lists");
let multi__shop_title = document.querySelector(".multi__shop-title");
let multi__shop_about = document.querySelector(".multi__shop-about");
let multiShop = document.querySelector(".multi__shop");
let multiBtn = document.querySelector(".multi__shop-btn");

let params = getUrl();
let stepIndex = 0;
let arr = Array.from(Array(5).keys());
arr.shift(0);
let multiOption;
let addition = false;
let checked = false;

let sum = 0;

function getUrl() {
  const url = new URLSearchParams(window.location.search);
  const info = url.get("info");
  const selects = url.get("selects");
  const addOns = url.get("add_ons");
  const types = url.get("types");
  const plan = url.get("plan");
  const price = url.get("price");
  const total = url.get("total");
  const result = url.get("result");
  const pageName = window.location.pathname.split().pop();

  return {
    info: info,
    selects: selects,
    types: types,
    plan: plan,
    price: price,
    addOns: addOns,
    page: pageName,
    total: total,
    result: result
  };
}

let data = [
  {
    steps: [
      {
        id: "1",
        count: "Step 1",
        info: "YOUR INFO",
      },
      {
        id: "2",
        count: "Step 2",
        info: "SELECT PLAN",
      },
      {
        id: "3",
        count: "Step 3",
        info: "ADD-ONS",
      },
      {
        id: "4",
        count: "Step 4",
        info: "SUMMARY",
      },
    ],
    pages: [
      {
        id: "1",
        title: "Personal info",
        info: "Please provide your name, email address, and phone number.",
        forms: [
          {
            id: "1",
            text: "Name",
            type: "text",
            name: "userName",
            placeholder: "e.g. Stephen King",
          },
          {
            id: "2",
            text: "Email Address",
            type: "email",
            name: "userEmail",
            placeholder: "e.g. stephenking@lorem.com",
          },
          {
            id: "3",
            text: "Phone Number",
            type: "text",
            name: "userNumber",
            placeholder: "e.g. +1 234 567 890",
          },
        ],
      },
      {
        id: "2",
        title: "Select your plan",
        info: "You have the option of monthly or yearly billing.",
        subscription: [
          {
            id: "1",
            logo: "assets/images/arcade.svg",
            title: "Arcade",
            price: "9",
          },
          {
            id: "2",
            logo: "assets/images/advanced.svg",
            title: "Advanced",
            price: "12",
          },
          {
            id: "3",
            logo: "assets/images/pro.svg",
            title: "Pro",
            price: "15",
          },
        ],
      },
      {
        id: "3",
        title: "Pick add-ons",
        info: "Add-ons help enhance your gaming experience.",
        add_ons: [
          {
            id: "1",
            title: "Online service",
            info: "Access to multiplayer games",
            price: "+$1/mo",
          },
          {
            id: "2",
            title: "Larger storage",
            info: "Extra 1TB of cloud save",
            price: "+$2/mo",
          },
          {
            id: "3",
            title: "Customizable profile",
            info: "Custom theme on your profile",
            price: "+$2/mo",
          },
        ],
      },
      {
        id: "4",
        title: "Finishing up",
        info: "Double-check everything looks OK before confirming.",
      },
    ],
  },
];

let inlineData = {
  plan: "",
  price: "",
  types: "month",
  ons: [],
};

function stepArray() {
  return arr.map((item) => {
    return item;
  });
}

let stepData = stepArray();

function getSteps(steps, stepIndex) {
  let innerData = "";
  steps.map((item) => {
    let { id, count, info } = item;
    innerData += `
            <div class="multi__step-list">
               <div class="${
                 stepData[stepIndex] >= id
                   ? "multi__step-list-value active"
                   : "multi__step-list-value"
               }">
                  <span>${id}</span>
               </div>
               <div class="multi__step-list-text">
                  <span class="multi__step-list-step">${count}</span>
                  <span class="multi__step-list-info">${info}</span>
               </div>
            </div>
      `;
  });
  multiSteps.innerHTML = innerData;
}

function nextBtn() {
  let btn = document.querySelector(".btn-primary");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    additionRegex();
    if (addition) {
      setUrl("selects");
      getSteps(data[0].steps, stepIndex = 1);
    } else {
      setUrl("info-false");
      getSteps(data[0].steps, stepIndex = 0);
      alert("please written form!");
    }
  });
}

function signUp(quiz) {
  multi__shop_title.innerHTML = titleText(quiz);
  multi__shop_about.innerHTML = signAbout(quiz);
  multiBtn.innerHTML = firstNextBtn();

  regName();
  nextBtn();
}

function regName() {
  let form = document.querySelector(".multi__shop-form");
  const maskOptions = {
    mask: "+{994}(00)000-00-00",
  };
  const mask = IMask(form.userNumber, maskOptions);
}

function additionRegex() {
  let form = document.querySelector(".multi__shop-form");
  const regexName = /[a-zA-Z]{1}/;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (regexName.test(form.userName.value) && regexEmail.test(form.userEmail)) {
    addition = true;
  }
  else {
    form.userName.classList.add("wrong")
    form.userEmail.classList.add("wrong")
  }
  regexEmail.test(form.userEmail.value)
    ? (form.userEmail.classList.remove("wrong"), (addition = true))
    : (form.userEmail.classList.add("wrong"), (addition = false));

  regexName.test(form.userName.value)
    ? (form.userName.classList.remove("wrong"), (addition = true))
    : (form.userName.classList.add("wrong"), (addition = false));

  form.userEmail.value == null ||
  (form.userEmail.value === "" && form.userName.value == null) ||
  (form.userName.value === "" && form.userNumber.value == null) ||
  form.userNumber.value === ""
    ? (addition = false)
    : (addition = true);
}

function titleText(selects) {
  return `
    <h4 class="multi__shop-title-user">${selects.title}</h4>
    <p class="multi__shop-title-info">${selects.info}</p>
    `;
}

function selectCart(selects) {
  return `
     <div class="multi__shop-selects">
     ${selects.subscription
       .map((item) => {
         return ` <div class="multi__shop-option" data-selects-id="${item.id}">
            <div class="multi__shop-option-logo">
                <img src="${item.logo}" alt="">
            </div>
        <div class="multi__shop-option-info">
            <span class="multi__shop-option-title">${item.title}</span>
            <span class="multi__shop-option-value">$${item.price}/mo</span>
        </div>
            <p class="multi__shop-option-offer"></p>
        </div>
      `;
       })
       .join("")} 
      </div>
    `;
}

function selectCartActive() {
  multiOption = document.querySelectorAll(".multi__shop-option");
  multiOption.forEach((item) => {
    item.addEventListener("click", handleClick);
  });
}

function handleClick(event) {
  multiOption.forEach((item) => {
    item.classList.remove("select");
  });
  event.target.classList.add("select");
  findCurrentSelects(event);
}

function findCurrentSelects() {
  let selectsCurrentId = event.target.getAttribute("data-selects-id");
  let price = event.target.querySelector(".multi__shop-option-value");
  let dataFind = data[0].pages[1].subscription.find(
    (item) => item.id == selectsCurrentId
  );

  inlineData.plan = dataFind.title;
  inlineData.price = price.textContent.slice(1, -3);
}

function selectTypes() {
  return `
        <div class="multi__shop-types">
              <div class="toggle">
                <span class="identikator"></span>
              </div>
               <span class="multi__shop-types-text types--month">Monthly</span>
               <span class="multi__shop-types-text types--year">Yearly</span>
        </div>
    `;
}

function nextBtnElement() {
  return `
      <button class="btn-primary primary-font">Next Step</button>
      <button class="btn-less">Go Back</button>
    `;
}

function firstNextBtn() {
  return `
    <div class="multi__shop-btn">
        <button class="btn-primary primary-font">Next Step</button>
     </div> 
    `;
}

function confirmBtn() {
  return `
      <button class="btn-confirm primary-font">Confirm</button>
      <button class="btn-less">Back</button>
    `;
}

function signAbout(quiz) {
  return `
    <form class="multi__shop-form">
     ${quiz.forms
       .map((sign) => {
         return `<div class="multi__shop-form-single form--name">
           <span class="multi__shop-form-single-text">${sign.text}</span>
           <input type="${sign.type}" name="${sign.name}" class="multi__shop-form-single-input" placeholder="${sign.placeholder}" autocomplete="off" required>
           </div>   
           `;
       })
       .join(" ")}
     </form>
    `;
}

function selectsPages(selects) {
  multi__shop_title.innerHTML = titleText(selects);

  multi__shop_about.innerHTML = `
  ${selectCart(selects)}
  ${selectTypes()}
  `;
  multiBtn.innerHTML = nextBtnElement();
  secondNextBtn();
  selectCartActive();
  toggleSelect();
  backToGoPages();
}

function backToGoPages() {
  let backBtn = document.querySelector(".btn-less");
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setUrl("info-false");
    stepIndex = 1;
    getSteps(data[0].steps, stepIndex - 1)
  });
}

function secondNextBtn() {
  let btn = document.querySelector(".btn-primary");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let selectedPlanData = document.querySelector(".multi__shop-option.select");
    if (selectedPlanData == null) {
      alert("please select");
    } else {
      getSteps(data[0].steps, stepIndex = 2)
      setUrl("plan");
    }
  });
}

function toggleSelect() {
  let toggle = document.querySelector(".toggle");
  toggle.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
    seemOfferText();
    checked = !checked;
    changePrice();
    updateInlineDataPrice();
    currentSelectTypes();
  });
}

function changePrice() {
  let price = document.querySelectorAll(".multi__shop-option-value");

  if (checked) {
    price[0].innerHTML = "$90/yr";
    price[1].innerHTML = "$120/yr";
    price[2].innerHTML = "$150/yr";
  } else {
    price[0].innerHTML = "$9/mo";
    price[1].innerHTML = "$12/mo";
    price[2].innerHTML = "$15/mo";
  }
}

function currentSelectTypes() {
  checked ? (inlineData.types = "year") : "month";
}

function updateInlineDataPrice() {
  checked
    ? [...inlineData.price].concat("0").join("")
    : [...inlineData.price].pop("0");
}

function addOnsPages(ons) {
  multi__shop_title.innerHTML = titleText(ons);
  multi__shop_about.innerHTML = onsAbout(ons);
  onsCartReaction("checked");
  onsCartReaction("ons-price");
  multiBtn.innerHTML = nextBtnElement();
  backToGoPageSelects();
  nextTotalPage();
}

function backToGoPageSelects() {
  let backBtn = document.querySelector(".btn-less");
  backBtn.addEventListener("click", e=> {
    e.preventDefault();
    getSteps(data[0].steps, stepIndex = 1)
    setUrl("selects");
    inlineData.types = "month"
  })
}

function nextTotalPage() {
  let btn = document.querySelector(".btn-primary");
  btn.addEventListener("click", (e) => {
    let currentSelectElement = document.querySelector(
      ".multi__shop-ons-add.selected"
    );

    if (currentSelectElement == null) {
      alert("please chosen");
    } else {
      getSteps(data[0].steps, stepIndex = 3);
      setUrl("total");
    }
  });
}

function onsCartReaction(type) {
  let onsCart = document.querySelectorAll(".multi__shop-ons-add");
  onsCart.forEach((item) => {
    if (type == "checked") {
      let selectOnsCart = item.querySelector(".multi__shop-ons-ad-checked");
      let selectOnsCartPrice = item.querySelector(".multi__shop-ons-add-price");
      let selectOnsCartTotal = item.querySelector(
        ".multi__shop-ons-ad-variable-title"
      );
      selectOnsCart.addEventListener("click", function () {
        item.classList.toggle("selected");
        let priceText = selectOnsCartPrice.textContent;
        let totalText = selectOnsCartTotal.textContent;
        additionOns(totalText, priceText, item);
      });
    }
  });
  updateOnsPrice();
}

function additionOns(text, price, item) {
  if (item.classList.contains("selected")) {
    inlineData.ons.push({
      text,
      price,
    });
    if (inlineData.ons.length > 3) {
      inlineData.ons.pop();
    }
  } else {
    let selectedIndex = inlineData.ons.indexOf(text, price);
    inlineData.ons.splice(selectedIndex, 1);
    if (!inlineData.ons.slice(selectedIndex, 1)) {
      inlineData.ons.push({
        text,
        price,
      });
    }
  }
}

function createTotal(total) {
  multi__shop_title.innerHTML = titleText(total);
  multi__shop_about.innerHTML = `
  ${totalBoard()}
  ${finallyTotal()}
  `;
  multiBtn.innerHTML = confirmBtn();
  backToGoPageTotal();
  backToPageSelectChange();
  updateTotalPrice();
  finallyNextEndPage();
}

function finallyNextEndPage() {
  let btn = document.querySelector(".btn-confirm");
  btn.addEventListener("click", e => {
    e.preventDefault();
    setUrl("end");
  })
}

function backToGoPageTotal() {
  let backBtn = document.querySelector(".btn-less");
  backBtn.addEventListener("click",e => {
    e.preventDefault();
    setUrl("plan");
    getSteps(data[0].steps, stepIndex = 2);
    inlineData.ons = [];
    sum = 0;
  })
}

function totalBoard() {
  return `
    <div class="multi__shop-total">
               <div class="multi__shop-total-board">
                  <div class="multi__shop-board-plan">
                     <span class="multi__shop-board-plan-title">${
                       inlineData.plan
                     } <span>(${inlineData.types})</span></span>
                     <button class="multi__shop-board-btn board_font">Change</button>
                  </div>
                  <span class="multi__shop-total-price">$${
                    inlineData.price
                  }/mo</span>
               </div>
               <hr class="multi__shop-total-line">
               <div class="multi__shop-total-ons">
               ${inlineData.ons
                 .map((item) => {
                   sum += +item.price.slice(2, -3);
                   return `<div class="multi__shop-ons-total-add">
                <span class="multi__shop-ons-total-add-title">${item.text}</span>
                <span class="multi__shop-ons-total-add-price">${item.price}</span>
             </div>`;
                 })
                 .join("")}
               </div>
            </div>
    `;
}

function finallyTotal() {
  return `
        <div class="multi__shop-finally">
               <span class="multi__shop-finally-total">Total (per ${
                 inlineData.types
               })</span>
               <span class="multi__shop-finally-price">+$${
                 sum + +inlineData.price
               }/mo</span>
        </div>
    `;
}

function updateOnsPrice() {
  let onsPrices = document.querySelectorAll(".multi__shop-ons-add-price");
  if (inlineData.types == "month") {
    onsPrices[0].textContent = "+$1/mo";
    onsPrices[1].textContent = "+$2/mo";
    onsPrices[2].textContent = "+$2/mo";
  } else {
    onsPrices[0].textContent = "+$10/yr";
    onsPrices[1].textContent = "+$20/yr";
    onsPrices[2].textContent = "+$20/yr";
  }
}

function onsAbout(about) {
  return `
        <div class="multi__shop-ons">
            ${about.add_ons
              .map((item) => {
                return `
                <div class="multi__shop-ons-add">
                  <input type="checkbox" name="checkbox" class="multi__shop-ons-ad-checked">
                  <div class="multi__shop-ons-ad-variable">
                     <span class="multi__shop-ons-ad-variable-title">${item.title}</span>
                     <span class="multi__shop-ons-ad-variable-info">${item.info}</span>
                  </div>
                  <span class="multi__shop-ons-add-price">${item.price}</span>
               </div>
                `;
              })
              .join("")}
        </div>
    
    `;
}

function endPage() {
  multi__shop_title.innerHTML = ""
  multi__shop_about.innerHTML = pageLater();
  multiBtn.innerHTML = "";
}

function pageLater() {
  return (
    `
    <div class="multi__shop-end">
        <div class="multi__shop-end-checked">
          <img src="assets/images/Check.svg" alt="">
        </div>
        <div class="multi__shop-end-text">
          <h3 class="multi__shop-end-title">Thank you!</h3>
          <p class="multi__shop-end-message">Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need
          support, please feel free to email us at support@loremgaming.com.</p>
        </div>
    </div>
    `
  )
}

function backToPageSelectChange() {
  let changeBtn = document.querySelector(".multi__shop-board-btn");
  changeBtn.addEventListener("click",e => {
    e.preventDefault();
    setUrl("selects");
    getSteps(data[0].steps, stepIndex = 1);
    sum = 0;
    inlineData.ons = [];
    params.types = "month";
  });
}

function updateTotalPrice() {
  let totalPrice = document.querySelector(".multi__shop-finally-price");
  let totalPlanPrice = document.querySelector(".multi__shop-total-price");
  if(inlineData.types === "year") {
    totalPrice.textContent = totalPrice.textContent.replace("mo","yr")
    totalPlanPrice.textContent = totalPlanPrice.textContent.replace("mo","yr")
  }
  else {
    totalPrice.textContent = totalPrice.textContent.replace("yr","mo")
    totalPlanPrice.textContent = totalPlanPrice.textContent.replace("yr","mo")
  }
}

if (!params.info && !params.selects) {
  signUp(data[0].pages[0]);
  getSteps(data[0].steps, stepIndex);
}

if (params.selects && params.info && !params.plan && !params.price && !params.types) {
  selectsPages(data[0].pages[1]);
  getSteps(data[0].steps, stepIndex + 1);
}

if (
  params.info &&
  params.selects &&
  params.plan &&
  params.price &&
  params.types
) {
  addOnsPages(data[0].pages[2]);
  getSteps(data[0].steps, stepIndex = 2)
}
if (
  params.info &&
  params.selects &&
  params.plan &&
  params.price &&
  params.types &&
  params.total &&
  !params.result
) {
  createTotal(data[0].pages[3]);
  getSteps(data[0].steps, stepIndex = 3);
}

if (
  params.info &&
  params.selects &&
  params.plan &&
  params.price &&
  params.types &&
  params.total &&
  params.result
) {
  getSteps(data[0].steps, stepIndex = 3);
  endPage();
}

function seemOfferText() {
  let offerText = document.querySelectorAll(".multi__shop-option-offer");
  offerText.forEach((item) => {
    item.textContent === ""
      ? (item.textContent = "2 months free")
      : (item.textContent = "");
  });
}

function setUrl(type) {
  let url = new URL(window.location.href);

  if (type == "info-false") {
    url.search = "";
    signUp(data[0].pages[0]);
    getSteps(data[0].steps, stepIndex - 1);
  } else if (type == "selects") {
    selectsPages(data[0].pages[1]);
    getSteps(data[0].steps, stepIndex++);
    url.searchParams.set("info", true);
    url.searchParams.set("selects", false);
  } else if (type == "plan") {
    getSteps(data[0].steps, stepIndex++);
    addOnsPages(data[0].pages[2]);
    url.searchParams.set("selects", true);
    url.searchParams.set("plan", inlineData.plan);
    url.searchParams.set("price", inlineData.price);
    url.searchParams.set("types", inlineData.types);
  } else if (type == "total") {
    getSteps(data[0].steps, stepIndex++);
    createTotal(data[0].pages[3]);
    url.searchParams.set("selects", true);
    url.searchParams.set("plan", inlineData.plan);
    url.searchParams.set("price", inlineData.price);
    url.searchParams.set("types", inlineData.types);
    url.searchParams.set("total", false);
  }
  else if(type == "end") {
    url.searchParams.set("total", true);
    url.searchParams.set("result", true);
    endPage();
  }
  window.history.replaceState({}, "", url);
}
