import {
  createTabs
} from "./ui/tabs.js";

import {
  loadMarkdown
} from "./core/markdown.js";

import {
  currentTab
} from "./core/state.js";


createTabs();

loadMarkdown(
  `content/${currentTab}.md`
);