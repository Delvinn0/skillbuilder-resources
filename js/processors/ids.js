import { renderCopyIcon, parseProps } from "../core/utils.js";
// =========================
// Inline IDs
// =========================

export function processInlineIDs(html) {

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

export function processImagedIDs(html) {

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

export function processDataIDs(html) {

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
