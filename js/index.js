let dataShow = document.getElementById("dataShow");
$(document).ready(() => {
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
});
$(".bar .barsIcon").click(() => {
  if ($(".sidebarDetails").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

$("#searchMenu").click(function () {
  getSearchMenu();
});
$("#categoriesMenu").click(function () {
  getCategoriesMenu();
});
$("#areaMenu").click(function () {
  getAreaMenu();
});
$("#ingredientsMenu").click(function () {
  getIngredientsMenu();
});
$("#contactUsMenu").click(function () {
  getContactUsMenu();
});

function openSideNav() {
  $(".sidebar").addClass("active");
  $(".barsIcon i").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".list li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 50
      );
  }
}
function closeSideNav() {
  $(".sidebar").removeClass("active");
  $(".barsIcon i").removeClass("fa-x");
  $(".list li").animate(
    {
      top: 300,
    },
    200
  );
}
async function getMeals(term) {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
}
getMeals("");
function displayMeals(arr) {
  let meals = "";
  for (let i = 0; i < arr.length; i++) {
    meals += `<div class="col-lg-3 col-md-4 cursor-pointer" onclick="getMealDetails(${arr[i].idMeal})">
    <div class="foodCard text-center">
      <div class="foodImg">
        <img src="${arr[i].strMealThumb}" class="img-fluid" alt="" />
      </div>
      <div class="foodDetails text-center bg-light d-flex justify-content-center align-items-center">
        <h2 class="fw-bold">${arr[i].strMeal}</h2>
      </div>
    </div>
  </div>`;
  }
  closeSideNav();
  dataShow.innerHTML = meals;
}
async function getMealDetails(mealId) {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  showMealDetails(response.meals[0]);
  closeSideNav();
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
}
function showMealDetails(arr) {
  let mealDetails = ``;
  let mealIngredients = ``;
  let mealTags = ``;
  $("#searchPage").addClass("d-none");
  for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      mealIngredients += `<li class="alert alert-info m-2 p-2">${
        arr[`strMeasure${i}`]
      } ${arr[`strIngredient${i}`]}</li>`;
    }
  }
  if (arr.strTags) {
    let tags = arr.strTags.split(",");
    for (let i = 0; i < tags.length; i++) {
      mealTags += `<li class="alert alert-danger m-2 p-2">${tags[i]}</li>`;
    }
  }
  mealDetails = `
  <div class="col-md-4 text-center">
  <div class="imgContainer rounded-3 overflow-hidden">
    <img class="img-fluid mealImg" src="${arr.strMealThumb}" alt="" />
  </div>
  <div class="mealName my-4">
    <h2 class="text-white fw-bolder">${arr.strMeal}</h2>
  </div>
</div>
<div class="col-md-8 position-relative">
<span class="position-absolute end-0 top-0 text-warning cursor-pointer" id="closeMeal"><i class="fa-solid fa-circle-xmark fa-2x"></i></span>
  <div class="mealDesc text-white mx-3">
    <h2 class="fw-bolder my-3">Instructions</h2>
    <p class="fw-light">
    ${arr.strInstructions}
    </p>
    <h3 class="my-3">
      <span class="fw-bold">Area : </span><span>${arr.strArea}</span>
    </h3>
    <h3 class="my-3">
      <span class="fw-bold">Category : </span><span>${arr.strCategory}</span>
    </h3>
    <h3 class="my-3">
      <span class="fw-bold">Recipes : </span>
    </h3>
    <ul class="recipesList list-unstyled d-flex flex-wrap">
      ${mealIngredients}
    </ul>
    <h3 class="my-3">
      <span class="fw-bold">Tags : </span>
    </h3>
    <ul class="recipesList list-unstyled d-flex flex-wrap">
    ${mealTags}
    </ul>
    <a href="${arr.strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
    <a href="${arr.strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
  </div>
</div>
  `;
  dataShow.innerHTML = mealDetails;
  $("#closeMeal").click(function () {
    getMeals("");
  });
}
function getSearchMenu() {
  $(".loaderScreen").fadeIn(0);
  $("body").css("overflow", "hidden");
  $("#searchPage").removeClass("d-none");
  dataShow.innerHTML = "";
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
  closeSideNav();
}
async function getSearchName(termValue) {
  dataShow.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${termValue}`
  );
  response = await response.json();
  if (response.meals == null) {
  } else {
    displayMeals(response.meals);
  }
}
async function getSearchFirstLetter(termValue) {
  dataShow.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${termValue}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

async function getCategoriesMenu() {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");
  $("#searchPage").addClass("d-none");
  dataShow.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  let categories = "";
  for (let i = 0; i < response.categories.length; i++) {
    categories += `<div class="col-lg-3 col-md-4 cursor-pointer">
    <div class="foodCard text-center" onclick="showMealsCategory('${
      response.categories[i].strCategory
    }')">
      <div class="foodImg">
        <img src="${
          response.categories[i].strCategoryThumb
        }" class="img-fluid" alt="" />
      </div>
      <div class="foodDetails text-center bg-light">
        <h4 class="fw-bold">${response.categories[i].strCategory}</h4>
        <p>
          ${response.categories[i].strCategoryDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}
        </p>
      </div>
    </div>
  </div>
    `;
  }
  dataShow.innerHTML = categories;
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
  closeSideNav();
}
async function showMealsCategory(categoryName) {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
}

async function getAreaMenu() {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");
  $("#searchPage").addClass("d-none");
  dataShow.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  let areas = "";
  for (let i = 0; i < response.meals.length; i++) {
    areas += `<div class="col-lg-3 col-md-4 cursor-pointer">
    <div class="areaCard text-center" onclick="showMealsArea('${response.meals[i].strArea}')">
      <div class="areaIcon">
        <i class="fa-solid fa-5x fa-house-laptop text-white"></i>
      </div>
      <div class="areaName text-white p-3"><h3>${response.meals[i].strArea}</h3></div>
    </div>
  </div>
    `;
  }
  dataShow.innerHTML = areas;
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
  closeSideNav();
}
async function showMealsArea(areaName) {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
}

async function getIngredientsMenu() {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");
  $("#searchPage").addClass("d-none");
  dataShow.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  let ingredients = "";
  for (let i = 0; i < 20; i++) {
    ingredients += `<div class="col-lg-3 col-md-4 cursor-pointer">
    <div class="ingredientsCard text-center" onclick="showMealsIngredients('${
      response.meals[i].strIngredient
    }')" >
      <div class="ingredientsIcon">
        <i class="fa-solid fa-5x fa-meat text-white"></i>
      </div>
      <div class="ingredientsName text-white p-3">
        <h3 class="fw-bold ">${response.meals[i].strIngredient}</h3>
      </div>
      <p class="text-white">${response.meals[i].strDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
    </div>
  </div>
    `;
  }
  dataShow.innerHTML = ingredients;
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
  closeSideNav();
}
async function showMealsIngredients(Ingredients) {
  $(".loaderScreen").fadeIn(100);
  $("body").css("overflow", "hidden");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
}
function getContactUsMenu() {
  $(".loaderScreen").fadeIn(0);
  $("body").css("overflow", "hidden");
  dataShow.innerHTML = `
  <div
  class="contact vh-100 d-flex justify-content-center align-items-center"
>
  <div class="container w-75 text-center">
    <div class="row g-4">
      <div class="col-md-6">
        <input
          id="nameInput"
          type="text"
          class="form-control"
          placeholder="Enter Your Name"
        />
        <div
          id="nameAlert"
          class="alert alert-danger w-100 mt-2 d-none"
        >
          Special characters and numbers not allowed.
        </div>
      </div>
      <div class="col-md-6">
        <input
          id="emailInput"
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
        />
        <div
          id="emailAlert"
          class="alert alert-danger w-100 mt-2 d-none"
        >
          Email not valid must be exemple@gmail.com.
        </div>
      </div>
      <div class="col-md-6">
        <input
          id="phoneInput"
          type="text"
          class="form-control"
          placeholder="Enter Your Phone"
        />
        <div
          id="phoneAlert"
          class="alert alert-danger w-100 mt-2 d-none"
        >
          Enter valid Phone Number.
        </div>
      </div>
      <div class="col-md-6">
        <input
          id="ageInput"
          type="number"
          class="form-control"
          placeholder="Enter Your Age"
        />
        <div
          id="ageAlert"
          class="alert alert-danger w-100 mt-2 d-none"
        >
          Enter valid age.
        </div>
      </div>
      <div class="col-md-6">
        <input
          id="passwordInput"
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
        />
        <div
          id="passwordAlert"
          class="alert alert-danger w-100 mt-2 d-none"
        >
          Enter valid password Minimum 8 characters, at least one
          letter and one number.
        </div>
      </div>
      <div class="col-md-6">
        <input
          id="repasswordInput"
          type="password"
          class="form-control"
          placeholder="Repassword"
        />
        <div
          id="repasswordAlert"
          class="alert alert-danger w-100 mt-2 d-none"
        >
          Re-password not match password
        </div>
      </div>
    </div>
    <button
      id="submitBtn"
      class="btn btn-outline-danger px-2 mt-4 disabled"
    >
      Submit
    </button>
  </div>
</div>
  `;

  $(".loaderScreen").fadeOut(500);
  $("body").css("overflow", "visible");
  closeSideNav();

  $("#nameInput").bind("input", function () {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      checkContactData();
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#emailInput").bind("input", function () {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      checkContactData();
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#phoneInput").bind("input", function () {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      checkContactData();
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#ageInput").bind("input", function () {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      checkContactData();
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#passwordInput").bind("input", function () {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      checkContactData();
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  });
  $("#repasswordInput").bind("input", function () {
    if (repeatPasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      checkContactData();
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  });
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repeatPasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
function checkContactData() {
  let submitBtn = document.querySelector("#submitBtn");
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repeatPasswordValidation()
  ) {
    submitBtn.classList.remove("disabled");
  } else {
    submitBtn.classList.add("disabled");
  }
}
