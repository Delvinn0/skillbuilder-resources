// =========================
// Content Files
// =========================

const files = [
  "kicks",
  "punches",
  "meshes",
  "techs",
  "message-me",
  "presets",
  "emotes",
  "tips",
  "update-log",
];


// =========================
// Elements
// =========================

const tabs =
  document.getElementById("tabs");

const content =
  document.getElementById("content");

const searchInput =
  document.getElementById("search");

const searchCount =
  document.getElementById("search-count");


// =========================
// State
// =========================

const currentTab =
  location.hash.replace("#", "")
  || "kicks";

const marker =
  new Mark(content);

let currentIndex = 0;

let results = [];



// =========================
// Markdown
// =========================

async function getMarkdown(path) {

  const response =
    await fetch(path);

  return await response.text();
}


async function getTitle(path) {

  const markdown =
    await getMarkdown(path);

  const firstHeading =
    markdown.match(/^#\s(.+)/m);

  return {

    title:
      firstHeading
      ? firstHeading[1]
      : path
  };
}


async function loadMarkdown(path) {

  const markdown =
    await getMarkdown(path);

  let html =
    marked.parse(markdown);

  html =
      processCustomComponents(html);
  html =
      processImageComponents(html);
  content.innerHTML = html;
  generateOutline();
  setupCopyables();
  setupImageViewer();
}

function setupCopyables() {

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

function generateOutline() {

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

    if (heading.tagName === "H1") {
      button.style.color = "var(--peach)";
    }

    if (heading.tagName === "H2") {
      button.style.paddingLeft = "18px";
      button.style.color = "var(--lavender)";
    }

    if (heading.tagName === "H3") {
      button.style.paddingLeft = "32px";
      button.style.color = "var(--lavender)";
    }

    button.onclick = () => {

      heading.scrollIntoView({

        behavior: "smooth",

        block: "start"
      });
    };

    outline.appendChild(button);
  });
}

// =========================
// Custom Components
// =========================

const toggleOutline =
  document.getElementById(
    "toggle-outline"
  );

toggleOutline.onclick = () => {

  document.body.classList.toggle(
    "outline-collapsed"
  );
};

const componentProcessors = [
  processRightTag,
  processLeftTag,
  processBothTag,
  processConfusionTag,
  processInlineIDs,
  processImagedIDs,
  processDataIDs
];


function processCustomComponents(html) {

  for (const processor of componentProcessors) {

    html = processor(html);
  }

  return html;
}

// =========================
// Typography
// =========================

function processRightTag(html) {

  return html.replace(

    /\[R\](.*?)\[\/R\]/g,

    (_, text) => `
    <span class="right-tag"> ${text} </span>
    `
  );
}

function processLeftTag(html) {

  return html.replace(

    /\[L\](.*?)\[\/L\]/g,

    (_, text) => `
    <span class="left-tag"> ${text} </span>
    `
  );
}

function processBothTag(html) {

  return html.replace(

    /\[B\](.*?)\[\/B\]/g,

    (_, text) => `
    <span class="both-tag"> ${text} </span>
    `
  );
}

function processConfusionTag(html) {

  return html.replace(

    /\[C\](.*?)\[\/C\]/g,

    (_, text) => `
    <span class="confusion"> ${text} </span>
    `
  );
}

// =========================
// Inline IDs
// =========================

function processInlineIDs(html) {

  return html.replace(

    /\[id\](.*?)\[\/id\]/g,

    (_, id) => `

    <span
      class="id copyable"
      data-copy="${id}"
    >

      ${id}

      ${renderCopyIcon()}

    </span>
    `
  );
}

// =========================
// Imaged IDs
// =========================

function processImagedIDs(html) {

  return html.replace(

    /\[imaged-id\]([\s\S]*?)\[\/imaged-id\]/g,

    (_, rawContent) => {

      const props =
        parseProps(rawContent);

      return `

      <div
        class="imaged-id copyable"
        data-copy="${props.id}"
      >

        <img src="${props.img}">

        <span class="image-id-text">
          ${props.id}
        </span>

        ${renderDescription(
          props.description
        )}

        ${renderCopyIcon()}

      </div>
      `;
    }
  );
}

// =========================
// Data IDs
// =========================

function processDataIDs(html) {

  return html.replace(

    /\[data-id\]([\s\S]*?)\[\/data-id\]/g,

    (_, raw) => {

      const props = parseProps(raw);

      const id = props.id || "";
      const img = props.img || "";
      const title = props.title || "";
      const description = props.description || "";

      return `
        <div
          class="data-id copyable"
          data-copy-id="${id}"
        >

          ${img ? `<img src="${img}">` : ""}

          ${title ? `
            <span class="image-id-text">
              ${title}
            </span>
          ` : ""}

          ${description ? `
            <p class="image-description">
              ${description}
            </p>
          ` : ""}

          ${renderCopyIcon()}

        </div>
      `;
    }
  );
}

// =========================
// Image Components
// =========================

const imageProcessors = [
  processImages,
  processGallery,
  processCompare,
  processShowcase,
  processDetails
];


// =========================
// Processors
// =========================

function processImageComponents(html) {

  for (const processor of imageProcessors) {
    html = processor(html);
  }

  return html;
}


// =========================
// Single Image
// =========================

function processImages(html) {

  return html.replace(

    /\[image\]([\s\S]*?)\[\/image\]/g,

    (_, rawContent) => {

      const props =
        parseProps(rawContent);

      return `

      <figure class="image-block">

        <img
          class="zoomable"
          src="${props.src}"
          alt="${props.caption || ""}"
        >

        ${
          props.caption
          ? `
          <figcaption>
            ${props.caption}
          </figcaption>
          `
          : ""
        }

      </figure>
      `;
    }
  );
}


// =========================
// Gallery
// =========================

function processGallery(html) {

  return html.replace(

    /\[gallery\]([\s\S]*?)\[\/gallery\]/g,

    (_, rawContent) => {

      const images =
        rawContent
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean);

      const rendered =
        images.map(src => `

        <img
          class="zoomable"
          src="${src}"
        >

        `).join("");

      return `
        <div class="gallery-grid">
          ${rendered}
        </div>
      `;
    }
  );
}


// =========================
// Compare Slider
// =========================

function processCompare(html) {

  return html.replace(

    /\[compare\]([\s\S]*?)\[\/compare\]/g,

    (_, rawContent) => {

      const props =
        parseProps(rawContent);

      const id =
        crypto.randomUUID();

      return `

      <div
        class="compare-container"
      >

        <div
          class="compare-before"
          id="compare-${id}"
        >

          <img
            class="zoomable"
            src="${props.left}"
          >

        </div>

        <img
          class="compare-after zoomable"
          src="${props.right}"
        >

        <input
          type="range"
          min="0"
          max="100"
          value="50"
          class="compare-slider"
          oninput="
            document.getElementById(
              'compare-${id}'
            ).style.width =
            this.value + '%'
          "
        >

      </div>
      `;
    }
  );
}


// =========================
// Showcase
// =========================

function processShowcase(html) {

  return html.replace(

    /\[showcase\]([\s\S]*?)\[\/showcase\]/g,

    (_, rawContent) => {

      const props =
        parseProps(rawContent);

      return `

      <div class="showcase-card">

        <img
          class="zoomable"
          src="${props.img}"
        >

        <div class="showcase-content">

          <h3>
            ${props.title}
          </h3>

          <p>
            ${props.description}
          </p>

        </div>

      </div>
      `;
    }
  );
}


// =========================
// Details
// =========================

function processDetails(html) {

  return html.replace(

    /\[details\]([\s\S]*?)\[\/details\]/g,

    (_, rawContent) => {

      const props =
        parseProps(rawContent);

      return `

      <details class="custom-details">

        <summary>
          ${props.title}
        </summary>

        <div class="details-content">

          ${marked.parse(
            props.content || ""
          )}

        </div>

      </details>
      `;
    }
  );
}


// =========================
// Fullscreen Viewer
// =========================

function setupImageViewer() {

  const images =
    document.querySelectorAll(
      ".zoomable"
    );

  let zoom = 1;

  let panX = 0;
  let panY = 0;

  let isDragging = false;

  let startX = 0;
  let startY = 0;

  function updateTransform() {

    viewerImage.style.transform =
      `
      translate(${panX}px, ${panY}px)
      scale(${zoom})
      `;
  }

  images.forEach(image => {

    image.onclick = () => {

      viewerImage.src = image.src;

      viewer.classList.add("active");

      zoom = 1;

      panX = 0;
      panY = 0;

      updateTransform();
    };
  });

  // =========================
  // Zoom
  // =========================

  viewer.addEventListener(
    "wheel",
    e => {

      e.preventDefault();

      zoom += e.deltaY * -0.001;

      zoom = Math.min(
        Math.max(1, zoom),
        6
      );

      updateTransform();
    }
  );

  // =========================
  // Drag Start
  // =========================

  viewerImage.addEventListener(
    "mousedown",
    e => {

      e.preventDefault();

      isDragging = true;

      startX = e.clientX - panX;
      startY = e.clientY - panY;

      viewer.classList.add(
        "dragging"
      );
    }
  );

  // =========================
  // Drag Move
  // =========================

  window.addEventListener(
    "mousemove",
    e => {

      if (!isDragging) return;

      panX = e.clientX - startX;
      panY = e.clientY - startY;

      updateTransform();
    }
  );

  // =========================
  // Drag End
  // =========================

  window.addEventListener(
    "mouseup",
    () => {

      isDragging = false;

      viewer.classList.remove(
        "dragging"
      );
    }
  );

  // =========================
  // Close Viewer
  // =========================

  viewer.addEventListener(
    "click",
    e => {

      if (e.target === viewer) {

        viewer.classList.remove(
          "active"
        );
      }
    }
  );

  // =========================
  // ESC
  // =========================

  document.addEventListener(
    "keydown",
    e => {

      if (e.key === "Escape") {

        viewer.classList.remove(
          "active"
        );
      }
    }
  );
}


const viewer =
  document.getElementById(
    "image-viewer"
  );

const viewerImage =
  document.getElementById(
    "viewer-image"
  );

viewer.onclick = () => {

  viewer.classList.remove(
    "active"
  );
  
};

// =========================
// Component Helpers
// =========================

function renderCopyIcon() {

  return `
    <span class="copy-icon">
      󰆏
    </span>
  `;
}


function renderDescription(description) {

  if (!description) return "";

  return `
    <p class="image-description">
      ${description}
    </p>
  `;
}


function parseProps(content) {

  const props = {};

  content
    .split("\n")
    .forEach(line => {

      const clean = line.trim();

      if (!clean || !clean.includes("=")) return;

      const i = clean.indexOf("=");

      const key = clean.slice(0, i).trim().toLowerCase();
      const value = clean.slice(i + 1).trim();

      props[key] = value;
    });

  return props;
}
// =========================
// Tabs
// =========================

async function createTabs() {

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

    button.onclick = () => {

      location.hash = file;

      setActiveTab(button);

      loadMarkdown(path);

      resetSearch();
    };

    tabs.appendChild(button);

    if (file === currentTab) {
      setActiveTab(button);
    }
  }
}


function setActiveTab(activeButton) {

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


// =========================
// Search
// =========================

function resetSearch() {

  marker.unmark();

  searchInput.value = "";

  searchCount.textContent = "";

  results = [];

  currentIndex = 0;
}


searchInput.addEventListener(
  "input",
  handleSearch
);

searchInput.addEventListener(
  "keydown",
  navigateSearchResults
);


function handleSearch() {

  const query =
    searchInput.value;

  currentIndex = 0;

  marker.unmark({

    done: () => {

      if (!query) {

        results = [];

        searchCount.textContent = "";

        return;
      }

      marker.mark(query, {

        separateWordSearch: false,

        done: () => {

          results =
            document.querySelectorAll("mark");

          updateCurrentResult();
        }
      });
    }
  });
}


function navigateSearchResults(e) {

  if (!results.length) return;

  if (e.key !== "Enter") return;

  e.preventDefault();

  if (e.shiftKey) {

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex =
        results.length - 1;
    }

  } else {

    currentIndex++;

    if (currentIndex >= results.length) {
      currentIndex = 0;
    }
  }

  updateCurrentResult();
}


function updateCurrentResult() {

  results.forEach(result => {

    result.classList.remove(
      "current-result"
    );
  });

  const current =
    results[currentIndex];

  if (!current) return;

  current.classList.add(
    "current-result"
  );

  current.scrollIntoView({

    behavior: "smooth",

    block: "center"
  });

  searchCount.textContent =
    `${currentIndex + 1}/${results.length}`;
}


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


// =========================
// Initial Load
// =========================

createTabs();

loadMarkdown(
  `content/${currentTab}.md`
);