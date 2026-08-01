const SITE_VERSION =
  "0.1.1";

export function setupUpdateNotification() {

  const updateTab =
    document.querySelector(
      '[data-tab="update-log"]'
    );

  if (!updateTab) return;

  const savedVersion =
    localStorage.getItem(
      "site-version"
    );

  if (savedVersion !== SITE_VERSION) {

    updateTab.classList.add(
      "update-notification"
    );
  }

  updateTab.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        "site-version",
        SITE_VERSION
      );

      updateTab.classList.remove(
        "update-notification"
      );
    }
  );
}


export function clearUpdateNotification() {

  localStorage.setItem(
    "site-version",
    SITE_VERSION
  );

  const updateTab =
    document.querySelector(
      '[data-tab="update-log"]'
    );

  updateTab?.classList.remove(
    "tab-updated"
  );
}

export function stylizeUpdateLog() {

  const headings =
    document.querySelectorAll(
      "#content h1, #content h2, #content h3"
    );

  const types = {

    added: "log-added",

    fixed: "log-fixed",

    improved: "log-improved",

    removed: "log-removed",
  };

  headings.forEach(heading => {

    const text =
      heading.textContent
        .trim()
        .toLowerCase();

    const className =
      types[text];

    if (!className) return;

    heading.classList.add(
      className
    );
  });
}