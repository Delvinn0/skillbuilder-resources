import { content } from "./elements.js";

export const currentTab =
  location.hash.replace("#", "")
  || "kicks";

export const marker =
  new Mark(content);

export let currentIndex = 0;

export let results = [];

export function getResults() {

  return results;
}
export function setResults(value) {
  results = value;
}


export function setCurrentIndex(value) {
  currentIndex = value;
}
export function getCurrentIndex() {

  return currentIndex;
}