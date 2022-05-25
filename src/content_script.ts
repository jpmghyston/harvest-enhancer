import { MutationSummary, Summary } from "mutation-summary";

const hoursToHourMinuteString = (hours: number): string => {
  const hour = Math.floor(hours);
  const minute = Math.round((hours - hour) * 60);
  return `${hour}:${minute < 10 ? "0" : ""}${minute}`;
}

const convertToHours = function () {
  // @ts-ignore
  document.activeElement.blur();
  Array.from(document.querySelectorAll("input.pds-input"))
    .map(elem => elem as HTMLInputElement)
    .filter(i => i.value.startsWith("0:") || i.value == "1:00")
    .forEach(i => {
      i.value = hoursToHourMinuteString(i.value == "1:00" ? 7.5 : parseFloat(i.value.substring(2)) * 7.5 / 60);
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

function addOrReplaceChildElementByClassName(parent: HTMLElement, newChild: HTMLElement, className: string) {
  const existingDailyRateElement = Array.from(parent.children).find(child => child.className.indexOf(className) !== -1);
  if (existingDailyRateElement) {
    parent.replaceChild(newChild, existingDailyRateElement);
  }
  else {
    parent.appendChild(newChild);
  }
}

const addDailyRatesToPage = function() {
  const billableRateElements = Array.from(document.querySelectorAll("td.js-tasks-billable-rate-column"));
  if (billableRateElements.length > 0) {
    // Add daily rate header, if it doesn't already exist
    const tableHeader = document.querySelector("table.project-edit-table thead tr");
    const dailyRateHeader = document.createElement("th");
    const dailyRateHeaderClassName = "daily-rate-header";
    dailyRateHeader.className = dailyRateHeaderClassName;
    dailyRateHeader.innerText = "Daily Rate";
    if (!tableHeader?.querySelector(`th.${dailyRateHeaderClassName}`)) {
      tableHeader?.appendChild(dailyRateHeader);
    }

    // Add daily rate cells
    const taskRows = Array.from(document.querySelectorAll("table.project-edit-table tbody tr"));
    taskRows.forEach(row => {
      const billableRateElement = row.querySelector("td.js-tasks-billable-rate-column");
      if (!billableRateElement) {
        return;
      }
      const hourlyRate = parseFloat((Array.from(billableRateElement!.children)[1] as HTMLInputElement).value);
      const dailyRate = Math.round(hourlyRate * 7.5);
      const dailyRateCell = document.createElement("td");
      dailyRateCell.className = "daily-rate-cell";
      dailyRateCell.innerText = dailyRate.toString();
      addOrReplaceChildElementByClassName(row as HTMLElement, dailyRateCell, "daily-rate-cell");
    });
  }
}

const createUpdateDailyRatesObserver = function () {
  const ms = new MutationSummary({
    callback(summaries: Summary[]) {
      summaries.forEach((summary: Summary) =>  {
        // @ts-ignore
        if (summary.added.filter(elem => elem).length > 0) {
          addDailyRatesToPage();
        }
        console.log(summary)
      });
    },
    queries: [
      { all: true }
    ]
  });
}

const updateInvoice = function () {
  const ROUNDING_TOLERANCE = 0.05;
  // @ts-ignore
  document.activeElement.blur();
  Array.from(document.querySelectorAll("input.js-quantity")).forEach(elem => {

    const inputElement = elem as HTMLInputElement;
    const inputValue = parseFloat(inputElement.value);
    const newValue = inputValue / 7.5;
    const newValueRounded = (Math.round((inputValue * 4) / 7.5) / 4).toFixed(2);
    if (Math.abs(newValue - parseFloat(newValueRounded)) > ROUNDING_TOLERANCE) {
      alert(`Couldn't round value ${inputValue} to a quarter-day accurately (${newValue} vs ${newValueRounded}), so leaving as-is`);
    } else {
      inputElement.value = (Math.round((inputValue * 4) / 7.5) / 4).toFixed(2);
    }
  });
  Array.from(document.querySelectorAll("input.js-price")).forEach(elem => {
    const inputElement = elem as HTMLInputElement;
    inputElement.value = Math.round(parseFloat(inputElement.value) * 7.5).toFixed(2);
  });
}

function createUpdateInvoiceButton() {
  let updateInvoiceButton = document.createElement("button");
  updateInvoiceButton.onclick = updateInvoice;
  updateInvoiceButton.innerText = "Update  hours to days";
  updateInvoiceButton.className = "pds-button convert-hours-button";
  document.body.appendChild(updateInvoiceButton);
}

window.onload = function () {
  if (window.location.pathname.indexOf("/time/week") !== -1) {
    createConvertToHoursButton();
  }
  if (!!window.location.pathname.match(projectEditPageRegex)) {
    createUpdateDailyRatesObserver()
  }
  if (window.location.pathname.indexOf("/invoices/new_create") !== -1) {
    createUpdateInvoiceButton();
  }
  if (window.location.pathname.indexOf("/invoices/new") !== -1) {
    createUpdateInvoiceButton();
  }
}

