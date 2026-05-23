// =========================
// Clipboard
// =========================

async function copyText(element, text) {

  await navigator
    .clipboard
    .writeText(text);

  element.classList.add(
    "copied"
  );

  const icon =
    element.querySelector(
      ".copy-icon"
    );

  const original =
    icon.textContent;

  icon.textContent = "󰄬";

  setTimeout(() => {

    icon.textContent =
      original;

    element.classList.remove(
      "copied"
    );

  }, 800);
}

export function setupCopyables() {

  document.querySelectorAll(".copyable")
    .forEach(element => {

      element.addEventListener("click", () => {

        const text =
          element.dataset.copyId ||
          element.dataset.copy;

        if (!text) {
          console.warn("Missing copy data:", element);
          return;
        }

        copyText(element, text);
      });

    });
}


