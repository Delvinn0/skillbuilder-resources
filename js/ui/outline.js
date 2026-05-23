export function generateOutline() {

  const outline =
    document.getElementById("outline");

  outline.innerHTML = "";

  const headings =
    Array.from(
      content.querySelectorAll(
        "h1, h2, h3"
      )
    );

  headings.slice(1).forEach((heading, index) => {

    const id =
      `heading-${index}`;

    heading.id = id;

    const button =
      document.createElement("button");

    button.textContent =
      heading.textContent;

    button.classList.add(
      "outline-link"
    );

    // =========================
    // Detect List Nesting
    // =========================

    const insideList =
      heading.closest("li");
    
    if (insideList) {
    button.classList.add("outline-list-item");
    }

    // =========================
    // H1
    // =========================

    if (heading.tagName === "H1") {

      button.style.color =
        "var(--peach)";

      button.style.paddingLeft =
        insideList ? "18px" : "0px";
    }

    // =========================
    // H2
    // =========================

    if (heading.tagName === "H2") {

      button.style.color =
        "var(--lavender)";

      button.style.paddingLeft =
        insideList
          ? "28px"
          : "18px";
    }

    // =========================
    // H3
    // =========================

    if (heading.tagName === "H3") {

      button.style.color =
        "var(--lavender)";

      button.style.paddingLeft =
        insideList
          ? "42px"
          : "32px";
    }

    // =========================
    // Scroll
    // =========================

    button.onclick = () => {

      heading.scrollIntoView({

        behavior: "smooth",

        block: "start"
      });
    };

    outline.appendChild(button);
  });
}