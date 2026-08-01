import {
  loadMarkdown
} from "../core/markdown.js";

import {
  resetSearch
} from "../ui/search.js";

import {
  setActiveTab
} from "../ui/tabs.js";

import {
  stylizeUpdateLog
} from "../ui/update-notification.js";

import {
  parseProps
} from "../core/utils.js";


// =========================
// Processor
// =========================

export function processTabLinks(html) {

  return html.replace(

    /\[tab-link\]([\s\S]*?)\[\/tab-link\]/g,

    (_, rawContent) => {

      const props =
        parseProps(rawContent);

      return `

      <button
        class="tab-link"
        data-tab="${props.tab}"
      >

        ${props.text || props.tab}

      </button>
      `;
    }
  );
}


// =========================
// Setup
// =========================

export function setupTabLinks() {

  const links =
    document.querySelectorAll(
      ".tab-link"
    );

  links.forEach(link => {

    link.onclick = async () => {

      const tab =
        link.dataset.tab;

      const path =
        `content/${tab}.md`;

      location.hash = tab;

      await loadMarkdown(path);

      stylizeUpdateLog();

      resetSearch();

      const realTabButton =
        document.querySelector(
          `[data-tab="${tab}"]`
        );

      if (realTabButton) {

        setActiveTab(
          realTabButton
        );
      }
    };
  });
}