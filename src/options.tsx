import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        hoursPerDay: 7.5,
      },
      (items) => {
        setHoursPerDay(items.hoursPerDay);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        hoursPerDay: hoursPerDay,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        Hours per day: <input type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} />
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
