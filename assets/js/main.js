const form = document.querySelector(".article__register"),
  nextBtn = document.querySelectorAll(".btn-primary"),
  backBtn = document.querySelectorAll(".btn-success-font"),
  registerText = document.querySelectorAll(".register__text"),
  formPages = document.querySelectorAll(".form__page"),
  formAsideSteps = document.querySelectorAll(".form__aside-steps"),
  toggle = document.querySelector("#toggle"),
  changeBtn = document.querySelector(".value__subtitle");

let planSelect = document.querySelectorAll(".plan__select");
let planOptionsValue = document.querySelectorAll(".plan__options-value");
let yearlyValue = document.querySelectorAll(".yearly__value");
let pick__checkbox = document.querySelectorAll(".pick__checkbox");
let changedModes = document.querySelectorAll(".form__plan-toggle > span");
let settings__subtitle_price = document.querySelectorAll(".settings__subtitle--price");

let addition = false;
let modes = false;
let addPlan = [
  {
    planName: "",
    planPrice: "",
    addOns: [],
  },
];

function additionInputsValue(data) {
  const requerementsFields = ["name", "email", "number"];
  let empty = [];

  for (const fields of requerementsFields) {
    if (!data[fields]) {
      empty.push(requerementsFields);
    }
  }
  return empty;
}

function regexTest(name, email, num) {
  let regexName =
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
  let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let regexNum = /^[0-9]{10}$/;

  if (regexName.test(name) && regexMail.test(email) && regexNum.test(num)) {
    addition = true;
  } else {
    addition = false;
  }

  return addition;
}

nextBtn.forEach((item, index) => {

  item.addEventListener("click", (e) => {
    let new_Data = {
      name: form.text.value,
      email: form.email.value,
      number: form.number.value,
    };

    let inputData = additionInputsValue(new_Data);

    if (inputData.length > 0) {
      alert("xanalari doldurun");
    } else if (!regexTest(new_Data.name, new_Data.email, new_Data.number)) {
      console.error("error");
    } else {
      alert("successfully");
      formPages[index].classList.add("display");
      formPages[index + 1]?.classList.remove("display");

      formAsideSteps[index].classList.remove("active");
      formAsideSteps[index + 1]?.classList.add("active");
    }
  });
});

backBtn.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    formPages[index].classList.remove("display");
    formPages[index + 1].classList.add("display");

    formAsideSteps[index].classList.add("active");
    formAsideSteps[index + 1].classList.remove("active");
  });
});

changeBtn.addEventListener("click",(e) => {
  formPages[1].classList.remove("display")
  formPages[3].classList.add("display")
})

function activeSelect(event) {
  planSelect.forEach((item) => {
    item.classList.remove("selected");
  });
  event.target.classList.add("selected");

  let planOptionsName = event.target.querySelector(".plan__options-name");
  let planOptionPrice = event.target.querySelector(".plan__options-value");

  addPlan[0].planName = planOptionsName.textContent;
  addPlan[0].planPrice = planOptionPrice.textContent;

  generateSelected();
}

planSelect.forEach((item) => {
  item.addEventListener("click", activeSelect);

  if(planSelect[0].classList.contains("selected")){
    addPlan[0].planName = planSelect[0].querySelector(".plan__options-name").textContent;
    addPlan[0].planPrice = planSelect[0].querySelector(".plan__options-value").textContent;
  }
});
console.log(addPlan);

toggle.addEventListener("click", changeValues);

function changeValues() {
  if (!toggle.classList.contains("act")) {
    toggle.classList.add("act");

    planOptionsValue[0].textContent = "$90/yr";
    planOptionsValue[1].textContent = "$120/yr";
    planOptionsValue[2].textContent = "$150/yr";

    if (addPlan[0].planPrice === "$9/mo") {
      addPlan[0].planPrice = "$90/yr";
    }
    if (addPlan[0].planPrice === "$12/mo") {
      addPlan[0].planPrice = "$120/yr";
    }
    if (addPlan[0].planPrice === "$15/mo") {
      addPlan[0].planPrice = "$150/yr";
    }

    changedModes[0].classList.remove("changed");
    changedModes[1].classList.add("changed");

    yearlyValue.forEach((item) => {
      item.textContent = "2 months free";
    });

    modes = true;
  } else {
    toggle.classList.remove("act");

    planOptionsValue[0].textContent = "$9/mo";
    planOptionsValue[1].textContent = "$12/mo";
    planOptionsValue[2].textContent = "$15/mo";

    if (addPlan[0].planPrice === "$90/yr") {
      addPlan[0].planPrice = "$9/mo";
    }
    if (addPlan[0].planPrice === "$120/yr") {
      addPlan[0].planPrice = "$12/mo";
    }
    if (addPlan[0].planPrice === "$120/yr") {
      addPlan[0].planPrice = "$15/mo";
    }

    changedModes[0].classList.add("changed");
    changedModes[1].classList.remove("changed");

    yearlyValue.forEach((item) => {
      item.textContent = "";
    });

    modes = false;
  }
  additionPrice(!toggle.classList.contains("act"));
  totalChange(!toggle.classList.contains("act"));
}

function additionPrice(isChecked){

  if(isChecked){
    settings__subtitle_price[0].textContent = "+$1/mo"
    settings__subtitle_price[1].textContent = "+$2/mo"
    settings__subtitle_price[2].textContent = "+$2/mo"

    addPlan[0].addOns.forEach(item => {
      if(item.addPrice === "+$10/yr"){
        item.addPrice = "+$1/mo"
      }
      if(item.addPrice === "+$20/yr"){
        item.addPrice = "+$2/mo"
      }
      if(item.addPrice === "+$20/yr"){
        item.addPrice = "+$2/mo"
      }
      return item.addPrice
    })
  }
  else{
    settings__subtitle_price[0].textContent = "+$10/yr"
    settings__subtitle_price[1].textContent = "+$20/yr"
    settings__subtitle_price[2].textContent = "+$20/yr"

    addPlan[0].addOns.forEach(item => {
      if(item.addPrice === "+$1/mo"){
        item.addPrice = "+$10/yr"
      }
      if(item.addPrice === "+$2/mo"){
        item.addPrice = "+$20/yr"
      }
      if(item.addPrice === "+$2/mo"){
        item.addPrice = "+$20/yr"
      }
      return item.addPrice
    })
  }
}

function totalChange(additionTime){
  let value__title_pick = document.querySelector(".value__title--pick");
  let finish__pick = document.querySelector(".finish__pick");

  if(additionTime){
    value__title_pick.textContent = "Monthly"
    finish__pick.textContent = "(per month)"
  }
  else{
    value__title_pick.textContent = "Yearly"
    finish__pick.textContent = "(per year)"
  }
}

function generateSelected(){
  let settings__title = document.querySelector(".value__title");
  let total__title_price = document.querySelector(".total__title-price");

  settings__title.textContent = addPlan[0].planName;
  total__title_price.textContent = addPlan[0].planPrice;
}

function checkInput(event) {
  let title__settings =
    event.target.parentElement.querySelector(".title__settings");
  let settings__subtitle_price = event.target.parentElement.querySelector(
    ".settings__subtitle--price"
  );

  if (!event.target.checked) {
    event.target.parentElement.classList.remove("check");

    let findData = addPlan[0].addOns.findIndex((items) => {
      return items.addName != title__settings.textContent;
    });

    callData(addPlan[0].addOns.splice(findData, 1));
  } else {
    event.target.parentElement.classList.add("check");

    let onsData = addPlan[0].addOns.filter(
      (item) => item.addName != title__settings.textContent
    );

    addPlan[0].addOns.push({
      addName: title__settings.textContent,
      addPrice: settings__subtitle_price.textContent,
    });

    callData(addPlan[0].addOns.slice(onsData));
  }
}

pick__checkbox.forEach((item) => {
  item.addEventListener("click", checkInput);
});

function callData(a) {
  let innerData = "";
  let totalPick = document.querySelector(".total__pick");
  let finishPrice = document.querySelector(".finish__price");

  let sum = 0;

  a.map((item) => {
    let { addName, addPrice } = item;
    innerData += `
    <div class="total__picks js-between">
    <span class="picks__value total__name  settings__subtitle">${addName}</span>
    <span class="picks__price settings__subtitle">${addPrice}</span>
    </div>
    `
    sum += Number(addPrice.slice(2,-3));
  });
  totalPick.innerHTML = innerData;
  sum += Number(addPlan[0].planPrice.slice(1,-3));

  if(modes === true){
    finishPrice.textContent = `$${sum}/yr`;
  }
  else{
    finishPrice.textContent = `$${sum}/mo`;
  }

  
}

// function addTotalPrices(sum){
//   let finishPrice = document.querySelector(".finish__price");

//   if(sum){
    
//   }
// }
