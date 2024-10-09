function addControlButton() {
  console.log("create control");
  const button = document.querySelector("#startCount");
  if (button) {
    return;
  }
  const documentBody = document.querySelector("body");
  let buttonElement = document.createElement("button");
  buttonElement.id = "startCount";
  buttonElement.style.position = "fixed";
  buttonElement.style.top = "10px";
  buttonElement.style.right = "10px";
  buttonElement.style.color = "red";
  buttonElement.style.fontSize = "30pt";
  buttonElement.innerText = "Start Pecha";
  buttonElement.zIndex = "10000";
  documentBody.appendChild(buttonElement);
  buttonElement.addEventListener("click", () => {
    document.stopPecha = false;
    removeCreateElement("startCount");
    start20SecondPlay();
  });
}

function start20SecondPlay() {
  console.log("play");

  const TIME_COUNT = 20;

  let currentURL = "START";

  let countdownElement = document.querySelector("#countdownTimer");

  if (countdownElement) {
    return;
  }

  const documentBody = document.querySelector("body");

  countdownElement = document.createElement("div");
  countdownElement.id = "countdownTimer";
  countdownElement.style.position = "fixed";
  countdownElement.style.top = "10px";
  countdownElement.style.right = "10px";
  countdownElement.style.color = "red";
  countdownElement.style.fontSize = "30pt";
  countdownElement.innerText = "" + TIME_COUNT;
  countdownElement.zIndex = "10000";
  documentBody.appendChild(countdownElement);

  let timeLeft = TIME_COUNT;

  document.pechaInterval = setInterval(() => {
    if (document.stopPecha) {
      return;
    }
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = TIME_COUNT;
      if (currentURL === document.location.search) {
        stop20SecondPlay();
        return;
      }
      currentURL = document.location.search;
      moveToNextSlide();
    }
    countdownElement.innerText = timeLeft;
  }, 1000);
}

function moveToNextSlide() {
  console.log(document.location.search);
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "ArrowRight",
      code: "ArrowRight",
      keyCode: 39,
      which: 39,
      bubbles: true,
    })
  );
}

function removeCreateElement(elementId) {
  createdElement = document.querySelector("#" + elementId);
  if (createdElement) {
    createdElement.remove();
    createdElement = null;
  }
}

function stop20SecondPlay() {
  console.log("stop");
  clearInterval(document.pechaInterval);
  document.pechaInterval = null;
  document.stopPecha = true;
  removeCreateElement("countdownTimer");
  addControlButton();
}
window.addEventListener("load", () => {
  addControlButton();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    stop20SecondPlay();
  }
});
