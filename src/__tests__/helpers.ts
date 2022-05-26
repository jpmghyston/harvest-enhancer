import { hoursToHourMinuteString } from "../helpers";

test("1.875 = 1:53", () => {
  expect(hoursToHourMinuteString(1.875)).toBe("1:53");
});

test("3.75 = 3:45", () => {
  expect(hoursToHourMinuteString(3.75)).toBe("3:45");
});

test("5.625 = 5:38", () => {
  expect(hoursToHourMinuteString(5.625)).toBe("5:38");
});

test("7.5 = 7:30", () => {
  expect(hoursToHourMinuteString(7.5)).toBe("7:30");
});