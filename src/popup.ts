import { createVideoElement, Video } from "./utils";
import { getParser } from "./parser";

chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((tabs) => {
  if (!tabs.length) return;

  chrome.action.setBadgeText({ text: "ON" });
  chrome.scripting
    .executeScript({
      target: { tabId: tabs[0].id as number },
      func: getParser(tabs[0]),
    })
    .then((results) => {
      results
        .reduce((p, { result }) => {
          if (result) return [...p, ...result];
          return p;
        }, [] as Video[])
        .forEach((v) => document.body.appendChild(createVideoElement(v)));

      chrome.action.setBadgeText({ text: "" });
    });
});
