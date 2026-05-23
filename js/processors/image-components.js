import { parseProps } from "../core/utils.js";

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

export function processImageComponents(html) {

  for (const processor of imageProcessors) {
    html = processor(html);
  }

  return html;
}


// =========================
// Single Image
// =========================

export function processImages(html) {

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

export function processGallery(html) {

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

export function processCompare(html) {

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

export function processShowcase(html) {

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

export function processDetails(html) {

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
