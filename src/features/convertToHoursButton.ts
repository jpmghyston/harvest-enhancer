import { hoursToHourMinuteString } from "../helpers";
import { hoursInADay } from "../constants";

const convertToHours = function() {
  // @ts-ignore
  document.activeElement.blur();
  Array.from(document.querySelectorAll("input.pds-input"))
    .map((elem) => elem as HTMLInputElement)
    .filter((i) => i.value.startsWith("0:") || i.value == "1:00")
    .forEach((i) => {
      i.value = hoursToHourMinuteString(
        i.value == "1:00"
          ? hoursInADay
          : (parseFloat(i.value.substring(2)) * hoursInADay) / 60
      );
      i.dispatchEvent(new Event("change"));
    });
  // @ts-ignore
  setTimeout(() => document.querySelector("button.js-save").click(), 100);
};

export function createConvertToHoursButton() {
  let convertToHoursButton = document.createElement("button");
  convertToHoursButton.onclick = convertToHours;
  convertToHoursButton.innerText = "Convert to hours";
  convertToHoursButton.className = "pds-button convert-hours-button";
  document.querySelector("div.main-nav-legacy nav ul")?.appendChild(convertToHoursButton);
}