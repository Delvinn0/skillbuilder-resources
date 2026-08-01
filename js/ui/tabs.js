import { files }
  from "../config/files.js";

import {
  tabs
} from "../core/elements.js";

import {
  currentTab
} from "../core/state.js";

import {
  getTitle,
  loadMarkdown
} from "../core/markdown.js";

import {
  resetSearch
} from "./search.js";

import {
  clearUpdateNotification,
  stylizeUpdateLog
} from "./update-notification.js";

export async function createTabs() {

  for (const file of files) {

    const path =
      `content/${file}.md`;

    const data =
      await getTitle(path);

    const button =
      document.createElement("button");

    button.textContent =
      data.title;

    button.dataset.tab =
      file;

    // =========================
    // WIP
    // =========================

    if (!data.exists) {

      button.classList.add(
        "tab-wip"
      );

      button.disabled = true;

    } else {

      button.onclick = () => {
        if (file === "update-log") {
          clearUpdateNotification();
        }
        
        location.hash = file;
        
        setActiveTab(button);
        
        loadMarkdown(path).then(() => {
          
          stylizeUpdateLog();

        });
        
        resetSearch();
      };
    }

    tabs.appendChild(button);

    if (
      file === currentTab &&
      data.exists
    ) {
      setActiveTab(button);
    }
  }
}

export function setActiveTab(activeButton) {

  const buttons =
    tabs.querySelectorAll("button");

  buttons.forEach(button => {

    button.classList.remove(
      "active-tab"
    );
  });

  activeButton.classList.add(
    "active-tab"
  );
}