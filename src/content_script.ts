chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

const hoursToHourMinuteString = (hours: number): string => {
  const hour = Math.floor(hours);
  const minute = Math.round((hours - hour) * 60);
  return `${hour}:${minute < 10 ? "0" : ""}${minute}`;
}

const convertToHours = function () {
  // @ts-ignore
  document.activeElement.blur();
  Array.from(document.querySelectorAll("input.pds-input"))
    // @ts-ignore
    .filter(i => i.value.startsWith("0:") || i.value == "1:00")
    .forEach(i => {
      // @ts-ignore
      i.value = hoursToHourMinuteString(i.value == "1:00" ? 7.5 : i.value.substring(2) * 7.5 / 60);
      i.dispatchEvent(new Event("change"));
    });
  // @ts-ignore
  setTimeout(() => document.querySelector('button.js-save').click(), 100);
  // @ts-ignore
  setTimeout(() => document.querySelector('button.js-close-modal').click(), 300);
}

const projectEditPageRegex = /\/projects\/[0-9]+\/edit.*/;

function createConvertToHoursButton() {
  let convertToHoursButton = document.createElement("button");
  convertToHoursButton.onclick = convertToHours;
  convertToHoursButton.innerText = "Convert to hours";
  convertToHoursButton.className = "pds-button convert-hours-button";
  document.body.appendChild(convertToHoursButton);
}

const createDailyRateHelpers = function() {
  Array.from(document.querySelectorAll("td.js-tasks-billable-rate-column"))
    .filter(elem => elem.className.indexOf("col-total") === -1)
    .forEach(elem => {
      // @ts-ignore
      const hourlyRate = Array.from(elem.children)[1].value
      const dailyRate = Math.round(hourlyRate * 7.5);
      const dailyRateElement = document.createElement("span");
      dailyRateElement.innerText = `Daily rate: ${dailyRate}`;
      elem.appendChild(dailyRateElement)
    })
}

function createGetDailyRatesButton() {
  let convertToHoursButton = document.createElement("button");
  convertToHoursButton.onclick = createDailyRateHelpers;
  convertToHoursButton.innerText = "Get daily rates";
  convertToHoursButton.className = "pds-button convert-hours-button";
  document.body.appendChild(convertToHoursButton);
}

window.onload = function () {
  if (window.location.pathname.indexOf("/time/week") !== -1) {
    createConvertToHoursButton();
  }
  if (!!window.location.pathname.match(projectEditPageRegex)) {
    createGetDailyRatesButton();
  }
}

