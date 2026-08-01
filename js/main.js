import {
  createTabs
} from "./ui/tabs.js";

import {
  loadMarkdown
} from "./core/markdown.js";

import {
  currentTab
} from "./core/state.js";

import {
  setupUpdateNotification,
  stylizeUpdateLog
} from "./ui/update-notification.js";

loadMarkdown(
  `content/${currentTab}.md`
);

await createTabs();

setupUpdateNotification();

stylizeUpdateLog();