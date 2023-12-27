let show = document.querySelector("#show");
let preloader = document.querySelector("#preloader");
let reset = document.querySelector(".reset");
let submit = document.querySelector(".submit");
let select = document.querySelector(".select");
let toggler = document.querySelector(".toggler");
let options = document.querySelector(".options");
let optionsButtons = options.children;
let modal = document.querySelector(".modal");

let name = document.querySelector("#name");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let logoFile = document.querySelector("#logo-file");
let logoImg = document.querySelector(".logo-img");
let logo = document.querySelector(".logo");
let selectInp = document.querySelector("#select");

let fields = [name, phone, email, selectInp];

function isValid() {
  if (
    name.value &&
    phone.value &&
    email.value &&
    logoFile.files.length &&
    selectInp.value
  ) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

isValid();

logo.addEventListener("click", async function (event) {
  event.stopPropagation();
  await logoFile.click();
  submit.disabled = false;
});

submit.addEventListener("click", function (event) {
  if (this.disabled) {
    let errors = document.querySelectorAll(".error");

    for (let error of errors) {
      for (let field of fields) {
        if (!field.value && error.classList.contains(field.name)) {
          error.classList.toggle("hidden");
        }
      }
    }
  } else {
    console.log("Done");
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    options.classList.add("hidden");
  }
});

reset.addEventListener("click", (event) => {
  preloader.classList.add("hidden");
});

show.addEventListener("click", () => {
  preloader.classList.remove("hidden");
});

preloader.addEventListener("click", (event) => {
  if (preloader === event.target) {
    preloader.classList.add("hidden");
    options.classList.add("hidden");
  }
});

select.addEventListener("click", () => {
  toggler.classList.toggle("reverse");
  options.classList.toggle("hidden");
});

for (let option of optionsButtons) {
  option.addEventListener("click", function (event) {
    event.preventDefault();
    selectInp.value = this.textContent;
  });
}
