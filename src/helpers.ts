import { MutationSummary, Summary } from "mutation-summary";

export const hoursToHourMinuteString = (hours: number): string => {
  const hour = Math.floor(hours);
  const minute = Math.round((hours - hour) * 60);
  return `${hour}:${minute < 10 ? "0" : ""}${minute}`;
};

export const addOrReplaceChildElementByClassName = (
  parent: HTMLElement,
  newChild: HTMLElement,
  className: string
) => {
  const existingDailyRateElement = Array.from(parent.children).find(
    (child) => child.className.indexOf(className) !== -1
  );
  if (existingDailyRateElement) {
    parent.replaceChild(newChild, existingDailyRateElement);
  } else {
    parent.appendChild(newChild);
  }
}
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