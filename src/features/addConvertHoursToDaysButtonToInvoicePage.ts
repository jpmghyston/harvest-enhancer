import { hoursInADay } from "../constants";

const updateInvoice = function() {
  const ROUNDING_TOLERANCE = 0.05;
  // @ts-ignore
  document.activeElement.blur();
  Array.from(document.querySelectorAll("input.js-quantity")).forEach((elem) => {
    const inputElement = elem as HTMLInputElement;
    const inputValue = parseFloat(inputElement.value);
    const newValue = inputValue / hoursInADay;
    const newValueRounded = (
      Math.round((inputValue * 4) / hoursInADay) / 4
    ).toFixed(2);
    if (Math.abs(newValue - parseFloat(newValueRounded)) > ROUNDING_TOLERANCE) {
      alert(
        `Couldn't round value ${inputValue} to a quarter-day accurately (${newValue} vs ${newValueRounded}), so leaving as-is`
      );
    } else {
      inputElement.value = (
        Math.round((inputValue * 4) / hoursInADay) / 4
      ).toFixed(2);
    }
  });
  Array.from(document.querySelectorAll("input.js-price")).forEach((elem) => {
    const inputElement = elem as HTMLInputElement;
    inputElement.value = Math.round(
      parseFloat(inputElement.value) * hoursInADay
    ).toFixed(2);
  });
};

export function createUpdateInvoiceButton() {
  let updateInvoiceButton = document.createElement("button");
  updateInvoiceButton.onclick = updateInvoice;
  updateInvoiceButton.innerText = "Update hours to days";
  updateInvoiceButton.className = "pds-button convert-hours-button";
  document.querySelector("div.main-nav-legacy nav ul")?.appendChild(updateInvoiceButton);
}