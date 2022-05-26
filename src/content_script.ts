import { createConvertToHoursButton } from "./features/convertToHoursButton";
import { addDailyRatesToPage } from "./features/addDailyRatesToPage";
import { addTrackedDaysToProjectSummaryPage } from "./features/addTrackedDaysToProjectSummaryPage";
import { createUpdateInvoiceButton } from "./features/addConvertHoursToDaysButtonToInvoicePage";
import { MutationSummary, Summary } from "mutation-summary";

const projectEditPageRegex = /\/projects\/[0-9]+\/edit.*/;
const projectsPageRegex = /\/projects\/[0-9]+$/;

export const doOnPageChange = function(callback: () => void) {
  new MutationSummary({
    callback(summaries: Summary[]) {
      summaries.forEach((summary: Summary) => {
        // @ts-ignore
        if (summary.added.length > 0) {
          callback();
        }
        console.log(summary);
      });
    },
    queries: [{ all: true }]
  });
};

window.onload = function () {
  if (window.location.pathname.indexOf("/time/week") !== -1) {
    createConvertToHoursButton();
  }
  if (!!window.location.pathname.match(projectEditPageRegex)) {
    doOnPageChange(addDailyRatesToPage)
  }
  if (window.location.pathname.indexOf("/invoices/new_create") !== -1) {
    createUpdateInvoiceButton();
  }
  if (window.location.pathname.indexOf("/invoices/new") !== -1) {
    createUpdateInvoiceButton();
  }
  if (!!window.location.pathname.match(projectsPageRegex)) {
    doOnPageChange(addTrackedDaysToProjectSummaryPage)
  }
};
