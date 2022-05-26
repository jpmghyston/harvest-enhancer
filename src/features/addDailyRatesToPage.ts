import { hoursInADay } from "../constants";
import { addOrReplaceChildElementByClassName } from "../helpers";

export const addDailyRatesToPage = function() {
  const billableRateElements = Array.from(
    document.querySelectorAll("td.js-tasks-billable-rate-column")
  );
  if (billableRateElements.length > 0) {
    // Add daily rate header, if it doesn't already exist
    const tableHeader = document.querySelector(
      "table.project-edit-table thead tr"
    );
    const dailyRateHeader = document.createElement("th");
    const dailyRateHeaderClassName = "daily-rate-header";
    dailyRateHeader.className = dailyRateHeaderClassName;
    dailyRateHeader.innerText = "Daily Rate";
    if (!tableHeader?.querySelector(`th.${dailyRateHeaderClassName}`)) {
      tableHeader?.appendChild(dailyRateHeader);
    }

    // Add daily rate cells
    const taskRows = Array.from(
      document.querySelectorAll("table.project-edit-table tbody tr")
    );
    taskRows.forEach((row) => {
      const billableRateElement = row.querySelector(
        "td.js-tasks-billable-rate-column"
      );
      if (!billableRateElement) {
        return;
      }
      const hourlyRate = parseFloat(
        (Array.from(billableRateElement!.children)[1] as HTMLInputElement).value
      );
      const dailyRate = Math.round(hourlyRate * hoursInADay);
      const dailyRateCell = document.createElement("td");
      dailyRateCell.className = "daily-rate-cell";
      dailyRateCell.innerText = dailyRate.toString();
      addOrReplaceChildElementByClassName(
        row as HTMLElement,
        dailyRateCell,
        "daily-rate-cell"
      );
    });
  }
};