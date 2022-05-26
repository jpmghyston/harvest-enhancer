import { hoursInADay } from "../constants";
import { addOrReplaceChildElementByClassName } from "../helpers";

export function addTrackedDaysToProjectSummaryPage() {
  // Add days header, if it doesn't already exist
  const tableHeaders = document.querySelectorAll(
    "table.project-analysis-table-breakdown tbody tr.tbody-head"
  );
  tableHeaders.forEach((tableHeader) => {
    const daysHeader = document.createElement("th");
    const daysHeaderClassName = "days-header";
    daysHeader.className = daysHeaderClassName;
    daysHeader.innerText = "Days";
    if (!tableHeader?.querySelector(`th.${daysHeaderClassName}`)) {
      tableHeader?.appendChild(daysHeader);
    }
  });

  // Add days cells
  const taskRows = Array.from(
    document.querySelectorAll("table.project-analysis-table-breakdown tbody tr")
  ).filter((row) => row.className.indexOf("tbody-head") === -1);
  taskRows.forEach((row) => {
    const hoursElement = row.querySelector("td.total") as HTMLTableCellElement;
    if (!hoursElement) {
      return;
    }
    const hours = parseFloat(hoursElement.innerText);
    const days = hours / hoursInADay;
    const daysCell = document.createElement("td");
    daysCell.className = "days-cell";
    daysCell.innerText = days.toFixed(2);
    addOrReplaceChildElementByClassName(
      row as HTMLElement,
      daysCell,
      "days-cell"
    );
  });
}